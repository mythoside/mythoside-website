'use client'

import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { WaitlistStatus } from '@/enums'
import { useLang } from '@/i18n/LangProvider'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { joinWaitlist } from '@/lib/waitlist'

// The message shown for each end state; Idle and Submitting show none.
const STATUS_MESSAGE: Partial<Record<WaitlistStatus, MessageKey>> = {
  [WaitlistStatus.Success]: 'wait.success',
  [WaitlistStatus.Duplicate]: 'wait.duplicate',
  [WaitlistStatus.Invalid]: 'wait.invalid',
  [WaitlistStatus.NoConsent]: 'wait.noConsent',
  [WaitlistStatus.Error]: 'wait.error',
}

const DONE: readonly WaitlistStatus[] = [WaitlistStatus.Success, WaitlistStatus.Duplicate]

interface WaitlistFormProps {
  // Anchor so the nav button can jump to the form; only the first form on the page sets it.
  anchorId?: string
}

export function WaitlistForm({ anchorId }: WaitlistFormProps) {
  const { lang, t } = useLang()
  const uid = useId()
  const inputId = `${uid}-email`
  const statusId = `${uid}-status`
  const consentId = `${uid}-consent`
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<WaitlistStatus>(WaitlistStatus.Idle)

  const submitting = status === WaitlistStatus.Submitting
  const done = DONE.includes(status)
  const messageKey = STATUS_MESSAGE[status]

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    if (!consent) {
      setStatus(WaitlistStatus.NoConsent)
      return
    }
    setStatus(WaitlistStatus.Submitting)
    setStatus(await joinWaitlist(email, lang))
  }

  return (
    <div className="waitlist" id={anchorId}>
      {!done && (
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor={inputId} className="wl-label">{t('wait.label')}</label>
          <div className="wl-row">
            <input
              id={inputId}
              className="wl-input"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder={t('wait.placeholder')}
              value={email}
              aria-invalid={status === WaitlistStatus.Invalid}
              aria-describedby={statusId}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {t(submitting ? 'wait.submitting' : 'wait.submit')}
            </button>
          </div>
          <div className="wl-consent">
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              aria-invalid={status === WaitlistStatus.NoConsent}
              aria-describedby={statusId}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label htmlFor={consentId}>{t('wait.consent')} <T k="wait.privacy" className="wl-privacy-link" /></label>
          </div>
        </form>
      )}
      <div className="wl-status" id={statusId} role="status" aria-live="polite">
        {messageKey && <T k={messageKey} as="p" className={`wl-msg wl-${status}`} />}
      </div>
    </div>
  )
}
