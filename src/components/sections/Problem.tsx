import { IconName, SectionId } from '@/enums'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { IconRow } from '../ui/IconRow'
import { SectionHead } from '../ui/SectionHead'
import { SectionShell } from '../ui/SectionShell'

interface StackTab {
  icon: IconName
  name?: string
  nameKey?: MessageKey
  note: MessageKey
  bad?: boolean
}

// File names are literal; only the notes (and the last row's name, via nameKey) are translated.
const TABS: readonly StackTab[] = [
  { icon: IconName.Notebook, name: 'world-bible.notion', note: 'problem.n1' },
  { icon: IconName.Sheet, name: 'timeline_v7_FINAL.xlsx', note: 'problem.n2' },
  { icon: IconName.Folder, name: 'characters/ (41 docs)', note: 'problem.n3' },
  { icon: IconName.X, nameKey: 'problem.mem', note: 'problem.n4', bad: true },
]

export default function Problem() {
  return (
    <SectionShell id={SectionId.Problem}>
      <div className="stack">
        <div>
          <SectionHead title="problem.h2" body="problem.body" flush />
        </div>
        <div className="tabs" aria-hidden="true">
          {TABS.map(({ icon, name, nameKey, note, bad }) => (
            <IconRow key={note} icon={icon} iconClassName="ic" className={bad ? 't bad' : 't'}>
              {nameKey ? <T k={nameKey} /> : name} <T k={note} className="note" />
            </IconRow>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
