'use client'

import { useEffect, useRef, useState } from 'react'

const OBSERVER_OPTIONS: IntersectionObserverInit = { threshold: 0.1 }

export function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, OBSERVER_OPTIONS)

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}
