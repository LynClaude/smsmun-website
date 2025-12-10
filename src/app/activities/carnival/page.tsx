'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function CarnivalPage() {
  const { messages } = useI18n()

  return (
    <PageTransition>
      <div>
        {/* 页面标题 - 与校内会相同的深蓝色设计 */}
        <div className="relative pt-40 pb-32 overflow-hidden">
          {/* 背景渐变层 - 深蓝色 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
          
          {/* 装饰性几何图案 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 rounded-full opacity-5 blur-3xl"></div>
          </div>
          
          {/* 网格装饰 */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* 内容区域 */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              {/* 装饰性前置元素 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                style={{ 
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                  fontWeight: '700',
                  letterSpacing: '0.03em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                {messages.activities.carnival.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                style={{
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                页面正在开发中
              </motion.p>
              
              {/* 装饰性后置元素 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </motion.div>
            </div>
          </div>
          
          {/* 底部渐变遮罩 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>
    </PageTransition>
  )
}

