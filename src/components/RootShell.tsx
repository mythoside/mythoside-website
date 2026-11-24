import type { ReactNode } from 'react'
import type { Lang } from '@/enums'
import { ANALYTICS_HEAD_SCRIPT } from '@/lib/analytics'
import { FONT_CLASSES } from '@/lib/fonts'
import { THEME_STORAGE_KEY } from '@/lib/storage'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { ConsentBanner } from './ui/ConsentBanner'

// Runs before first paint so a saved theme never flashes the other one.
const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

// The <html> shell shared by the per-language root layouts, so each static page ships with the right `lang`.
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={FONT_CLASSES} suppressHydrationWarning>
      {/* The App Router has no <Head> in a root layout; these scripts have to sit in the document head. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Consent Mode defaults; Tag Manager loads only after the visitor allows analytics. */}
        <script dangerouslySetInnerHTML={{ __html: ANALYTICS_HEAD_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          {/* After the page, so LangProvider has already set <html lang> when the banner reads it. */}
          <ConsentBanner lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  )
}
