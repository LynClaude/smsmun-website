'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2016LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {/* 返回按钮 */}
        <Link 
          href="/pprdmun/2016" 
          className="fixed top-24 left-4 md:left-8 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 信件样式容器 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* 信件背景 */}
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 relative">
              {/* 信件装饰边框 */}
              <div className="absolute inset-4 border-2 border-dashed border-gray-200 rounded-lg"></div>
              
              {/* 年份标识 */}
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                2016
              </div>
              
              {/* 信件内容 */}
              <div className="relative z-10">
                {/* 信件头部 */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">邀请函</h1>
                  <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
                </div>
                
                {/* 信件正文 */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="mb-6 text-lg">尊敬的各校模联人及指导老师:</p>
                  <p className="mb-6 text-lg">展信佳!</p>
                  <p className="mb-6">
                    2016年泛珠三角高中生模拟联合国大会兹定于2016年7月12日至15日于深圳中学举行。在此，我们诚挚地邀请您参与本次会议。
                  </p>
                  <p className="mb-6">
                    时光荏苒，岁月如梭。承载着全国模联先驱梦想的深中联，如今已迈入她崭新的第十一个年头，而泛珠模联也正迎来凤凰木下第七次的绽放。回首过往,十一年来，我们历经风雨，砥砺前行，从 2010 年泛珠三角模联人共同梦想的扬帆起航，到如今泛珠模联已然成为全国高中生模联大会的一面旗帜,我们深知深中模联成长的每一步中离不开各校模联人的热切关注与鼎力支持。如今，模联的多样化发展正欣欣向荣，而泛珠模联人最初的梦想却始终如一。继往开来，展望全新的征程，我们深信梦想的火炬必将走得更远，愿与各校模联同仁携手共同见证 2016 年泛珠模联再续华章!
                  </p>
                  <p className="mb-6">
                    犹记得 2015 泛珠模联，盛况空前。在各校模联人热情支持与积极参与下，我们迎来了来自 70 余所学校的 300 余名代表。而台前幕后，为此倾注心血的组委人数也多达 200 余人。在筹备过程中，我们坚持严谨、高效的自主管理，在科学精简的协会结构与成熟合理的运作机制的基础上，汇聚模联精英，打造卓越会议，让每一位参与其中的青年人都向世界公民迈进一步。从会前到会后，从神州各地到凤凰木下,从学术团队到各校代表，每一所学校的支持，每一位模联人的参与，我们都铭记心中并时刻感激。
                  </p>
                  <p className="mb-6">
                    今夏,经历了六年淬炼和成长的泛珠三角高中生模拟联合国大会将再度大放异彩。大会组委会将延续过往六届泛珠模联的筹办理念，总结经验，稳中求进，在致力于进一步推广优化模拟联合国活动的同时，打造一场更为卓越的公民教育与成长体验。凤凰木下，怀揣着不变的热情与渴望，大会组委会将继续带给代表们高质量的模联体验。
                  </p>
                  <p className="mb-6">
                    感谢各位对泛珠三角高中生模拟联合国大会的关注与支持!2016年泛珠三角高中生模拟联合国大会定会因各位的热情参与而更加精彩!
                  </p>
                  <p className="mb-6 text-lg font-medium">吾等联合国之子民，为更好之世界而联合。</p>
                  
                  {/* 签名区域 */}
                  <div className="mt-12 text-right">
                    <p className="text-lg font-semibold text-primary">2016 年泛珠三角高中生模拟联合国大会 组委会</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
