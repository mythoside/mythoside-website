'use client'

import { useEffect, useState } from 'react'
import { Lang } from '@/enums'
import { useLang } from '@/i18n/LangProvider'
import { MESSAGES } from '@/i18n/messages'
import { ConsentChoice, OPEN_CONSENT_EVENT, readConsent, saveConsent } from '@/lib/analytics'

// Sits in the root shell, outside LangProvider, so it reads the page language from <html lang>
// (LangProvider may have switched `/` to Turkish by the time this mounts).
function pageLang(fallback: Lang): Lang {
  const lang = document.documentElement.lang
  return lang === Lang.Tr || lang === Lang.En ? lang : fallback
}

export function ConsentBanner({ lang: initialLang }: { lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    const show = () => {
      setLang(pageLang(initialLang))
      setOpen(true)
    }
    if (readConsent() === null) show()
    window.addEventListener(OPEN_CONSENT_EVENT, show)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, show)
  }, [initialLang])

  if (!open) return null
  const m = MESSAGES[lang]
  const choose = (choice: ConsentChoice) => {
    setOpen(false)
    saveConsent(choice)
  }

  return (
    <section className="consent" role="region" aria-label={m['cookie.label']} lang={lang}>
      {/* Static dictionary text, never user input (same rule as <T>). */}
      <p dangerouslySetInnerHTML={{ __html: m['cookie.text'] }} />
      <div className="consent-actions">
        <button type="button" className="btn" onClick={() => choose(ConsentChoice.Denied)}>{m['cookie.reject']}</button>
        <button type="button" className="btn btn-primary" onClick={() => choose(ConsentChoice.Granted)}>{m['cookie.accept']}</button>
      </div>
    </section>
  )
}

/** Footer link that reopens the banner so a visitor can change or withdraw consent. Needs LangProvider. */
export function ConsentSettingsButton() {
  const { t } = useLang()
  return (
    <button type="button" className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {t('cookie.settings')}
    </button>
  )
}
