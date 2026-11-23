'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Theme } from '@/enums'
import { THEME_STORAGE_KEY } from '@/lib/storage'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: Theme.Light, toggle: () => {} })

function isTheme(value: string | null): value is Theme {
  return value === Theme.Light || value === Theme.Dark
}

// Light paper is the default; only an explicit system dark preference flips it.
export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // `undefined` means "follow the system preference" (no data-theme attribute set).
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (isTheme(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- storage is only readable after hydration
        setTheme(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    } catch { /* ignore */ }
  }, [])

  const toggle = () => {
    const current = theme ?? systemTheme()
    const next = current === Theme.Light ? Theme.Dark : Theme.Light
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch { /* ignore */ }
  }

  return <Ctx.Provider value={{ theme: theme ?? Theme.Light, toggle }}>{children}</Ctx.Provider>
}

export function useTheme() {
  return useContext(Ctx)
}
