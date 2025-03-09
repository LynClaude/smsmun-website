'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Hero />

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新动态</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src="/WechatIMG110.jpg"
                  alt="PPRDMUN 2025"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">PPRDMUN 2025 报名开始</h3>
                <p className="text-gray-600 mb-4">第十六届泛珠三角模拟联合国大会现已开放报名，欢迎各校学生参与...</p>
                <Link href="/pprdmun" className="text-primary hover:text-secondary">
                  了解更多 →
                </Link>
              </div>
            </motion.div>

            {/* News Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">2024年春季培训营</h3>
                <p className="text-gray-600 mb-4">为期两周的春季培训营将于3月开始，包含议事规则培训、公共演讲等课程...</p>
                <Link href="/events" className="text-primary hover:text-secondary">
                  了解更多 →
                </Link>
              </div>
            </motion.div>

            {/* News Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">校友导师计划启动</h3>
                <p className="text-gray-600 mb-4">2024年校友导师计划现已启动，邀请历届优秀校友为在校学生提供指导...</p>
                <Link href="/alumni-network" className="text-primary hover:text-secondary">
                  了解更多 →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
} 