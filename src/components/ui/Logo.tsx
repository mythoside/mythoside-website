import { useId } from 'react'

// The open-book mark: two pages, page edges below, and three lines of writing cut into the open page.
// Geometry is shared with public/favicon.svg and public/mythos-logo*.svg; change them together.
const PAGES = '217,4 88,356 226,186 390,184 506,500 104,395 6,494 26,205 49,139'
const WRITING = 'M214 248L388 262M186 298L406 320M162 348L326 370'
const EDGES = 'M120 446L482 545M170 498L452 575'

// Monochrome; inherits the brand colour via currentColor so it flips with the theme.
interface LogoProps {
  className?: string
}

export default function Logo({ className = 'mark' }: LogoProps) {
  const maskId = `mythos-writing-${useId()}`
  return (
    <svg className={className} viewBox="-24 -10 600 600" fill="none" aria-hidden="true">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-24" y="-10" width="600" height="600">
          <rect x="-24" y="-10" width="600" height="600" fill="#fff" />
          <path d={WRITING} stroke="#000" strokeWidth="20" strokeLinecap="round" />
        </mask>
      </defs>
      <polygon points={PAGES} mask={`url(#${maskId})`} fill="currentColor" stroke="currentColor" strokeWidth="28" strokeLinejoin="round" />
      <path d={EDGES} stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
    </svg>
  )
}
