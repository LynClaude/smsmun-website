'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">社团简介</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            深圳中学模拟联合国协会是深圳中学最具影响力的学生组织之一。我们致力于培养具有国际视野、卓越领导力和深厚人文素养的青年人才。通过模拟联合国会议、国际交流等活动，为学生提供探索国际事务、锻炼外交能力的专业平台。
          </p>
          <Link 
            href="/about/history" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
          >
            了解更多
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 