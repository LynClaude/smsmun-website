'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const departments = [
  {
    title: '学术部',
    description: '负责为社团成员提供学术培训，为参会代表提供会前准备建议和会中指导。在这里，你可以共同探讨国际事务，培养学术素养。',
    link: '/about/departments/academic'
  },
  {
    title: '行政部',
    description: '主要负责日常活动组织、财政管理和社团资源筹划。从培训到PPRD筹备，行政部在每个环节都发挥着重要作用。',
    link: '/about/departments/administrative'
  },
  {
    title: '公关部',
    description: '负责对外公共关系事务的管理、协调和统筹。包括信息发布、成员招募、赞助商对接等重要工作。',
    link: '/about/departments/pr'
  },
  {
    title: '技术部',
    description: '负责深中模联宣传资料和周边产品的制作，决定协会对外形象。从海报设计到视频制作，技术部创造着独特的视觉语言。',
    link: '/about/departments/tech'
  }
]

export default function DepartmentSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">部门介绍</h2>
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
                <h3 className="text-xl font-bold mb-4 text-gray-900">{dept.title}</h3>
                <p className="text-gray-600 mb-6 min-h-[100px]">{dept.description}</p>
                <Link 
                  href={dept.link}
                  className="text-primary hover:text-secondary transition-colors duration-300"
                >
                  了解更多 →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 