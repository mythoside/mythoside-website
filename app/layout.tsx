import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import type { ReactNode } from 'react'
import { Lang } from '@/enums'
import { LangProvider } from '@/i18n/LangProvider'
import { THEME_STORAGE_KEY } from '@/lib/storage'
import { ThemeProvider } from '@/theme/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap', adjustFontFallback: false })
const newsreader = Newsreader({ subsets: ['latin', 'latin-ext'], axes: ['opsz'], variable: '--font-newsreader', display: 'swap', adjustFontFallback: false })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap', adjustFontFallback: false })

const TITLE = 'Mythos, a world development environment for novelists'

export const metadata: Metadata = {
  title: TITLE,
  description: 'Mythos is a desktop app for long fiction. Chapters, characters, places and the timeline sit side by side as plain Markdown files on your own disk.',
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
}

export const viewport: Viewport = {
  themeColor: '#F8F6F0',
}

// Runs before first paint so a saved theme never flashes the other one.
const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={Lang.En} className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
