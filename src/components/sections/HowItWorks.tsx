import { FadeIn } from '../ui/FadeIn'
import { T, useLang } from '../../i18n'
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

export default function HowItWorks() {
  const { t } = useLang()
  return (
    <section className="section" id="model">
      <div className="wrap">
        <FadeIn>
          <div className="sec-head">
            <T k="model.h2" as="h2" />
            <T k="model.body" as="p" className="body" />
          </div>
          <div className="model-grid">
            <div className="panel">
              <div className="head"><T k="model.p1" /> <span className="fp">characters/lord-corvath.md</span></div>
              <pre className="yaml" dangerouslySetInnerHTML={{ __html: YAML }} />
            </div>
            <div className="panel">
              <div className="head"><T k="model.p2" /> <T k="model.p2fp" className="fp" /></div>
              <div className="constellation">
                <ReferenceGraph label={t('graph.aria')} />
              </div>
              <div className="graph-legend">
                <span><i className="dot k-book" /><T k="graph.book" /></span>
                <span><i className="dot k-chapter" /><T k="graph.chapter" /></span>
                <span><i className="dot k-character" /><T k="graph.character" /></span>
                <span><i className="dot k-location" /><T k="graph.location" /></span>
                <T k="graph.hint" className="hint" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
