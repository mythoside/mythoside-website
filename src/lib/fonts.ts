import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap', adjustFontFallback: false })
const newsreader = Newsreader({ subsets: ['latin', 'latin-ext'], axes: ['opsz'], variable: '--font-newsreader', display: 'swap', adjustFontFallback: false })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap', adjustFontFallback: false })

export const FONT_CLASSES = `${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`
