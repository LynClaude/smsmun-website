'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            最新动态
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PPRDMUN 2025 报名开始 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                <h3 className="text-2xl font-bold mb-2">PPRDMUN 2025 报名开始</h3>
                <p className="text-gray-600 mb-4">泛珠三角模拟联合国大会2025年会现已开放报名，欢迎各位代表参加。</p>
                <Link href="/pprdmun" className="text-blue-600 hover:text-blue-800 font-semibold">
                  了解更多 →
                </Link>
              </div>
            </motion.div>

            {/* 深中模联第二十届 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/logo.png"
                  alt="深中模联第二十届"
                  fill
                  className="object-contain p-4 opacity-50"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">暂未更新</h3>
                <p className="text-gray-600 mb-4">敬请期待</p>
                <span className="text-gray-400 font-semibold">
                  即将发布 →
                </span>
              </div>
            </motion.div>

            {/* 新一届学术团队招募 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/logo.png"
                  alt="新一届学术团队招募"
                  fill
                  className="object-contain p-4 opacity-50"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">暂未更新</h3>
                <p className="text-gray-600 mb-4">敬请期待</p>
                <span className="text-gray-400 font-semibold">
                  即将发布 →
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
} 