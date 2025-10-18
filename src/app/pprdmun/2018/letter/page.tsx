'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2018LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {/* 返回按钮 */}
        <Link 
          href="/pprdmun/2018" 
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
                2018
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
                  <p className="mb-6 text-lg">尊敬的友校模联组织及模联同仁:</p>
                  <p className="mb-6 text-lg">展信佳!</p>
                  <p className="mb-6">
                    2018 泛珠三角高中生模拟联合国大会兹定于 2018年7月 17 至 20 日在深圳中学召开。在此，我们诚挚地邀请您参与本次会议。
                  </p>
                  <p className="mb-6">
                    《联合国宪章》序言:"我联合国人民同兹决心:欲免后世再遭今代人类两度身历惨不堪言之战祸。"亲历两次大战深重苦难的先贤建立联合国,欲以国际组织的运用维持国际和平及安全，全球人民经济及社会之进展。拟联合国，同样因"世界公民"的理想而诞生。模联人怀揣着憧憬与激情,以模拟之形式，联合之愿望探索国际关系的运行,以独立之精神,自由之思想实践对社会事务的关注，以公民之责任、青年之使命寻找世界的范式。
                  </p>
                  <p className="mb-6">
                    沐春风而思飞扬，承载着全国先驱梦想的泛珠模联稳步走进第九个万物生长的时节。忆往昔征程，泛珠模联人首创性地开拓了模联发展方向，共同植下创新的种子。这颗种子,因一届又一届泛珠模联人的热忱浇灌 ,发荣滋长为庭中嘉木日益苍翠蓬勃。过去八年中,泛珠模联以敢为人先的精神 ,专精锐意 ,力除积弊进取革新。为完善会议形式，追求学术提升，我们秉承联合国宗旨，坚守学术本位，不断审视自身、充实自我。
                  </p>
                  <p className="mb-6">
                    当下，模联活动广泛普及，各地大小会议涌现，显欣欣之势。面对挑战与机遇，泛珠模联人愿以自开拓者起相承的理念，始终如一的昂然志气，锐意向前上下求索，为地区会议的进一步发展作出自己的贡献。为力争外交原则之复归我们将变革模拟机制，裁冗立新，在欧罗巴诸国剑拔弩张、世界战乱一触即发旧有格局土崩瓦解的断崖边寻求局势缓和、秩序重建。我们还将着眼中国与欧美的贸易摩擦，考量其背后的政治经济矛盾;倾听民族独立的呼喊,在蒙眼女神的天平上探讨屠杀的暴行、平民的福祉;重回帝国扩张时代,演绎欧罗巴均势的此消彼长;伫立于铁幕缓缓落下的巴尔干,斟酌联合国处理主权国家内政问题的方案。
                  </p>
                  <p className="mb-6">
                    感谢一路上诸位模联同仁对泛珠三角高中生模拟联合国大会的关注与支持!我们始终珍视这份信任，将其化为前行的鞭策。诸位的肯定和参与，必将使经历了八年淬炼的泛珠三角高中生模拟联合国大会于今年盛夏大放异彩。大会组委会将秉承初心，在挑战中大步向前,在变革中稳健发展,以期为泛珠地区的模联人奉上一场学术盛宴,打造一场更为卓越的公民教育体验。我们热切期待着与富有创新精神、变革勇气的诸位同仁携手，共同创造泛珠模联的崭新篇章!
                  </p>
                  <p className="mb-6 text-lg font-medium">吾等联合国之子民，为更美好之世界而联合。</p>
                  
                  {/* 签名区域 */}
                  <div className="mt-12 text-right">
                    <p className="text-lg font-semibold text-primary">2018 年泛珠三角高中生模拟联合国大会组委会</p>
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
