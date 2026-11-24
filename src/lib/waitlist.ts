import { Lang, WaitlistStatus } from '@/enums'
import { FIREBASE_CONFIG } from './firebaseConfig'

// Keep in step with the email rule in firestore.rules.
const EMAIL_PATTERN = /^[^@\s/]+@[^@\s/]+\.[^@\s/]+$/
const MAX_EMAIL_LENGTH = 254
const CONSENT_VERSION = '2026-11-24'

const ENDPOINT = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/waitlist`

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email)
}

interface FirestoreError {
  error?: { status?: string; message?: string }
}

// 409 means the document exists. Rules also deny a "create" on an existing document with 403 and the message
// "Missing or insufficient permissions", so that exact denial counts as "already on the list". Any other 403
// (Firestore not enabled, API key restrictions) and a missing database are real failures.
function statusFromFailure(httpStatus: number, body: FirestoreError): WaitlistStatus {
  if (httpStatus === 409 || body.error?.status === 'ALREADY_EXISTS') return WaitlistStatus.Duplicate
  const deniedByRules = body.error?.message?.includes('Missing or insufficient permissions') ?? false
  if (httpStatus === 403 && deniedByRules) return WaitlistStatus.Duplicate
  return WaitlistStatus.Error
}

/** Writes `waitlist/<email>`; never throws, always resolves to the state the form should show. */
export async function joinWaitlist(rawEmail: string, lang: Lang): Promise<WaitlistStatus> {
  const email = normalizeEmail(rawEmail)
  if (!isValidEmail(email)) return WaitlistStatus.Invalid

  const url = `${ENDPOINT}?documentId=${encodeURIComponent(email)}&key=${FIREBASE_CONFIG.apiKey}`
  const fields = {
    email: { stringValue: email },
    lang: { stringValue: lang },
    createdAt: { timestampValue: new Date().toISOString() },
    consent: { booleanValue: true },
    // Which consent wording the visitor ticked; bump it whenever `wait.consent` or the privacy notice changes.
    consentVersion: { stringValue: CONSENT_VERSION },
  }
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }) })
    if (res.ok) return WaitlistStatus.Success
    const body: FirestoreError = await res.json().catch(() => ({}))
    return statusFromFailure(res.status, body)
  } catch {
    return WaitlistStatus.Error
  }
}

// TODO(welcome-email): a Firebase function (Resend or Purelymail SMTP) will send a welcome email when a
// `waitlist/{id}` document is created. Not built yet and holds no credentials. The site only writes the
// document above, so it needs no change when the function arrives.
