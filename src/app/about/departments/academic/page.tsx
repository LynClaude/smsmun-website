'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n-context'

export default function AcademicPage() {
  const { messages } = useI18n()
  
  return (
    <div>
      {/* 返回按钮 */}
      <Link 
        href="/about#departments"
        className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回关于我们
      </Link>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{messages.departments.academic.name}</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.common.dept_intro}</h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {messages.departments.academic.intro}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.academic.responsibilities}</h2>
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-gray-700">
            <li>{messages.departments.academic.resp1}</li>
            <li>{messages.departments.academic.resp2}</li>
            <li>{messages.departments.academic.resp3}</li>
            <li>{messages.departments.academic.resp4}</li>
            <li>{messages.departments.academic.resp5}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.academic.benefits}</h2>
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-gray-700">
            <li>{messages.departments.academic.benefit1}</li>
            <li>{messages.departments.academic.benefit2}</li>
            <li>{messages.departments.academic.benefit3}</li>
            <li>{messages.departments.academic.benefit4}</li>
            <li>{messages.departments.academic.benefit5}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.academic.requirements}</h2>
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-gray-700">
            <li>{messages.departments.academic.req1}</li>
            <li>{messages.departments.academic.req2}</li>
            <li>{messages.departments.academic.req3}</li>
            <li>{messages.departments.academic.req4}</li>
          </ul>
        </section>
      </div>
      </motion.div>
    </div>
  )
} 