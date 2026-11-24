'use client'

import { Lang } from '@/enums'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { useLang } from './LangProvider'

const LANGS = Object.values(Lang)
// Each name is written in its own language, so it is read correctly whatever the page language is.
const LANG_NAMES: Record<Lang, string> = { [Lang.En]: 'English', [Lang.Tr]: 'Türkçe' }

export function LangToggle() {
  const { lang, setLang, t } = useLang()
  return <ToggleGroup options={LANGS} value={lang} onChange={setLang} label={t('a11y.lang')} names={LANG_NAMES} />
}
