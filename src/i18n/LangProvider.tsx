'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Lang } from '@/enums'
import { LANG_PATH } from '@/lib/seo'
import { LANG_STORAGE_KEY } from '@/lib/storage'
import { MESSAGES } from './messages'
import type { MessageKey } from './messages'

interface LangCtx {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: MessageKey) => string
}

const Ctx = createContext<LangCtx>({ lang: Lang.En, setLang: () => {}, t: (k) => MESSAGES[Lang.En][k] })

function isLang(value: string | null): value is Lang {
  return value === Lang.En || value === Lang.Tr
}

// What the visitor is shown on `/` before they have chosen: a saved choice wins, then the browser language.
function preferredLang(): Lang | null {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch { /* ignore */ }
  return navigator.language?.toLowerCase().startsWith('tr') ? Lang.Tr : null
}

// <html lang> and the URL follow the language (no navigation, no history entry). The tab title is set in the provider.
function syncDocument(lang: Lang) {
  document.documentElement.setAttribute('lang', lang)
  const path = LANG_PATH[lang]
  if (window.location.pathname !== path) window.history.replaceState(window.history.state, '', `${path}${window.location.hash}`)
}

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [announcement, setAnnouncement] = useState('')

  // Next re-writes its own <title> after hydration and on URL changes, so keep the language's title on top of it.
  useEffect(() => {
    const title = MESSAGES[lang]['meta.title']
    const apply = () => { if (document.title !== title) document.title = title }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [lang])

  // `/` serves English; a visitor who prefers Turkish is moved to it. `/tr` is an explicit choice and stays as is.
  useEffect(() => {
    if (initialLang !== Lang.En || preferredLang() !== Lang.Tr) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- storage and navigator are only readable after hydration
    setLangState(Lang.Tr)
    syncDocument(Lang.Tr)
  }, [initialLang])

  const setLang = (next: Lang) => {
    setLangState(next)
    syncDocument(next)
    setAnnouncement(MESSAGES[next]['a11y.langChanged'])
    try { localStorage.setItem(LANG_STORAGE_KEY, next) } catch { /* ignore */ }
  }

  const t = (key: MessageKey) => MESSAGES[lang][key]

  return (
    <Ctx.Provider value={{ lang, setLang, t }}>
      {children}
      <div className="visually-hidden" role="status" aria-live="polite">{announcement}</div>
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}
