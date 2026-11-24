import { Lang, LegalDocKind } from '@/enums'
import LegalPage, { legalMetadata } from '@/components/LegalPage'

export const metadata = legalMetadata(LegalDocKind.Privacy, Lang.Tr)

export default function Page() {
  return <LegalPage kind={LegalDocKind.Privacy} lang={Lang.Tr} />
}
