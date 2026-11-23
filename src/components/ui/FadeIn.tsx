'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
