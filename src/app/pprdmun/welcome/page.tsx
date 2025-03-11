'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export default function WelcomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按钮 */}
          <Link 
            href="/pprdmun" 
            className="fixed top-28 left-8 md:left-12 z-50 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg hover:bg-white transition-colors flex items-center group"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            返回
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8">欢迎信</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">尊敬的友校模联组织及模联同仁:</p>
              <p className="mb-6">展信佳!</p>
              <p className="mb-6">2025 年泛珠三角高中生模拟联合国大会兹定于7月中旬在深圳中学泥岗校区线下召开。在此，我们诚挚地邀请您参加本次大会。</p>
              <p className="mb-6">贰零贰伍荣光乍现，是万象更新、锦绣满园的一年。如今，后疫情时代风雨渐歇，终见云开月明，得迎晨曦灿烂、朝阳吐辉。作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过廿一载岁序更替。在一代代泛珠模联人的辛勤浇灌、不懈奋斗之下，学术本位之理念深植于泛珠之土壤而其枝蔓已然欣欣向荣。</p>
              <p className="mb-6">十五载锲而不舍，十五载致知力行。身为模联人，我们长怀理想主义之热忱，坚守"学术本位"之理念，尽青年之才学，探寻世界之真理,始终在模联中传递社会之责任,为模联人塑先进之人格,守"精益求精"之办会理念，延续泛珠模联之薪火。在过去的十五年中，我们紧随时代之浪潮，踔厉奋发、砥砺前行，将于七月仲夏之际迎第十六届泛珠模联，与诸位模联同仁再聚凤凰花下，共襄盛举。</p>
              <p className="mb-6">延续过往十五年的泛珠模联筹办理念，我们秉持剔粕取精之理念，审视自身、革旧立新。二十一世纪的荣光照耀在世界，但风平浪静下是暗流汹涌。双边谈判会场中分裂的声音愈发刺耳，加泰罗尼亚独立公投的激荡浪潮撕裂了伊比利亚半岛的平静。同意与反对的举牌之下，是民族自决权与国家主权的根本性碰撞，还是全球化浪潮所裹挟的地方身份认同和中央集权的矛盾的进发?时间逆流，我们凝视百年前北美大陆，议会落锤的一刻，数十年的辩论和争论归为沉寂。第十九修正案的落定，字字珠玑，在这场赋予妇女选举权的斗争中仿佛民主长河中的一座灯塔。平等的光辉在此处闪烁，一字一句，究竟是社会民主的进步，还是又一部由血与泪谱写的抗争史?国际势力错综纠葛明争暗斗。而今我们站在时间长河交汇之处，唯愿追溯历史之本源，鉴既往，开新篇。我们当重新思考发展之方向，永葆"上下求索"之热情，化解困局，奋楫笃行。</p>
              <p className="mb-6">感谢一路上一直以来关注和支持泛珠三角高中生模拟联合国大会的各位同仁，您的赞许与支持是我们前进的信心，您的批评与建议是我们自我鞭策、奋勇前进的动力。十五载携手并肩，于百年之未有之大变局中，我们更应保持独立思考之可贵精神，为携明灯以御前路之黑暗而敢问苍天、上下求索。大会组委会将始终秉持高质量办会理念，不辍稳步前进，无畏革故鼎新。在时代的交叉点上，我们期待与有胆识变革、有能力创新的各位同仁携手，共同奏响泛珠模联之又一壮美华章!</p>
              <p className="mb-6">吾等联合国之子民，为更美好之世界而联合。</p>
              <div className="text-right">
                <p>2025 年泛珠三角高中生模拟联合国大会 组委会</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
} 