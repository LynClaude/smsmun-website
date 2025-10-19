'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2021LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/pprdmun/2021"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回 PPRDMUN 2021
              </Link>
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">PPRDMUN 2021</h1>
                <p className="text-lg opacity-90">2021年泛珠三角高中生模拟联合国大会</p>
                <p className="text-sm opacity-75 mt-2">Pan-Pearl River Delta Model United Nations Conference 2021</p>
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
                >
                  <p className="mb-6">
                    尊敬的友校模联组织及模联同仁：
                  </p>
                  
                  <p className="mb-6">
                    展信佳！
                  </p>
                  
                  <p className="mb-6">
                    2021年泛珠三角高中生模拟联合国大会兹定于7月中旬在深圳中学新校区召开。在此，我们诚挚地邀请您参加本次大会。
                  </p>
                  
                  <p className="mb-6">
                    贰零贰壹是时盛岁新的一年，作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过十七载春华秋实。在一代代泛珠模联人的浇灌、呵护和培育之下，学术之枝蔓欣欣向荣枝头花蕾含苞待放；时间转化为养料，滋养了幼小的嫩芽，也见证了许许多多在树下驻足的泛珠模联人。
                  </p>
                  
                  <p className="mb-6">
                    十二载休戚与共，十二载初心不改。身为模联人，为天地立心，我们不断反思，不断提升，力求开当今新局面与新高度；为生民立命，我们始终肩负着公民之责任，怀着青年之使命；为往圣继绝学，我们始终秉持学术本位的理念，怀抱理想主义的热忱，共为万世开太平而砥砺前行。在过去的十一年中，我们乘时代的浪潮不断前行，博观约取，戮力同心，百舸争流，千帆竞发。
                  </p>
                  
                  <p className="mb-6">
                    延续过往十一年的泛珠模联筹办理念，我们审视自身，革旧立新。自贰零年初始，新冠疫情爆发，模联活动受阻无穷，面对未知前路，泛珠模联人披荆斩棘，迎难而上。病毒以惊人的速度散布全球，带来死亡与恐惧，而被视为"唯一也是最好的解决方案"的新冠疫苗，能否如人们所愿带去健康和安宁？在国际局势表面的和平之下暗潮涌动，化学武器危机的爆发到底是刺伤了人们，还是揭开了被掩盖的最后一道伤疤？随着人类社会的发展，环境保护成为不可回避的时代课题，各自怀揣利益的人们，如何在重重纠葛之中寻求人与自然的破局之法？再回望过去，落眼于中世纪的欧洲。太阳王的光辉普照，无限荣光下，战争和动荡却也洒遍每一个角落。国家与国家在棋盘之上纵横博弈，谁将最终为此付出鲜血？站在历史的彼岸，我们求索着每一个事实背后新的可能。
                  </p>
                  
                  <p className="mb-6">
                    感谢一路上一直以来关注和支持泛珠三角高中生模拟联合国大会的各位同仁，您的赞许与支持是我们前进的动力，您的批评与建议是我们前进的方向。十二载风雨同舟，我们站在时代的转折点上，理应居安思危，不慕古，不留今，与时变，与俗化。大会组委会将始终秉持高质量办会理念，在波中稳步前进，在动荡中横刀立马。在时代的交叉点上，我们期待与有胆识变革、有能力创新的各位同仁携手，共同奏响泛珠模联的又一华章！
                  </p>
                  
                  <p className="mb-6">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  
                  <div className="text-right mt-12">
                    <p className="text-lg font-semibold">
                      2021年泛珠三角高中生模拟联合国大会组委会
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
