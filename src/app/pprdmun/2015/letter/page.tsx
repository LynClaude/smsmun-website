'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2015LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {/* 返回按钮 */}
        <Link 
          href="/pprdmun/2015" 
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
                2015
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
                  <p className="mb-6 text-lg">尊敬的各校模联人及模联指导老师:</p>
                  <p className="mb-6 text-lg">展信佳!</p>
                  <p className="mb-6">
                    2015 年泛珠三角高中生模拟联合国大会兹定于 2015 年 7 月 14 日-17 日在深圳中学召开。在此，我们诚挚地邀请您参加本次会议。
                  </p>
                  <p className="mb-6">
                    2015 年的泛珠模联意义特殊。今年，作为泛珠模联的承办方与泛珠地区率先成立的模联组织之一，深中模联恰历经十载春秋。十年间，从无到有，从小到大，深中模联不断于探索间迈步前行，始终在挑战中稳健发展，到如今已然建立起自主高效的管理机制。我们有幸与众模联人一同见证这一历程，同样也十分荣幸能够亲历泛珠地区模联发展和各模联组织成长的全过程。
                  </p>
                  <p className="mb-6">
                    而泛珠三角高中生模拟联合国大会，正是深中模联与各位泛珠模联界同仁一道打造，共同品味的饕餮盛宴。自 2010 年始，泛珠模联承载着众模联人的活力与梦想，如今正要迎来她的五周岁生日。火红的凤凰花下，五度花开花谢、来去匆匆，不断有新的模联人在时代的孕育下茁壮成长，也有经验丰富的先驱者继续驰骋于模联舞台，为泛珠地区模联的持续发展贡献着自己愈发成熟的力量。
                  </p>
                  <p className="mb-6">
                    犹记 2014 年的泛珠模联，盛况空前，在各校模联人热情支持与积极参与下，我们迎来了来自 70 余所学校的 300 余名代表。而台前幕后，为此倾注心血的组委人数也多达 200 余人。在筹备过程中，我们坚持严谨、高效的自主管理，在科学精简的协会结构与成熟合理的运作机制的基础上，汇聚模联精英，打造卓越会议，让每一位参与其中的青年人都向世界公民迈进一步。
                  </p>
                  <p className="mb-6">
                    今夏，在改革创新之风吹拂下的南海之滨，怀揣着不变的热情与渴望，大会将继续带给代表们高质量的模联体验。为此，我们优化联动体系，改进常规会议，精心构建特殊委员会，为泛珠模联创造新的开始，也希望能给诸位带来更精致的会议体验。
                  </p>
                  <p className="mb-6">
                    最后，再次感谢各位对泛珠三角高中生模拟联合国大会的关注与支持！2015年泛珠三角高中生模拟联合国大会将因各位的热情参与而更加精彩！
                  </p>
                  <p className="mb-6 text-lg font-medium">吾等联合国之子民，为更好之世界而联合。</p>
                  
                  {/* 签名区域 */}
                  <div className="mt-12 text-right">
                    <p className="text-lg font-semibold text-primary">2015 年泛珠三角高中生模拟联合国大会 组委会</p>
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
