'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2022LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/pprdmun/2022"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回 PPRDMUN 2022
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">PPRDMUN 2022</h1>
                <p className="text-lg opacity-90">2022年泛珠三角高中生模拟联合国大会</p>
                <p className="text-sm opacity-75 mt-2">Pan-Pearl River Delta Model United Nations Conference 2022</p>
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
                    2022年泛珠三角高中生模拟联合国大会兹定于7月下旬在深圳中学新校区召开。在此，我们诚挚地邀请您参加本次大会。
                  </p>
                  
                  <p className="mb-6">
                    贰零贰贰是燦然一新的一年，作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过十八载春华秋实。在一代代泛珠模联人的倾心奉献与不懈创新下，点滴汇聚江河，学术之水奔流不息，不惧艰难险阻，滚滚驶向未至之地。
                  </p>
                  
                  <p className="mb-6">
                    十二载笃行不辍，十二载踵事增华。身为模联人，我们长怀理想主义之热忱，奋逐独立自由之远方，执守学术至上之理念，肩负青年之使命与公民之责任。过去的十二年中，我们乘时代的浪潮不断前行，菁华，踔厉风发。延续过往十二年的泛珠模联筹办理念，我们审视自身，革旧立新。
                  </p>
                  
                  <p className="mb-6">
                    贰贰年初始，国际政治风云变幻，带领人们重新思考战争与和平，自由与民主之真章。回到二十一世纪的前夜，我们重新审视前南斯拉夫解体后，发生在波黑土地之上的独立内战。世界的注视与干预之下，鲜血写就的历史究竟带来自由的空气，还是刺伤了土地上的芸芸众生？自一九年疫情初始已是两年光景，经济发展与公共卫生间的平衡成为全球议题，立而今之时代，我们回望经济大萧条的黑暗时期，站上国际劳工大会的会场，失业的浪潮席卷而来，无数劳工将何去何从？转换视角，我们将目光置于人类欲望与其管制背后的黑暗，酒精这一从千百年前就写进人类诗篇与历史的符号，它的严格禁令下是否有黑色交易暗中滋生？站在时光的不远处，我们愿不仅求索每一个事实背后的可能，更以史为镜而照今朝。
                  </p>
                  
                  <p className="mb-6">
                    感谢一路上一直以来关注和支持泛珠三角高中生模拟联合国大会的各位同仁，您的赞许与支持是我们前进的动力，您的批评与建议是我们前进的方向。十三载同心并力，我们站在时代的转折点上，更应保持独立思考之可贵精神，不惧发声，不惮革新，观世事之变而不盲从。大会组委会将始终秉持高质量办会理念不辍稳步前进，无畏革故鼎新。在时代的交叉点上，我们期待与有胆识变革、有能力创新的各位同仁携手，共同奏响泛珠模联的又一华章！
                  </p>
                  
                  <p className="mb-6">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  
                  <div className="text-right mt-12">
                    <p className="text-lg font-semibold">
                      2022年泛珠三角高中生模拟联合国大会组委会
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
