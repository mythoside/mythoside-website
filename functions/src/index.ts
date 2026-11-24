import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { defineSecret } from 'firebase-functions/params'
import { logger } from 'firebase-functions'
import nodemailer from 'nodemailer'
import { isLang, renderWelcomeEmail } from './welcomeEmail.js'

const SMTP_PASSWORD = defineSecret('SMTP_PASSWORD')
const FROM_ADDRESS = 'support@mythoside.com'

// Firestore lives in eur3; europe-west1 is a region inside it, so the trigger stays in the EU.
export const sendWelcomeEmail = onDocumentCreated(
  { document: 'waitlist/{id}', region: 'europe-west1', secrets: [SMTP_PASSWORD], maxInstances: 2 },
  async (event) => {
    const data = event.data?.data()
    const email = typeof data?.email === 'string' ? data.email : null
    if (!email) {
      logger.warn('waitlist document without an email', { eventId: event.id })
      return
    }
    const { subject, html, text } = renderWelcomeEmail(isLang(data?.lang) ? data.lang : 'en')

    const transport = nodemailer.createTransport({
      host: 'smtp.purelymail.com',
      port: 465,
      secure: true,
      auth: { user: FROM_ADDRESS, pass: SMTP_PASSWORD.value() },
    })
    try {
      await transport.sendMail({
        from: { name: 'Mythos', address: FROM_ADDRESS },
        to: email,
        subject,
        html,
        text,
        headers: { 'List-Unsubscribe': `<mailto:${FROM_ADDRESS}?subject=unsubscribe>` },
      })
      logger.info('welcome email sent', { eventId: event.id })
    } catch (error) {
      // No retry: a failed welcome email must not resend later or block the signup, which is already saved.
      logger.error('welcome email failed', { eventId: event.id, error: String(error) })
    }
  },
)
