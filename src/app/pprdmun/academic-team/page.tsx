'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function AcademicTeamPage() {
  const { messages } = useI18n()
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">{messages.pprdmun.academic_team_title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.academic_team_desc}</p>
              
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.academic_team_priority}</p>
              
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.academic_team_wechat}</p>
              
              <p className="mb-6 text-sm md:text-base">{messages.pprdmun.academic_team_contact}</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2 text-sm md:text-base">{messages.pprdmun.academic_team_secretary}</p>
                <p className="text-sm md:text-base">{messages.pprdmun.academic_team_vice_secretary}</p>
              </div>

              <div className="flex justify-center">
                <button className="bg-primary text-white px-6 md:px-8 py-3 rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base">
                  {messages.pprdmun.download_form}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 