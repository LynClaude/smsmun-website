'use client'

import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

const timeline = [
  {
    year: '2010',
    title: '深中模联成立',
    description: '深圳中学模拟联合国协会正式成立，开启了培养国际视野青年人才的新篇章。'
  },
  {
    year: '2015',
    title: '首届PPRDMUN',
    description: '成功举办首届泛珠三角模拟联合国大会，吸引了来自全国各地的优秀学子参与。'
  },
  {
    year: '2020',
    title: '十周年庆典',
    description: '深中模联成立十周年，举办线上庆典活动，回顾十年发展历程。'
  },
  {
    year: '2025',
    title: '新的征程',
    description: '第十六届泛珠三角模拟联合国大会筹备中，继续为培养国际化人才而努力。'
  }
]

export default function HistoryPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            深中模联发展历程
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
                  className={`flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} relative`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  {/* 时间点 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 