import { Lang } from '@/enums'
import HomePage from '@/components/HomePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(Lang.En)

export default function Page() {
  return <HomePage lang={Lang.En} />
}
