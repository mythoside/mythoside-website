import { SectionId } from '@/enums'
import { T } from '@/i18n/T'

// First tab stop; hidden until focused.
export function SkipLink() {
  return <a className="skip-link" href={`#${SectionId.Top}`}><T k="a11y.skip" /></a>
}
