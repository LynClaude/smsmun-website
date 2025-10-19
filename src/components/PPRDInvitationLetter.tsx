'use client'

import { motion } from 'framer-motion'

interface PPRDInvitationLetterProps {
  year: number
  content: string
  backHref: string
}

export default function PPRDInvitationLetter({ year, content, backHref, }: PPRDInvitationLetterProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <div className="mb-8">
            <motion.a
              href={backHref}
              className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回 PPRDMUN {year}
            </motion.a>
          </div>

          {/* 邀请函内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* 信头 */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">PPRDMUN {year}</h1>
              <p className="text-lg opacity-90">
                {year}年泛珠三角高中生模拟联合国大会
              </p>
              <p className="text-sm opacity-75 mt-2">
                Pan-Pearl River Delta Model United Nations Conference {year}
              </p>
            </div>

            {/* 信件内容 */}
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none leading-relaxed"
                style={{ 
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                  fontSize: '18px',
                  lineHeight: '1.8'
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
