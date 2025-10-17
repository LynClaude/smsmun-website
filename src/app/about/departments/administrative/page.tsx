'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function AdministrativePage() {
  const { messages } = useI18n()
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{messages.departments.administrative.name}</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.common.dept_intro}</h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {messages.departments.administrative.intro}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.administrative.work_stages}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-800">{messages.departments.administrative.training_period}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {messages.departments.administrative.training_desc}
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-800">{messages.departments.administrative.carnival_prep}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {messages.departments.administrative.carnival_desc}
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-800">{messages.departments.administrative.sponsorship}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {messages.departments.administrative.sponsorship_desc}
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-800">{messages.departments.administrative.pprd_prep}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {messages.departments.administrative.pprd_desc}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.academic.benefits}</h2>
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-gray-700">
            <li>{messages.departments.administrative.benefit1}</li>
            <li>{messages.departments.administrative.benefit2}</li>
            <li>{messages.departments.administrative.benefit3}</li>
            <li>{messages.departments.administrative.benefit4}</li>
            <li>{messages.departments.administrative.benefit5}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{messages.departments.academic.requirements}</h2>
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-gray-700">
            <li>{messages.departments.administrative.req1}</li>
            <li>{messages.departments.administrative.req2}</li>
            <li>{messages.departments.administrative.req3}</li>
            <li>{messages.departments.administrative.req4}</li>
          </ul>
        </section>
      </div>
    </motion.div>
  )
} 