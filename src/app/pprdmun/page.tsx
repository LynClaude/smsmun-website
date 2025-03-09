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
                    <li>参会规模：预计500人</li>
                    <li>主办方：深圳中学模拟联合国协会</li>
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

        {/* 第二页 - 委员会设置 */}
        <div className="min-h-screen bg-white py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 英文特殊委员会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">英文特殊委员会</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会介绍</h4>
                    <p className="text-gray-600">
                      本委员会将以全英文形式进行，为具有出色英语能力的代表提供国际化的交流平台。委员会将模拟处理重要的国际议题，要求代表具备扎实的英语表达能力和专业的外交素养。
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">学术要求</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>熟练的英语口语和写作能力</li>
                      <li>深入的国际关系知识储备</li>
                      <li>出色的临场应变能力</li>
                      <li>良好的团队协作精神</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 中文委员会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">中文委员会 - 加泰罗尼亚公投专题</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      本委员会将聚焦加泰罗尼亚独立公投这一重要历史事件，探讨民族自决、领土完整与国家统一等深刻议题。代表们将扮演各方角色，深入探讨这一复杂的政治问题。
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">重点议题</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>民族自决权与国家主权</li>
                      <li>地区自治与中央权力</li>
                      <li>经济影响与社会稳定</li>
                      <li>国际社会的态度与立场</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 第三页 - 大会亮点 */}
        <div className="min-h-screen bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <h2 className="text-4xl font-bold text-center text-primary">大会亮点</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
                  <h3 className="text-2xl font-bold text-primary">专业学术团队</h3>
                  <p className="text-gray-600">
                    由经验丰富的学术团队提供支持，确保会议的专业性和学术水平。团队成员均具有丰富的模联经验和专业知识储备。
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
                  <h3 className="text-2xl font-bold text-primary">国际化视野</h3>
                  <p className="text-gray-600">
                    设置中英文双语委员会，为代表提供国际化的交流平台。邀请国际友人参与，促进文化交流与理解。
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
                  <h3 className="text-2xl font-bold text-primary">创新会议体验</h3>
                  <p className="text-gray-600">
                    引入危机联动机制，增加会议的趣味性和挑战性。采用现代化会议系统，提升参会体验。
                  </p>
                </div>
              </div>

              {/* 报名按钮 */}
              <div className="text-center mt-12">
                <a 
                  href="/docs/泛珠三角高中生模拟联合国大会策划案.docx" 
                  download
                  className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-primary/90 transition-colors"
                >
                  下载大会策划案
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 