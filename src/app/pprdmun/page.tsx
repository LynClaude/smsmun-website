'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PPRDMUNPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden"
    >
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
    </motion.div>
  )
} 