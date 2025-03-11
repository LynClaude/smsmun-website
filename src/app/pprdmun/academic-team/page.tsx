'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'

export default function AcademicTeamPage() {
  const router = useRouter()

  const handleBack = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const currentScroll = window.scrollY
    sessionStorage.setItem('pprdmunScrollPosition', currentScroll.toString())
    requestAnimationFrame(() => {
      router.back()
    })
  }, [router])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
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
          </a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8">学术团队预报名</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">本次会议将提前开放学术团队成员报名。请有意愿申请成为大会学术团队成员者，下载"学术团队预申请表"，并按要求于 2025年3月21日23:59 前将此申请表及邮件主题命名为"[姓名]PPRDMUN2025 学术团队预申请表"以 word 文档的附件形式发送至 PPRDMUN2025@163.com。</p>
              
              <p className="mb-6">凡在此期限前提交预申请表的申请者将有机会提前选择学术团队志愿，优先安排学术团队面试时间。大会组委会将会对申请学术团队者进行电话面试，届时将会提前以短信的形式通知。</p>
              
              <p className="mb-6">欢迎各位关注大会官方微信公众号"泛珠模联"，以及时了解会议最新动态。其他会议相关信息(包括但不限于会场具体设置、主席团信息、席位分配)将在后续通告中告知，敬请留意。</p>
              
              <p className="mb-6">如有任何问题或者意见，欢迎与我们联系:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">大会秘书长: 甘楚涵 136-3156-3505</p>
                <p>大会常务秘书长: 伍宣静 138-2990-0066</p>
              </div>

              <div className="flex justify-center">
                <a 
                  href="/docs/PPRDMUN2025+学术团队申请表.docx" 
                  download
                  className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors text-lg"
                >
                  下载学术团队预申请表
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 