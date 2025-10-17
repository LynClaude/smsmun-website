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
      
      {/* 重要事件部分 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {messages.home.important_events}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 泛珠模联大会 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/pprdbg.png"
                  alt="PPRDMUN"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    PPRDMUN
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event1_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event1_desc}</p>
                <Link 
                  href="/pprdmun" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>

            {/* 学术培训 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/深中模联活动照.pic(1).jpg"
                  alt="学术培训"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    学术培训
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event2_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event2_desc}</p>
                <Link 
                  href="/about/departments/academic" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>

            {/* 国际交流 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/background.jpg"
                  alt="国际交流"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    国际交流
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event3_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event3_desc}</p>
                <Link 
                  href="/events" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>

            {/* 社团招新 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/announcement.jpg"
                  alt="社团招新"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    社团招新
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event4_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event4_desc}</p>
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>

            {/* 校友网络 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/interview.jpg"
                  alt="校友网络"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    校友网络
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event5_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event5_desc}</p>
                <Link 
                  href="/alumni-network" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>

            {/* 历史传承 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="/bg.png"
                  alt="历史传承"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center">
                    历史传承
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.event6_title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.event6_desc}</p>
                <Link 
                  href="/about/history" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  {messages.home.learn_more} →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
} 