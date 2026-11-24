import type { Metadata, Viewport } from 'next'
import { Lang } from '@/enums'
import { MESSAGES } from '@/i18n/messages'

export const SITE_URL = 'https://mythoside.com'

// Each language has its own URL; the root layout and the metadata both read these.
export const LANG_PATH: Record<Lang, string> = { [Lang.En]: '/', [Lang.Tr]: '/tr' }
const OG_LOCALE: Record<Lang, string> = { [Lang.En]: 'en_US', [Lang.Tr]: 'tr_TR' }
const OG_IMAGE = '/og.png'

export const VIEWPORT: Viewport = { themeColor: '#F8F6F0' }

export function buildMetadata(lang: Lang): Metadata {
  const m = MESSAGES[lang]
  const other = lang === Lang.En ? Lang.Tr : Lang.En
  return {
    metadataBase: new URL(SITE_URL),
    title: m['meta.title'],
    description: m['meta.description'],
    alternates: {
      canonical: LANG_PATH[lang],
      languages: { [Lang.En]: LANG_PATH[Lang.En], [Lang.Tr]: LANG_PATH[Lang.Tr], 'x-default': LANG_PATH[Lang.En] },
    },
    openGraph: {
      type: 'website',
      url: LANG_PATH[lang],
      siteName: 'Mythos',
      title: m['meta.title'],
      description: m['meta.description'],
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[other]],
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: m['meta.ogAlt'] }],
    },
    twitter: { card: 'summary_large_image', title: m['meta.title'], description: m['meta.description'], images: [OG_IMAGE] },
    icons: { icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/favicon.svg', type: 'image/svg+xml' }] },
  }
}
