import { T } from '../../i18n'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <a className="brand" href="#top" style={{ marginBottom: 16 }} aria-label="Mythos home"><Logo /> Mythos</a>
            <T k="foot.tagline" as="p" className="foot-note" />
          </div>
          <div className="foot-col">
            <T k="foot.repos" as="h4" />
            <a href="https://github.com/mythoside/mythoside-core"><T k="foot.r1" /></a>
            <a href="https://github.com/mythoside/mythoside-ts"><T k="foot.r2" /></a>
            <a href="https://github.com/mythoside/mythoside-website">mythoside-website</a>
          </div>
          <div className="foot-col">
            <T k="foot.project" as="h4" />
            <a href="https://github.com/mythoside"><T k="foot.pr1" /></a>
            <a href="https://github.com/mythoside/.github/blob/main/CONTRIBUTING.md"><T k="foot.pr2" /></a>
            <a href="https://github.com/mythoside/.github/blob/main/SECURITY.md"><T k="foot.pr3" /></a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Mythoside — FSL-1.1 · site MIT</span>
          <T k="foot.motto" />
        </div>
      </div>
    </footer>
  )
}
