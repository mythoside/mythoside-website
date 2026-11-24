import type { ReactNode } from 'react'
import { Lang } from '@/enums'
import { RootShell } from '@/components/RootShell'
import { VIEWPORT } from '@/lib/seo'
import '../globals.css'

export const viewport = VIEWPORT

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang={Lang.En}>{children}</RootShell>
}
