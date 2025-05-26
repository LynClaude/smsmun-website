'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function DelegatePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">大会代表报名</h1>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-primary">大会报名方式</h2>
              <ol className="list-decimal list-inside space-y-4 mb-8">
                <li>请有意愿参会的学校下载《学校席位申请表》，并按要求于 2025年5月10日23:59前将填写完毕的表格发送至大会组委会邮箱:PPRDMUN2025@163.com;</li>
                <li>报名本次大会的学校需要填写学校席位申请表，且需要将本校参与大会每位代表的个人席位申请表与学校席位申请表一同上交;</li>
                <li>申报参会人数含所有委员会代表，不含领队教师、观察员及学术团队成员!</li>
                <li>大会组委会将根据各校报名情况统筹安排各校最终分配到的参会名额;</li>
                <li>此次会议开放个人报名。如因条件限制无法以学校形式报名的个人请下载《个人席位申请表》,并按要求于 2025年5月10日 23:59前将填写完毕的表格发送至大会组委会邮箱:PPRDMUN2025@163.com;</li>
                <li>此次会议开放学术团队成员报名。有意愿申请成为大会学术团队成员者，请下载《学术团队申请表》，并按要求于 2025年5月3日23:59前将填写完毕的表格发送至大会组委会邮箱:PPRDMUN2025@163.com，大会组委会将会对申请学术团队者进行面试，届时将会提前以短信及邮件的形式通知;席位分配将于第三轮通告中公布;</li>
                <li>本次大会各个会场均需要进行学术测试，请有意愿报名的代表完成学测，并按要求于 2025年5月17日 23:59前将完成的学术测试按照不同会场发送至不同会场相应的邮箱。若报名多个会场，则需要完成每个对应会场的学术测试。学术测试获取请点击"阅读原文";</li>
              </ol>

              <h2 className="text-2xl font-bold mb-4 text-primary">各会场邮箱</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-8 space-y-4">
                <p><strong>2017 加泰罗尼亚公投协调机制就加泰独立问题双边会谈(BTCI)</strong><br />PPRDMUN2025BTCI@163.com</p>
                <p><strong>2017 加泰罗尼亚公投协调机制加泰罗尼亚政府会议(CGM)</strong><br />PPRDMUN2025CGM@163.com</p>
                <p><strong>主新闻中心(MPCC)</strong><br />PPRDMUN2025MPCC@163.com</p>
                <p><strong>1919 The Committee on Women Suffrage of 66th Congress of United States Senate(USS)</strong><br />PPRDMUN2025USS@163.com</p>
                <p><strong>Main Press Center(MPCE)</strong><br />PPRDMUN2025MPCE@163.com</p>
              </div>

              <div className="flex justify-center space-x-4 mb-8">
                <button 
                  onClick={() => window.open('/docs/PPRDMUN2025+学校席位申请表.docx', '_blank')}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                >
                  下载学校席位申请表
                </button>
                <button 
                  onClick={() => window.open('/docs/PPRDMUN2025+个人席位申请表.docx', '_blank')}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                >
                  下载个人席位申请表
                </button>
              </div>

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