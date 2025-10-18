'use client'

import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'

export default function PPRDMUN2020LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            {/* 信件头部 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                PPRDMUN 2020 邀请函
              </h1>
              <p className="text-gray-600">线上会议元年，泛珠模联十一载</p>
            </div>

            {/* 收件人信息 */}
            <div className="mb-8">
              <div className="text-sm text-gray-500 mb-2">收件人：</div>
              <div className="text-lg font-medium">各校模联组织及模联同仁</div>
            </div>

            {/* 信件正文 */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-4">
                <p className="text-lg">
                  <strong>展信佳!</strong>
                </p>
                
                <p>
                  2020年泛珠三角高中生模拟联合国大会兹定于 2020年7月24日至27日以线上会议形式召开。在此，我们诚挚地邀请您参加本次大会。
                </p>

                <p>
                  贰零贰零是不平凡的一年，作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过十六载光阴。在泛珠模联人不懈的坚守中、在泛珠模联人崇高的追求中，信念的微光积累成岁月的光束，映出往日斑驳的波澜，透过阴霾照亮未来的道路。
                </p>

                <p>
                  十一载风雨兼程，十一载砥砺前行。今年，泛珠三角高中生模拟联合国大会也迎来了它的第十一个年头。身为模联人，我们始终怀揣着对世界的热忱，这热忱源于对独立和自由的向往和对过往与未来的好奇。因为我们始终肩负着公民之责任，怀着青年之使命，所以我们不曾放弃。我们格物致知，上下求索，寻找着世界的范式。过去的十年中，我们不断提升自己，革故鼎新，秉承学术本位的理念，齐心协力，锐意进取。
                </p>

                <p>
                  延续过往十年的泛珠模联筹办理念，我们审视自身，革旧立新。面对复杂的局势，泛珠模联人直面挑战，把握机遇。世界政治中的纵，国际局势已然呈现诡谲之态。数月以来，全球疫情日益严峻，欧盟内部合作危机逐渐加剧。在份份被否决的文件背后，在一次次党派利益的激辩背后，是逐秒攀升的死亡人数，是失去色彩的人性和灵魂。疫情的梦魇笼罩在欧洲上方，在国家的利益与"欧洲统一"理念的矛盾中，如何能拨开迷雾，使欧罗巴大陆往日的生机重现？
                </p>

                <p>
                  拨动时光的指针，回到20世纪未被窥探已久的里海，波光粼粼、浮光跃金，其中隐藏着令人迷醉的财富，也暗藏着打破土地的平静的危机。站在历史的高点，我们凝视着每一个事实背后的可能。
                </p>

                <p>
                  感谢一路上一直以来关注和支持泛珠三角模拟联合国大会的各位同仁，您的赞许与支持是我们前进的动力，您的批评与建议是我们鞭策自己变得更好的动力。十一载携手并进，伫立于历史的巍峨高山，我们更需敢于发声，敢于革新。大会组委会将秉持初心，在波澜中稳步前进，在动荡中横刀立马。在时代的浮沉中我们期待与敢于变革、敢于创新的各位同仁同历冷暖，共同奏响泛珠模联的又一华章！
                </p>

                <div className="text-center mt-8">
                  <p className="text-lg font-semibold text-primary mb-4">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  <p className="text-gray-600">
                    2020 年泛珠三角高中生模拟联合国大会 组委会
                  </p>
                </div>
              </div>
            </div>

            {/* 返回按钮 */}
            <div className="text-center mt-12">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                ← 返回
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
