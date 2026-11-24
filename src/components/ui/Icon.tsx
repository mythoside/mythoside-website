import type { ReactNode } from 'react'
import { IconName } from '@/enums'

// A handful of lucide paths, inlined so the site needs no icon package.
const SHAPES: Record<IconName, ReactNode> = {
  [IconName.Star]: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  [IconName.X]: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  [IconName.Check]: <path d="M20 6 9 17l-5-5" />,
  [IconName.Notebook]: <><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M16 2v20" /></>,
  [IconName.Sheet]: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /></>,
  [IconName.ChevronLeft]: <path d="m15 18-6-6 6-6" />,
  [IconName.Folder]: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />,
}

interface IconProps {
  name: IconName
  className?: string
}

export default function Icon({ name, className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {SHAPES[name]}
    </svg>
  )
}
