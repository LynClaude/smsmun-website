'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function WelcomePage() {
  const { messages } = useI18n()
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <Link 
          href="/pprdmun" 
          className="fixed top-24 left-4 md:left-8 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">{messages.pprdmun.welcome_title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_greeting}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_opening}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_invitation}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_2025}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_15_years}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_concept}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_gratitude}</p>
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.welcome_ending}</p>
              <p className="text-sm md:text-base">{messages.pprdmun.welcome_signature}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 