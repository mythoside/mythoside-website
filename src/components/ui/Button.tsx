import type { ReactNode } from 'react'
import { ButtonVariant, IconName } from '@/enums'
import Icon from './Icon'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  icon?: IconName
}

// The site's only button is a link styled with `.btn`; the variant enum carries the class names.
export function ButtonLink({ href, children, variant = ButtonVariant.Secondary, icon }: ButtonLinkProps) {
  return (
    <a className={variant} href={href}>
      {icon && <><Icon name={icon} />{' '}</>}
      {children}
    </a>
  )
}
