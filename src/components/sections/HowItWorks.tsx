import { NodeKind, SectionId } from '@/enums'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { SectionHead } from '../ui/SectionHead'
import { SectionShell } from '../ui/SectionShell'
import ReferenceGraph from '../ui/ReferenceGraph'

// Static English sample content (a worked example, not UI copy) — safe constant HTML.
const YAML = `<span class="d">---</span>
<span class="k">id</span><span class="d">:</span> <span class="v">lord-corvath</span>
<span class="k">type</span><span class="d">:</span> <span class="v">character</span>
<span class="k">status</span><span class="d">:</span> <span class="dead">deceased</span>
<span class="k">died</span><span class="d">:</span>
  <span class="k">book</span><span class="d">:</span> <span class="v">1</span>
  <span class="k">chapter</span><span class="d">:</span> <span class="v">12</span>
  <span class="k">event</span><span class="d">:</span> <span class="v">the-fall-of-embergate</span>
<span class="k">titles</span><span class="d">:</span> <span class="s">[Warden of the Ash, Third of His Name]</span>
<span class="d">---</span>
<span class="pr">Corvath held the Embergate for thirty winters.
When it fell, so did he — and the ash has</span>
<span class="pr">carried his name ever since.</span>`

interface LegendItem {
  kind: NodeKind
  label: MessageKey
}

// Series and books share one swatch; the CSS classes are `k-<kind>`.
const LEGEND: readonly LegendItem[] = [
  { kind: NodeKind.Book, label: 'graph.book' },
  { kind: NodeKind.Chapter, label: 'graph.chapter' },
  { kind: NodeKind.Character, label: 'graph.character' },
  { kind: NodeKind.Location, label: 'graph.location' },
]

export default function HowItWorks() {
  return (
    <SectionShell id={SectionId.Model}>
      <SectionHead title="model.h2" body="model.body" />
      <div className="model-grid">
        <div className="panel">
          <div className="head"><T k="model.p1" /> <span className="fp">characters/lord-corvath.md</span></div>
          <pre className="yaml" dangerouslySetInnerHTML={{ __html: YAML }} />
        </div>
        <div className="panel">
          <div className="head"><T k="model.p2" /> <T k="model.p2fp" className="fp" /></div>
          <div className="constellation">
            <ReferenceGraph />
          </div>
          <div className="graph-legend">
            {LEGEND.map(({ kind, label }) => (
              <span key={kind}><i className={`dot k-${kind}`} /><T k={label} /></span>
            ))}
            <T k="graph.hint" className="hint" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
