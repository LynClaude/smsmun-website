'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUNPage() {
  const [showArrow, setShowArrow] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowHeight = window.innerHeight
      const mouseY = e.clientY
      setShowArrow(mouseY > windowHeight / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <PageTransition>
      <div className="relative">
        {/* 第一页 */}
        <div className="relative min-h-screen overflow-hidden">
          {/* 背景图片 */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src="/pprdbg.png"
              alt="PPRDMUN Background"
              fill
              className="object-cover brightness-75"
              priority
            />
            {/* 深色蒙版 */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* 内容区域 */}
          <div className="relative z-10 container mx-auto min-h-screen flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full px-4 py-24">
              {/* 左侧文字内容 */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white space-y-8"
              >
                <h1 
                  className="text-4xl md:text-6xl font-bold" 
                  style={{ 
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                    fontWeight: '700',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  PPRDMUN 2025
                </h1>
                <p 
                  className="text-lg md:text-xl leading-relaxed opacity-90"
                  style={{
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                  }}
                >
                  第十六届泛珠三角模拟联合国大会是华南地区最具影响力的模联会议之一。本届大会将继续秉承"和平、发展、合作、共赢"的理念，为各校学生提供一个展示外交才能、增进国际理解的专业平台。
                </p>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">大会信息</h2>
                  <ul className="list-disc list-inside space-y-2 opacity-90">
                    <li>举办时间：2025年7月中旬</li>
                    <li>举办地点：深圳中学（泥岗校区）</li>
                    <li>会议语言：中文/英文</li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* 右侧图片展示 */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/深中模联活动照.pic(1).jpg"
                  alt="PPRDMUN"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* 向下滚动指引按钮 */}
          <button 
            onClick={scrollToNextSection}
            className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce transition-opacity duration-300 ${
              showArrow ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </button>
        </div>

        {/* 第二页 */}
        <div className="min-h-screen bg-white py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-4xl font-bold text-center text-primary">会议委员会设置</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">联合国安全理事会</h3>
                  <p className="text-gray-600">讨论国际和平与安全议题，体验最高级别的国际政治博弈。</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">联合国大会</h3>
                  <p className="text-gray-600">探讨全球性议题，参与多边外交谈判。</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">危机联动委员会</h3>
                  <p className="text-gray-600">应对突发国际危机，体验紧张刺激的危机处理。</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 