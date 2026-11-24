'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Theme } from '@/enums'
import { useLang } from '@/i18n/LangProvider'
import { systemTheme, useTheme } from './ThemeProvider'

const ICONS: Record<Theme, ReactNode> = {
  [Theme.Dark]: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  [Theme.Light]: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.4M12 19.6V22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2 12h2.4M19.6 12H22M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" />
    </>
  ),
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useLang()
  // Read the live attribute so the icon matches even when following the system preference.
  const [effective, setEffective] = useState<Theme>(Theme.Dark)
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the live attribute is only readable after hydration
    setEffective(attr === Theme.Light || attr === Theme.Dark ? attr : systemTheme())
  }, [theme])

  return (
    <button type="button" className="theme-toggle" aria-label={t(effective === Theme.Dark ? 'a11y.themeToLight' : 'a11y.themeToDark')} onClick={toggle}>
      {/* The icon shows the theme you would switch to: a sun on light, a moon on dark. */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[effective]}
      </svg>
    </button>
  )
}
