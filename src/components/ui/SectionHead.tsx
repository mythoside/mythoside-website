import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'

interface SectionHeadProps {
  title: MessageKey
  body: MessageKey
  flush?: boolean
}

export function SectionHead({ title, body, flush = false }: SectionHeadProps) {
  return (
    <div className="sec-head" style={flush ? { marginBottom: 0 } : undefined}>
      <T k={title} as="h2" />
      <T k={body} as="p" className="body" />
    </div>
  )
}
