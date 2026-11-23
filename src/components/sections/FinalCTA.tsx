import { FadeIn } from '../ui/FadeIn'
import { T } from '../../i18n'
import Icon from '../ui/Icon'

export default function FinalCTA() {
  return (
    <section className="closing wrap">
      <FadeIn>
        <T k="closing.h2" as="h2" />
        <div className="hero-cta">
          <a className="btn btn-primary" href="https://github.com/mythoside"><Icon name="star" /> <T k="nav.star" /></a>
          <a className="btn" href="https://github.com/mythoside/mythoside-ts"><T k="closing.cta2" /></a>
        </div>
      </FadeIn>
    </section>
  )
}
