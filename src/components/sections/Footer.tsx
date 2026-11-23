import { SectionId } from '@/enums'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { GITHUB_ORG, GITHUB_REPO } from '@/lib/links'
import Logo from '../ui/Logo'

interface FooterLink {
  href: string
  label?: MessageKey
  text?: string
}

interface FooterColumn {
  title: MessageKey
  links: readonly FooterLink[]
}

const COLUMNS: readonly FooterColumn[] = [
  {
    title: 'foot.repos',
    links: [
      { href: GITHUB_REPO('mythoside-core'), label: 'foot.r1' },
      { href: GITHUB_REPO('mythoside-ts'), label: 'foot.r2' },
      { href: GITHUB_REPO('mythoside-website'), text: 'mythoside-website' },
    ],
  },
  {
    title: 'foot.project',
    links: [
      { href: GITHUB_ORG, label: 'foot.pr1' },
      { href: GITHUB_REPO('.github/blob/main/CONTRIBUTING.md'), label: 'foot.pr2' },
      { href: GITHUB_REPO('.github/blob/main/SECURITY.md'), label: 'foot.pr3' },
    ],
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <a className="brand" href={`#${SectionId.Top}`} style={{ marginBottom: 16 }} aria-label="Mythos home"><Logo /> Mythos</a>
            <T k="foot.tagline" as="p" className="foot-note" />
          </div>
          {COLUMNS.map(({ title, links }) => (
            <div className="foot-col" key={title}>
              <T k={title} as="h4" />
              {links.map(({ href, label, text }) => (
                <a href={href} key={href}>{label ? <T k={label} /> : text}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 Mythoside — FSL-1.1 · site MIT</span>
          <T k="foot.motto" />
        </div>
      </div>
    </footer>
  )
}
