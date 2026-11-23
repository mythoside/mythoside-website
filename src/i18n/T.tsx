'use client'

import type { CSSProperties, ElementType } from 'react'
import { useLang } from './LangProvider'
import type { MessageKey } from './messages'

interface TProps {
  k: MessageKey
  as?: ElementType
  className?: string
  style?: CSSProperties
}

/**
 * Render a translated string as HTML into the given element (keeps <em>/<b>/<br>).
 * Safe: `t()` only ever returns values from the static EN/TR dictionaries in messages.ts,
 * authored here and never user input. No untrusted data reaches innerHTML.
 */
export function T({ k, as: Tag = 'span', className, style }: TProps) {
  const { t } = useLang()
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: t(k) }} />
}
