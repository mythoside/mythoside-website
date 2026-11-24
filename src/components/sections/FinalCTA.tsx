import { IconName } from '@/enums'
import { T } from '@/i18n/T'
import { GITHUB_ORG, GITHUB_REPO } from '@/lib/links'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { WaitlistForm } from '../ui/WaitlistForm'

export default function FinalCTA() {
  return (
    <section className="closing wrap">
      <FadeIn>
        <T k="closing.h2" as="h2" />
        <WaitlistForm />
        <div className="hero-cta">
          <ButtonLink href={GITHUB_ORG} icon={IconName.Star}><T k="nav.star" /></ButtonLink>
          <ButtonLink href={GITHUB_REPO('mythoside-ts')}><T k="closing.cta2" /></ButtonLink>
        </div>
      </FadeIn>
    </section>
  )
}
