import { SectionId } from '@/enums'
import { T } from '@/i18n/T'
import { Card } from '../ui/Card'
import type { CardData } from '../ui/Card'
import { SectionHead } from '../ui/SectionHead'
import { SectionShell } from '../ui/SectionShell'

const CARDS: readonly CardData[] = [
  { tier: 'open.freeTier', price: 'open.freePrice', sub: 'open.freeSub', items: ['open.f1', 'open.f2', 'open.f3'] },
  { tier: 'open.proTier', price: 'open.proPrice', sub: 'open.proSub', items: ['open.p1', 'open.p2', 'open.p3'], featured: true },
]

export default function OpenSource() {
  return (
    <SectionShell id={SectionId.Open}>
      <SectionHead title="open.h2" body="open.body" />
      <div className="os-grid">
        {CARDS.map((card) => <Card key={card.tier} {...card} />)}
      </div>
      <T k="open.platforms" as="p" className="platforms" />
      <T k="open.fsl" as="div" className="fsl" />
    </SectionShell>
  )
}
