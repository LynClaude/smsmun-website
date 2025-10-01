'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function HistoryPage() {
  const { messages } = useI18n()
  
  const timeline = [
    {
      year: messages.history.event1_year,
      title: messages.history.event1_title,
      description: messages.history.event1_desc
    },
    {
      year: messages.history.event2_year,
      title: messages.history.event2_title,
      description: messages.history.event2_desc
    },
    {
      year: messages.history.event3_year,
      title: messages.history.event3_title,
      description: messages.history.event3_desc
    },
    {
      year: messages.history.event4_year,
      title: messages.history.event4_title,
      description: messages.history.event4_desc
    },
    {
      year: messages.history.event5_year,
      title: messages.history.event5_title,
      description: messages.history.event5_desc
    },
    {
      year: messages.history.event6_year,
      title: messages.history.event6_title,
      description: messages.history.event6_desc
    }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
          >
            {messages.history.title}
          </motion.h1>
          
          <div className="relative">
            {/* 时间轴中线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary" />
            
            {/* 时间轴内容 */}
            <div className="space-y-24">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div 
                    className={`flex items-center ${
                      index % 2 === 0 ? 'justify-end md:pr-12' : 'justify-start md:pl-12'
                    } md:w-1/2 ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{item.year}</h3>
                      <h4 className="text-lg md:text-xl font-semibold mb-3">{item.title}</h4>
                      <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  {/* 时间点 */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 