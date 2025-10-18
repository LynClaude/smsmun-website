'use client'

import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'

export default function PPRDMUN2019LetterPage() {
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
                PPRDMUN 2019 邀请函
              </h1>
              <p className="text-gray-600">深中模联十五载，泛珠模联十周岁生日</p>
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
                  2019 年泛珠三角高中生模拟联合国大会兹定于2019年7月24至27日在深圳中学召开。在此，我们诚挚地邀请您参与本次会议。
                </p>

                <p>
                  二零一九年是意义非凡的一年，今年，作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会恰历十五春秋。岁月如矢带着如歌的往昔划破十五年的光阴，指向满布荆棘的来时路。从无到有，生根发芽，这颗种子，因一届又一届泛珠模联人的热忱浇灌，发荣滋长为庭中嘉木，亭亭如盖，日益苍翠蓬勃。
                </p>

                <p>
                  十载风雨砥砺，十载春华秋实。同时，泛珠三角高中生模拟联合国大会也将迎来它的十度绽放。作为模联人，我们始终怀着希望，这希望源于我们独立的精神、自由的激情。因为我们肩负着公民之责任，怀着青年之使命，所以我们不曾退缩。寻找着世界的范式，我们开拓创新，砥志研思。过去九年中，我们不断审视自身，力除弊病，以学术为核心，戮力同心，锐意进取。
                </p>

                <p>
                  延续过往九届泛珠模联的筹办理念，我们总结经验，不断发展。面对挑战与机遇，泛珠模联人披荆斩棘、上下求索。当今世界政治时局，风云诡谲，阴晴多变，在英国脱离欧盟的重重迷雾中，我们着眼于均势与协调，当乌合之众的民主打翻谈判棋牌时，未来又该如何建构？是历史车轮滚滚向前，还是光阴沙漏翻转倒退？
                </p>

                <p>
                  回望一战后的经济大萧条，战后重建的国际体系见证了魏玛共和国民主体系的崩溃，当纳粹党异军突起时，推动王朝复辟是解决党派斗争的权宜之计，重蹈历史的时代溯流，抑或是重建民主体系的外交手段？我们还将重返二十世纪九十年代，见证南斯拉夫的瓦解，目睹民族与人道主义危机并存。无论是登上南极这片神秘之地，还是梦回欧洲与拿破仑斗争，伫立历史的彼端，我们致以最虔诚的凝视。
                </p>

                <p>
                  感谢一路上诸位模联同仁对泛珠三角高中生模拟联合国大会的关注与支持！您的赞扬与支持为我们前进的动力，您的批评指教使我们正向加鞭。十年风雨同舟，站在历史的高地，我们不能有所成而适于平乐，有所惮而安于缄默。大会组委会将秉承初心，在挑战中大步向前，在变革中稳健发展。在时代沉冗的路口我们热切期待着与富有创新精神、变革勇气的诸位同仁携手，共同创造泛珠模联的崭新篇章！
                </p>

                <div className="text-center mt-8">
                  <p className="text-lg font-semibold text-primary mb-4">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  <p className="text-gray-600">
                    2019 年泛珠三角高中生模拟联合国大会 组委会
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
