'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function DelegatePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/pprdmun" 
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
            <h1 className="text-3xl font-bold text-center mb-8">大会代表预报名</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">为方便大会后续安排，并为与会学校提供良好的学术和参会体验，请有意愿报名本次大会的代表扫描此二维码，在问卷中填写意愿信息(如为学校代表团可由领队代为填写)。信息仅供数据参考，不用作真正报名。</p>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <Image
                    src="/qrcode.png"
                    alt="预报名二维码"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <p className="mb-6">如对大会代表预报名有任何疑问或者意见，欢迎联系大会秘书处:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">大会秘书长: 甘楚涵 136-3156-3505</p>
                <p className="mb-2">大会常务秘书长: 伍宣静 138-2990-0066</p>
                <p>大会组委会邮箱: PPRDMUN2025@163.com</p>
              </div>

              <p className="text-center italic">感谢您对 2025 泛珠三角高中生模拟联合国大会的关注与支持，我们期待于七月仲夏在 2025 PPRD相会，于风凰木下书写华章。</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 