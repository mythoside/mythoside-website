import type { ReactNode } from 'react'
import { SectionId } from '@/enums'
import { FadeIn } from './FadeIn'

interface SectionShellProps {
  id: SectionId
  children: ReactNode
}

// Standard section: anchor id, centred wrap, one fade-in reveal.
export function SectionShell({ id, children }: SectionShellProps) {
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <FadeIn>{children}</FadeIn>
      </div>
    </section>
  )
}
