'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2019Page() {
  const { messages } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/PPRD2019/20191.jpeg',
    '/PPRD2019/20192.jpeg',
    '/PPRD2019/20193.jpeg',
    '/PPRD2019/20194.jpeg',
    '/PPRD2019/20195.jpeg',
    '/PPRD2019/20196.jpeg',
    '/PPRD2019/20197.jpeg',
    '/PPRD2019/20198.jpeg',
    '/PPRD2019/20199.jpeg',
    '/PPRD2019/201910.jpeg',
    '/PPRD2019/201911.jpeg'
  ]

  // 自动轮播图片
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // 每3秒切换一张图片

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <PageTransition>
      <div>
        <div className="relative">
          <div className="relative h-screen">
            <Image
              src="/pprd-common-bg.webp"
              alt="PPRDMUN 2019 Background"
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold mb-4"
              >
                PPRDMUN 2019
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl max-w-3xl"
              >
                泛珠三角高中生模拟联合国大会
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-base mt-4 opacity-90"
              >
                2019年7月24日至27日 · 深圳中学
              </motion.p>
            </div>
          </div>
        </div>

        {/* 照片轮播区域 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary"
            >
              精彩瞬间
            </motion.h2>
            
            <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`PPRDMUN 2019 Photo ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* 图片指示器 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 邀请函区域 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">邀请函</h2>
              <p className="text-gray-600">点击信件查看完整邀请函内容</p>
            </div>
            <InvitationLetter
              year={2019}
              title="PPRDMUN 2019 邀请函"
              description="深中模联十五载，泛珠模联十周岁生日"
              href="/pprdmun/2019/letter"
            />
          </div>
        </div>

        {/* 委员会设置区域 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary"
            >
              委员会设置
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 1. 1930 魏玛共和国复辟危机局势系统 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-800">1930 魏玛共和国复辟危机局势系统</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-700">会场设置：</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• 德国内阁会议 German Cabinet Meeting</li>
                    <li>• 德国国会 Reichtag</li>
                    <li>• 凡尔赛和约缔约国会议 Conference of the Parties of the Treaty of Versailles</li>
                    <li>• 主新闻中心 Main Press Center</li>
                  </ul>
                </div>
              </motion.div>

              {/* 2. 英国脱欧谈判协调机制 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-green-800">英国脱欧谈判协调机制</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-700">会场设置：</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• 英国议会下议院·HoC</li>
                    <li>• 欧盟二十七国峰会EU27</li>
                  </ul>
                </div>
              </motion.div>

              {/* 3. 1959 南极峰会 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-800">1959 南极峰会</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">探索南极这片神秘之地的国际峰会</p>
                </div>
              </motion.div>

              {/* 4. 1991 Parliament of the Socialist Republic of Bosnia and Herzegovina in Sarajevo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-red-800">1991 波斯尼亚和黑塞哥维那社会主义共和国议会</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">见证南斯拉夫瓦解的历史时刻</p>
                </div>
              </motion.div>

              {/* 5. 1814 Congress of Vienna */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-800">1814 Congress of Vienna</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">梦回欧洲与拿破仑斗争的历史时刻</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
