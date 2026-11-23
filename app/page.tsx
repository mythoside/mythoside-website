import { SectionId } from '@/enums'
import Features from '@/components/sections/Features'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Navbar from '@/components/sections/Navbar'
import OpenSource from '@/components/sections/OpenSource'
import Philosophy from '@/components/sections/Philosophy'
import Problem from '@/components/sections/Problem'

export default function Page() {
  return (
    <>
      <Navbar />
      <main id={SectionId.Top}>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Philosophy />
        <OpenSource />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
