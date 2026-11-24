'use client'

import { NodeKind } from '@/enums'
import { useLang } from '@/i18n/LangProvider'
import type { MessageKey } from '@/i18n/messages'
import { EDGES, SEEDS } from './graphSim'

const KIND_LABEL: Record<NodeKind, MessageKey> = {
  [NodeKind.Series]: 'graph.kind.series',
  [NodeKind.Book]: 'graph.kind.book',
  [NodeKind.Chapter]: 'graph.chapter',
  [NodeKind.Character]: 'graph.character',
  [NodeKind.Location]: 'graph.location',
}

// Text twin of the canvas: every node and its links, read from the same data the canvas draws.
export function GraphTextAlt({ id }: { id: string }) {
  const { t } = useLang()
  const labelOf = new Map(SEEDS.map((n) => [n.id, n.label]))

  return (
    <ul id={id} className="visually-hidden">
      {SEEDS.map((node) => {
        const links = EDGES.flatMap((e) => {
          if (e.source !== node.id && e.target !== node.id) return []
          const other = labelOf.get(e.source === node.id ? e.target : e.source) ?? ''
          return [e.bad ? `${other} (${t('graph.flagged')})` : other]
        })
        const traits = [t(KIND_LABEL[node.kind]), ...(node.dead ? [t('graph.deceased')] : [])].join(', ')
        return <li key={node.id}>{node.label} ({traits}): {t('graph.linkedTo')} {links.join('; ')}</li>
      })}
    </ul>
  )
}
