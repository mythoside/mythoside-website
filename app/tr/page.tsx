import { Lang } from '@/enums'
import HomePage from '@/components/HomePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(Lang.Tr)

export default function Page() {
  return <HomePage lang={Lang.Tr} />
}
