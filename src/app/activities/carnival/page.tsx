'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function CarnivalPage() {
  const { messages } = useI18n()

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/activities"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回活动页面
              </Link>
            </div>

            {/* 正在开发页面 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* 页面头部 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {messages.activities.carnival.title}
                </h1>
                <p className="text-lg opacity-90">
                  {messages.activities.carnival.subtitle}
                </p>
              </div>

              {/* 内容区域 */}
              <div className="p-8 md:p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  {/* 开发图标 */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <svg 
                          className="w-16 h-16 text-blue-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                        </svg>
                      </div>
                      {/* 动画效果 */}
                      <motion.div
                        className="absolute inset-0 border-4 border-blue-300 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>

                  {/* 标题 */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    页面正在开发中
                  </h2>

                  {/* 描述 */}
                  <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
                    我们正在努力完善游园会页面内容，敬请期待！
                  </p>
                  <p className="text-base text-gray-500 mb-8">
                    {messages.activities.carnival.description}
                  </p>
                </motion.div>

                {/* 返回按钮 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/activities"
                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    返回活动页面
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md"
                  >
                    返回首页
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

