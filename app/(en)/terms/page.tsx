import { Lang, LegalDocKind } from '@/enums'
import LegalPage, { legalMetadata } from '@/components/LegalPage'

export const metadata = legalMetadata(LegalDocKind.Terms, Lang.En)

export default function Page() {
  return <LegalPage kind={LegalDocKind.Terms} lang={Lang.En} />
}
