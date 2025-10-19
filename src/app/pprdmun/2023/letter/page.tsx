'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2023LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/pprdmun/2023"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回 PPRDMUN 2023
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">PPRDMUN 2023</h1>
                <p className="text-lg opacity-90">2023年泛珠三角高中生模拟联合国大会</p>
                <p className="text-sm opacity-75 mt-2">Pan-Pearl River Delta Model United Nations Conference 2023</p>
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
                    2023年泛珠三角高中生模拟联合国大会兹定于7月中旬在深圳中学泥岗校区线下召开。在此，我们诚挚地邀请您参加本次大会。
                  </p>
                  
                  <p className="mb-6">
                    贰零贰叁是生机盎然的一年，疫情的阴霾正逐渐消散，希望的曙光重又扬洒于世界。作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过十九载。在一代代泛珠模联人的辛勤浇灌、不懈培育之下，学术的光辉在历史的长河中汇聚，以破竹之势冲破艰难险阻，抵达理想之彼岸。
                  </p>
                  
                  <p className="mb-6">
                    十三载砥砺深耕，十三载履践致远。身为模联人，我们长怀理想主义之热忱执创新之矛、务实之剑，以新时代青年格局担公民责任，不畏艰险、上下求索。在过去的十三年中，我们乘时代的浪潮不断前行，奋楫扬帆、续前行，将于仲夏时节拥抱第十四届泛珠模联，和各位同仁再聚凤凰花下。
                  </p>
                  
                  <p className="mb-6">
                    延续过往十三年的泛珠模联筹办理念，我们秉持剔粕取精之理念，审视自身革旧立新。回望二十世纪，冷战之威胁无孔不入地在国际事务中渗透，于各国上空悬挂的达摩克里斯之剑在抗争与对峙中摇摆不定。审视着马岛上空呼啸的敌意与冰冷的炮火，英阿争端的背后暗藏的究竟是历史与现实的利益沟壑，还是民族主义与国际格局间的对抗？立而今之时代，当军备竞赛的脚步进一步踏出地球迈向太空，当边疆愈发伸向无人的宇宙、企图在外层空间肆意延拓，那深邃无垠的黑暗之中又潜伏着怎样的危机与挑战？在世界的棋盘之上，国家纵横捭阖、明争暗斗。我们以史为镜、渴求以理性之态度求索事实背后的万般可能，找到真正通往和平的康庄大道。
                  </p>
                  
                  <p className="mb-6">
                    感谢一路上一直以来关注和支持泛珠三角高中生模拟联合国大会的各位同仁，您的赞许与支持是我们前进的信心，您的批评与建议是我们自我鞭策、奋勇前进的动力。十三载戮力同心，于百年未有之大变局中，我们更应保持独立思考之可贵精神，进一步追逐理想明灯，驱散前路之黑暗。大会组委会将始终秉持高质量办会理念，不辍稳步前进，无畏革故鼎新。在时代的交叉点上，我们期待与有胆识变革、有能力创新的各位同仁携手，再次奏响泛珠模联之壮美华章！
                  </p>
                  
                  <p className="mb-6">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  
                  <div className="text-right mt-12">
                    <p className="text-lg font-semibold">
                      2023年泛珠三角高中生模拟联合国大会组委会
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
