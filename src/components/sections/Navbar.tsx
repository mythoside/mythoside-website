import { ButtonVariant, IconName, SectionId } from '@/enums'
import { LangToggle } from '@/i18n/LangToggle'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { ThemeToggle } from '@/theme/ThemeToggle'
import { ButtonLink } from '../ui/Button'
import Logo from '../ui/Logo'
import { GITHUB_ORG } from '@/lib/links'

interface NavItem {
  id: SectionId
  label: MessageKey
}

const NAV_ITEMS: readonly NavItem[] = [
  { id: SectionId.Problem, label: 'nav.problem' },
  { id: SectionId.Model, label: 'nav.model' },
  { id: SectionId.Engine, label: 'nav.engine' },
  { id: SectionId.Ethos, label: 'nav.ethos' },
  { id: SectionId.Open, label: 'nav.open' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href={`#${SectionId.Top}`} aria-label="Mythos home"><Logo /> Mythos</a>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map(({ id, label }) => (
            <a href={`#${id}`} key={id}><T k={label} /></a>
          ))}
        </nav>
        {/* Fixed-width toggles sit at the right edge, so a longer translated button grows leftwards and nothing under the cursor moves. */}
        <div className="nav-tools">
          <ButtonLink href={GITHUB_ORG} variant={ButtonVariant.Secondary} icon={IconName.Star}>
            <T k="nav.star" className="lbl" />
          </ButtonLink>
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  )
}
