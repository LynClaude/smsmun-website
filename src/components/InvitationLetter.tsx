'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface InvitationLetterProps {
  year: number
  title: string
  description?: string
  href: string
}

export default function InvitationLetter({ year, title, description, href }: InvitationLetterProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-auto cursor-pointer group"
      >
        {/* 信封背景 */}
        <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg border-2 border-amber-200 p-6 hover:shadow-xl transition-shadow duration-300">
          {/* 信封装饰线条 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-400 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-400 rounded-b-lg"></div>
          
          {/* 年份标签 */}
          <div className="absolute -top-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            {year}
          </div>
          
          {/* 信件内容 */}
          <div className="relative z-10">
            {/* 收件人地址 */}
            <div className="mb-4">
              <div className="text-xs text-amber-600 mb-1">收件人:</div>
              <div className="text-sm font-medium text-gray-700">各校模联同仁</div>
              <div className="text-sm font-medium text-gray-700">模联指导老师</div>
            </div>
            
            {/* 信件标题 */}
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
              {description && (
                <p className="text-xs text-gray-600">{description}</p>
              )}
            </div>
            
            {/* 信件图标 */}
            <div className="text-center mb-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            {/* 点击提示 */}
            <div className="text-center">
              <span className="text-xs text-amber-600 group-hover:text-amber-700 transition-colors">
                点击打开信件 →
              </span>
            </div>
          </div>
          
          {/* 信封装饰元素 */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-amber-300 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-400 rounded-full opacity-30"></div>
          <div className="absolute top-6 left-6 w-1 h-1 bg-amber-400 rounded-full opacity-30"></div>
        </div>
      </motion.div>
    </Link>
  )
}
