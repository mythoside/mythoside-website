import type { ReactNode } from 'react'
import { IconName } from '@/enums'
import Icon from './Icon'

interface IconRowProps {
  icon: IconName
  iconClassName: string
  as?: 'li' | 'div'
  className?: string
  children: ReactNode
}

// An icon in a small slot followed by a label: used for the checklist items and the "five places" tabs.
export function IconRow({ icon, iconClassName, as: Tag = 'div', className, children }: IconRowProps) {
  return (
    <Tag className={className}>
      <span className={iconClassName}><Icon name={icon} /></span>
      {Tag === 'div' && ' '}
      {children}
    </Tag>
  )
}
