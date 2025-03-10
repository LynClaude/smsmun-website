'use client'

import AboutHero from '@/components/AboutHero'
import DepartmentSection from '@/components/DepartmentSection'
import IntroSection from '@/components/IntroSection'
import PageTransition from '@/components/PageTransition'

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen">
        <AboutHero />
        <IntroSection />
        <DepartmentSection />
      </main>
    </PageTransition>
  )
} 