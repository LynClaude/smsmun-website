'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUN2017LetterPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {/* 返回按钮 */}
        <Link 
          href="/pprdmun/2017" 
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
                2017
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
                  <p className="mb-6 text-lg">展信佳！</p>
                  <p className="mb-6">
                    2017 年泛珠三角高中生模拟联合国大会兹定于 2017 年 7 月 13 日至 16 日在深圳中学召开。在此，我们诚挚地邀请您参与本次会议。
                  </p>
                  <p className="mb-6">
                    光阴荏苒，承载着全国模联先驱梦想的深中模联，如今正稳健地走向第十二个春天，而泛珠模联也正迎来凤凰木下的第八次绽放。十二年来，我们披襟斩棘，携手共进，深知深中模联成长的每一步中离不开各校模联人的热切关注与鼎力支持。2010 年，泛珠三角模联人共同种下梦想的种子；现如今，泛珠模联已然有着自己独特的芬芳。如今，模联的多样化发展正欣欣向荣，而泛珠模联人最初的梦想却始终如一。继往开来，展望全新的征程，我们深信梦想的火炬必将走得更远，愿与各校模联同仁携手共同见证2017 年泛珠模联再续华章！
                  </p>
                  <p className="mb-6">
                    本届泛珠三角高中生模拟联合国大会，我们将一如既往地秉承着自主创新的精神，坚守着学术至上的原则，怀揣着不变的热情与渴望，为代表带来一场宽领域、多角度的学术盛宴。大会纵横时空双轴，包罗了涉及全球四大洲的议题及相关会议：2014 联动系统、1856 巴黎和会、1989 中南半岛局势国际会议、2002 非洲联盟特别首脑会议及英文会 Quebec Conference of 1864。2014 联动系统，在外交复归理念的指导下，以全球化视野纵观世界格局；1856 巴黎和会,拨散开启近代科技战争的余烟，重新审视东北半球；1989 中南半岛局势国际会议，战争的达沃克利斯之剑催化着政治谈判与斡旋的进程；2002 非洲联盟特别首脑会议，交织抗衡的利益冲突以刚果盆地为源辐散震颤着大陆的调和与谈判；英文会Quebec Conference of 1864，以革新的姿态重温召开于魁北克城里程碑式的建设性会议。
                  </p>
                  <p className="mb-6">
                    今夏，历经七年锤炼锻造的泛珠三角高中生模拟联合国大会将再放异彩。大会组委会将延续往届泛珠模联的筹办理念，反思既往、把握当下、放眼未来，在致力于进一步推广、优化模拟联合国活动的同时，打造一场更为卓越的公民教育与成长体验。凤凰木下，怀揣着一如既往的热情与渴望，大会组委会将继续带给代表们高质量的模联体验。
                  </p>
                  <p className="mb-6">
                    感谢各位对泛珠三角高中生模拟联合国大会的关注与支持！2017 年泛珠三角高中生模拟联合国大会定会因各位的热情参与而更加精彩！
                  </p>
                  <p className="mb-6 text-lg font-medium">吾等联合国之子民，为更好之世界而联合。</p>
                  
                  {/* 签名区域 */}
                  <div className="mt-12 text-right">
                    <p className="text-lg font-semibold text-primary">2017 年泛珠三角高中生模拟联合国大会 组委会</p>
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
