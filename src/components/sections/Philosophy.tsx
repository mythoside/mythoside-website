import { IconName, SectionId } from '@/enums'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { IconRow } from '../ui/IconRow'
import { SectionShell } from '../ui/SectionShell'

const CHECKS: readonly MessageKey[] = ['ethos.c1', 'ethos.c2', 'ethos.c3']

export default function Philosophy() {
  return (
    <SectionShell id={SectionId.Ethos}>
      <div className="ethos">
        <div className="ethos-grid">
          <div>
            <T k="ethos.h2" as="h2" />
            <T k="ethos.body" as="p" className="body" />
            <ul className="checks" style={{ marginTop: 24 }}>
              {CHECKS.map((key) => (
                <IconRow key={key} as="li" icon={IconName.Check} iconClassName="k"><T k={key} /></IconRow>
              ))}
            </ul>
          </div>
          <div className="arch" aria-label="Architecture: the core engine talks to the app over standard input and output, and never opens a network port.">
            <T k="arch.label" as="div" className="path" style={{ marginBottom: 16 }} />
            <div className="arch-row">
              <span className="box core">{'mythos‑core'}</span>
              <span className="pipe" aria-label="stdio">◂<i />stdio<i />▸</span>
              <span className="box">mythos.app</span>
            </div>
            <br />
            <span className="no">{'╳ 127.0.0.1:<port>'}</span>
            <T k="arch.cap" className="cap" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
