'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function LeadershipSummitPage() {
  const { messages } = useI18n()
  const [selectedYear, setSelectedYear] = useState('2024')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const years = [
    '2024'
    // 未来可以添加更多年份
  ]

  // 2024年领袖峰会的照片数组
  const images2024 = [
    '/领袖峰会/领袖峰会全员合照.jpeg',
    '/领袖峰会/领袖峰会staff合照.jpeg',
    '/领袖峰会/领袖峰会会中主席团照片.jpeg',
    '/领袖峰会/茶歇.jpeg',
    '/领袖峰会/领袖峰会常秘发言.jpeg'
  ]

  // 自动轮播图片
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images2024.length)
    }, 3000) // 每3秒切换一张图片

    return () => clearInterval(interval)
  }, [images2024.length])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 relative">
          {/* 悬浮年份选择栏 */}
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-2 min-w-[120px]">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">{messages.activities.leadership_summit.select_year}</h3>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year)
                    if (year === '2024') {
                      window.location.href = '/activities/leadership-summit/2024'
                    }
                  }}
                  className={`w-full text-center px-3 py-2 rounded-md transition-colors text-sm ${
                    selectedYear === year
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
              <Image
                src="/领袖峰会/领袖峰会2024_01.png"
                alt="Leadership Summit 2024 Background"
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
                  {messages.activities.leadership_summit.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl max-w-3xl"
                >
                  {messages.activities.leadership_summit.subtitle}
                </motion.p>
              </div>
            </div>

            {/* 会议简介和图片轮播 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* 左侧会议简介 */}
                <div className="lg:w-1/2 p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{messages.activities.leadership_summit.overview}</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {messages.activities.leadership_summit.overview_content}
                  </p>
                  <ul className="text-gray-700 space-y-3">
                    <li><span className="font-semibold">{messages.activities.leadership_summit.details.time}</span></li>
                    <li><span className="font-semibold">{messages.activities.leadership_summit.details.location}</span></li>
                    <li><span className="font-semibold">{messages.activities.leadership_summit.details.theme}</span></li>
                  </ul>
                </div>

                {/* 右侧图片展示 - 自动轮播 */}
                <div className="relative lg:w-1/2 aspect-[4/3]">
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
                        src={images2024[currentImageIndex]}
                        alt={`Leadership Summit 2024 Photo ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images2024.map((_, index) => (
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
      </div>
    </PageTransition>
  )
}
