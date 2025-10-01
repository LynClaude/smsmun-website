'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function IntroSection() {
  const { messages } = useI18n()
  
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-900">{messages.about.intro_title}</h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
            {messages.about.intro_content}
          </p>
          <Link 
            href="/about/history" 
            className="inline-block px-6 md:px-8 py-3 bg-primary text-white text-sm md:text-base rounded-lg hover:bg-secondary transition-colors duration-300"
          >
            {messages.home.learn_more}
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 