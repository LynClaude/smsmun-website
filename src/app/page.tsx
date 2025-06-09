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
                  <Image
                    src="/二轮通告.jpg"
                    alt="PPRDMUN 2025 二轮通告"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">PPRDMUN 2025 二轮通告</h3>
                  <p className="text-gray-600 mb-4">PPRDMUN2025第二轮通告🇺🇳 内含组委信息、主席团名单、学测提交提醒</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/GN_dAI6kytvnNq-pd3U-5A" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    了解更多 →
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
                  <h3 className="text-2xl font-bold mb-2">2025PPRDMUN会场｜组委专访</h3>
                  <p className="text-gray-600 mb-4">"行远自迩，踵事增华。"为更好地介绍PPRDMUN2025，"泛珠模联"公众号特别推出专访栏目，邀请大会组委会对PPRDMUN2025的会议设计理念进行阐述。他们将对大会学术设计进行总体介绍。让我们一起看看吧~</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/u6gDHGuv_gBx2GzQdkwiKQ" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    了解详情 →
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
                  <h3 className="text-2xl font-bold mb-2">PPRDMUN 2025 一轮通告</h3>
                  <p className="text-gray-600 mb-4">2025PPRD一轮通告🇺🇳 内含大会会议设置、学术团队报名、学校及个人报名/学测</p>
                  <a 
                    href="https://mp.weixin.qq.com/s/kLnpjWeEY6tQwvBIVlm0bw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    了解更多 →
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
                  <h3 className="text-2xl font-bold mb-2">PPRDMUN 2025 报名开始</h3>
                  <p className="text-gray-600 mb-4">第十六届泛珠三角模拟联合国大会现已开放报名，欢迎各校学生参与。请下载相关申请表，并于截止日期前提交。</p>
                  <Link href="/pprdmun" className="text-blue-600 hover:text-blue-800 font-semibold">
                    了解更多 →
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