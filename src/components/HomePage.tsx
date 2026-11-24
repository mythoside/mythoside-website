import { SectionId } from '@/enums'
import type { Lang } from '@/enums'
import { LangProvider } from '@/i18n/LangProvider'
import Features from './sections/Features'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import Navbar from './sections/Navbar'
import OpenSource from './sections/OpenSource'
import Philosophy from './sections/Philosophy'
import Problem from './sections/Problem'
import { SkipLink } from './ui/SkipLink'

// The whole page; `/` and `/tr` differ only in the language it starts in.
export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <LangProvider initialLang={lang}>
      <SkipLink />
      <Navbar />
      <main id={SectionId.Top} tabIndex={-1}>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Philosophy />
        <OpenSource />
        <FinalCTA />
      </main>
      <Footer />
    </LangProvider>
  )
}
