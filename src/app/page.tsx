'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function Home() {
  const { messages } = useI18n()
  return (
    <PageTransition>
      <Hero />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {messages.home.latest_news}
          </motion.h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-8 min-w-max px-4">
              {/* PPRDMUN 2025 二轮通告 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
              >
                <div className="relative h-48">
                  <img
                    src="/2025年泛珠三角高中生模拟联合国大会 (192 x 108 mm).png"
                    alt="PPRDMUN 2025 二轮通告"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news1_title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news1_desc}</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/GN_dAI6kytvnNq-pd3U-5A" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                  >
                    {messages.home.learn_more} →
                  </a>
                </div>
              </motion.div>

              {/* PPRDMUN 2025 会场组委专访 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
              >
                <div className="relative h-48">
                  <Image
                    src="/interview.jpg"
                    alt="PPRDMUN 2025 会场组委专访"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news2_title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news2_desc}</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/u6gDHGuv_gBx2GzQdkwiKQ" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                  >
                    {messages.home.learn_details} →
                  </a>
                </div>
              </motion.div>

              {/* PPRDMUN 2025 一轮通告 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
              >
                <div className="relative h-48">
                  <Image
                    src="/announcement.jpg"
                    alt="PPRDMUN 2025 一轮通告"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news3_title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news3_desc}</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/kLnpjWeEY6tQwvBIVlm0bw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                  >
                    {messages.home.learn_more} →
                  </a>
                </div>
              </motion.div>

              {/* PPRDMUN 2025 报名开始 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
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
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news4_title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news4_desc}</p>
                  <Link href="/pprdmun" className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base">
                    {messages.home.learn_more} →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
} 