import type { ReactNode } from 'react'
import type { Lang } from '@/enums'
import { FONT_CLASSES } from '@/lib/fonts'
import { THEME_STORAGE_KEY } from '@/lib/storage'
import { ThemeProvider } from '@/theme/ThemeProvider'

// Runs before first paint so a saved theme never flashes the other one.
const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

// The <html> shell shared by the per-language root layouts, so each static page ships with the right `lang`.
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={FONT_CLASSES} suppressHydrationWarning>
      {/* The App Router has no <Head> in a root layout; this script has to sit in the document head. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
