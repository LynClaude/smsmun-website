'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import PageTransition from '@/components/PageTransition'

export default function ConductPage() {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('pprdmunScrollPosition')
    if (scrollPosition) {
      sessionStorage.removeItem('pprdmunScrollPosition')
    }
  }, [])

  const handleBack = () => {
    const currentScroll = window.scrollY
    sessionStorage.setItem('pprdmunScrollPosition', currentScroll.toString())
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/pprdmun" 
            onClick={handleBack}
            className="fixed top-28 left-8 md:left-12 z-50 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg hover:bg-white transition-colors flex items-center group"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            返回
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8">风纪与行为条例</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">为保证本次会议的顺利进行，并为各与会学校和学术团队成员提供良好的学术和参会体验，保障会议安全，请有意愿申请大会学术团队成员及与会学校和个人代表者下载"风纪与行为条例"，其中包含大会安全政策、代表风纪与行为守则、学术团队成员行为守则。其内容重要，请申请者认真查看其条款内容。凡在大会期间违反此条例者，组委将依据条例严肃处理。</p>
              
              <p className="mb-6">如对此条例内容有任何疑问或者意见，请联系大会秘书处:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">大会秘书长: 甘楚涵 136-3156-3505</p>
                <p className="mb-2">大会常务秘书长: 伍宣静 138-2990-0066</p>
                <p>大会组委会邮箱: PPRDMUN2025@163.com</p>
              </div>

              <div className="flex justify-center">
                <a 
                  href="/docs/泛珠模联2025风纪与行为条例.pdf" 
                  download
                  className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors text-lg"
                >
                  下载风纪与行为条例
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 