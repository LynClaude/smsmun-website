'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function DepartmentSection() {
  const { messages } = useI18n()
  
  const departments = [
    {
      title: messages.departments.academic.name,
      description: messages.departments.academic.description,
      link: '/about/departments/academic'
    },
    {
      title: messages.departments.administrative.name,
      description: messages.departments.administrative.description,
      link: '/about/departments/administrative'
    },
    {
      title: messages.departments.pr.name,
      description: messages.departments.pr.description,
      link: '/about/departments/pr'
    },
    {
      title: messages.departments.tech.name,
      description: messages.departments.tech.description,
      link: '/about/departments/tech'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900">{messages.departments.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900">{dept.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6 min-h-[100px]">{dept.description}</p>
                <Link 
                  href={dept.link}
                  className="text-sm md:text-base text-primary hover:text-secondary transition-colors duration-300"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 