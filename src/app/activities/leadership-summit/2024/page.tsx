'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function LeadershipSummit2024Page() {
  const { messages } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 2024年领袖峰会的照片数组
  const images = [
    '/领袖峰会/领袖峰会全员合照.jpeg',
    '/领袖峰会/领袖峰会staff合照.jpeg',
    '/领袖峰会/领袖峰会会中主席团照片.jpeg',
    '/领袖峰会/茶歇.jpeg',
    '/领袖峰会/领袖峰会常秘发言.jpeg'
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
        {/* 第一页 */}
        <div className="relative">
          {/* 背景图片 */}
          <div className="relative h-screen">
            <Image
              src="/领袖峰会/领袖峰会2024_01.png"
              alt="领袖峰会 2024 Background"
              fill
              className="object-cover brightness-75"
              priority
            />
            {/* 深色蒙版 */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* 内容区域 */}
          <div className="absolute inset-0">
            <div className="container mx-auto h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full px-4 py-24">
                {/* 左侧文字内容 */}
                <div className="text-white space-y-8">
                  <h1 
                    className="text-4xl md:text-6xl font-bold" 
                    style={{ 
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                      fontWeight: '700',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {messages.activities.leadership_summit.title_short}
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    {messages.activities.leadership_summit.overview_content}
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{messages.pprdmun.conference_info}</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>{messages.activities.leadership_summit.details.time}</li>
                      <li>{messages.activities.leadership_summit.details.location}</li>
                      <li>{messages.activities.leadership_summit.details.theme}</li>
                      <li>{messages.pprdmun.organizer}</li>
                    </ul>
                  </div>
                </div>

                {/* 右侧图片展示 - 自动轮播 */}
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
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
                        alt={`领袖峰会 2024 Photo ${currentImageIndex + 1}`}
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
            </div>
          </div>
        </div>

        {/* 会议简介区域 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-lg shadow-xl p-8 md:p-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
                  会议简介
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-6 text-lg">
                    深圳市模拟联合国领袖峰会是由深圳中学模拟联合国协会秘书处主办，面向全市各高中模联组织负责人及管理层成员的大会，旨在推动深圳市高中生模联活动的合作与发展。
                  </p>
                  <p className="mb-6">
                    峰会通过深入友好的交流，加强区域内各模联协会的团结，建立合作互助平台，讨论深圳模联的发展和前景，为深圳市高中生模联活动的独立、专业、创新型发展探索良策。
                  </p>
                  
                  {/* 会议详情 */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">会议时间</h3>
                      <p className="text-blue-700">2024年12月7日（周六）<br/>14:30 - 17:00</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-green-800 mb-4">会议地点</h3>
                      <p className="text-green-700">深圳中学（泥岗校区）</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">会议主题</h3>
                    <p className="text-purple-700">
                      深圳地区线下模联活动的重振与发展 & 模联社团创新与传承
                    </p>
                  </div>
                  
                  {/* 英文全称 */}
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">英文全称</h3>
                    <p className="text-gray-700 italic">
                      Shenzhen Summit for Chief Leaders in Model United Nations
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

