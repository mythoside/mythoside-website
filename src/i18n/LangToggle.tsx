'use client'

import { Lang } from '@/enums'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { useLang } from './LangProvider'

const LANGS = Object.values(Lang)

export function LangToggle() {
  const { lang, setLang } = useLang()
  return <ToggleGroup options={LANGS} value={lang} onChange={setLang} label="Language" />
}
