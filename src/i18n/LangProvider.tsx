'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Lang } from '@/enums'
import { LANG_STORAGE_KEY } from '@/lib/storage'
import { EN, TR } from './messages'
import type { MessageKey } from './messages'

const DICTS: Record<Lang, Record<MessageKey, string>> = { [Lang.En]: EN, [Lang.Tr]: TR }

interface LangCtx {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: MessageKey) => string
}

const Ctx = createContext<LangCtx>({ lang: Lang.En, setLang: () => {}, t: (k) => EN[k] })

function isLang(value: string | null): value is Lang {
  return value === Lang.En || value === Lang.Tr
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(Lang.En)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY)
      if (isLang(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- storage is only readable after hydration
        setLangState(saved)
        document.documentElement.setAttribute('lang', saved)
      }
    } catch { /* ignore */ }
  }, [])

  const setLang = (next: Lang) => {
    setLangState(next)
    document.documentElement.setAttribute('lang', next)
    try { localStorage.setItem(LANG_STORAGE_KEY, next) } catch { /* ignore */ }
  }

  const t = (key: MessageKey) => DICTS[lang][key]

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
