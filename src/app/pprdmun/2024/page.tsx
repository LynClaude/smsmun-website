'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2024Page() {
  const { messages } = useI18n()
  
  return (
    <PageTransition>
      <div>
        {/* 第一页 */}
        <div className="relative">
          {/* 背景图片 */}
          <div className="relative h-screen">
            <Image
              src="/pprdbg.png"
              alt="PPRDMUN 2024 Background"
              fill
              className="object-cover brightness-75"
              priority
            />
            {/* 深色蒙版 */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* 内容区域 */}
          <div className="absolute inset-0">
            <div className="container mx-auto h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full px-4 py-24">
                {/* 左侧文字内容 */}
                <div className="text-white space-y-8">
                  <h1 
                    className="text-4xl md:text-6xl font-bold" 
                    style={{ 
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                      fontWeight: '700',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    PPRDMUN 2024
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    2024年泛珠三角高中生模拟联合国大会
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">会议信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>时间：2024年7月中旬</li>
                      <li>地点：深圳中学泥岗校区</li>
                      <li>语言：中文/英文</li>
                      <li>主办：深圳中学模拟联合国协会</li>
                    </ul>
                  </div>
                </div>

                {/* 右侧图片展示 */}
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/深中模联活动照.pic(1).jpg"
                    alt="PPRDMUN 2024"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 邀请函区域 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-primary">邀请函</h2>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                <div 
                  className="prose prose-lg max-w-none"
                  style={{ fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif" }}
                >
                  <p className="text-lg leading-relaxed mb-6">
                    尊敬的友校模联组织及模联同仁：
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    展信佳！
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    2024年泛珠三角高中生模拟联合国大会兹定于7月中旬在深圳中学泥岗校区线下召开。在此，我们诚挚地邀请您参加本次大会。
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    贰零贰肆是万象更新，满庭芳华的一年，三年疫情终得烟消云散我们终迎得晨光憙微，朝暾初露。作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过甘载春华秋实。在一代代泛珠模联人的辛勤浇灌、不懈匠心独运之下，涓滴成河、百川汇海，学术之枝蔓已然欣欣向荣。十四载行远自迩，十四载踵事增华。身为模联人，我们长怀理想主义之热忱，负当代青年之使命，沐浴理性之光，为传泛珠模联之薪火而惟实励新，精进臻善。在过去的十四年中，我们乘时代的浪潮不断前行，奋斗不辍、培风图南，将于七月仲夏之时迎第十五届泛珠模联，与诸位模联同仁再聚风冠凰羽之下。
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    延续过往十四年的泛珠模联筹办理念，我们秉持剔粕取精之理念信奉精雕细琢之原则，审视自身、革旧立新。回溯二十世纪二十年代第一次世界大战所留余震之阴影仍笼罩着欧罗巴大陆,其威胁仍在国际事务中游走。我们重新审视鲁尔危机的迸发，其底蕴究竟是法德国家利益的交锋,亦或是民族情怀与国际格局的错综交织?拨动时光之指针，我们纵观上世纪末延续至今的罗兴亚难民危机，其漫长的苦难岁月仿佛波澜不惊的历史长河中的一抹浓墨。在这场悲剧中，我们不禁要问:严格的边境控制和难民政策，到底是维护国家安全还是加剧了人道主义危机?世道曲折，国际形势变幻莫测，犹如纵横阖的棋局，错综复杂。站在岁月长河的我们，愿不唯求得事物本源，更当以历史为镜，反思今朝。盼望我们不忘前贤智慧，更当以古人之智慧ω飞资球耦今日世道披荆斩棘，破除幽暗迷雾，开启智慧之门。
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    感谢一路上一直以来关注和支持泛珠三角高中生模拟联合国大会的各位同仁，您的赞许与支持是我们前进的信心，您的批评与建议是我们自我鞭策、奋勇前进的动力。十四载携手并肩，于百年之未有之大变局中，我们更应保持独立思考之可贵精神，为携明灯以御前路之黑暗而敢问苍天、上下求索。大会组委会将始终秉持高质量办会理念不辍稳步前进，无畏革故鼎新。在时代的交叉点上，我们期待与有胆识变革、有能力创新的各位同仁携手，共同奏响泛珠模联之又一壮美华章!
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    吾等联合国之子民，为更美好之世界而联合。
                  </p>
                  <p className="text-lg leading-relaxed mb-6 text-right">
                    2024年泛珠三角高中生模拟联合国大会组委会
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 议题设置 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-primary">议题设置</h2>
              
              {/* 议题一 */}
              <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
                <h3 className="text-3xl font-bold text-primary mb-8">议题一：1923 鲁尔危机协调机制</h3>
                <p className="text-lg text-gray-700 mb-6">
                  (1923 Coordination Mechanism for the Ruhr Crisis)
                </p>
                
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-800">会场设置：</h4>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h5 className="text-xl font-semibold text-blue-800 mb-4">
                      1923 鲁尔危机协调机制就德国赔款问题多边会谈
                    </h5>
                    <p className="text-blue-700">
                      (1923 Coordination Mechanism for the Ruhr Crisis Multilateral Negotiations on German Reparations)
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h5 className="text-xl font-semibold text-green-800 mb-4">
                      1923鲁尔危机协调机制法国内阁
                    </h5>
                    <p className="text-green-700">
                      (1923 Coordination Mechanism for the Ruhr Crisis French Cabinet Meeting)
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h5 className="text-xl font-semibold text-purple-800 mb-4">
                      主新闻中心
                    </h5>
                    <p className="text-purple-700">
                      (Main Press Center)
                    </p>
                  </div>
                </div>
              </div>

              {/* 议题二 */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-3xl font-bold text-primary mb-8">议题二：2017 United Nations High Commissioner for Refugees</h3>
                <p className="text-lg text-gray-700 mb-6">
                  (UNHCR)
                </p>
                
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-800">会场设置：</h4>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h5 className="text-xl font-semibold text-blue-800 mb-4">
                      United Nations High Commissioner for Refugees
                    </h5>
                    <p className="text-blue-700">
                      联合国难民事务高级专员办事处
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h5 className="text-xl font-semibold text-purple-800 mb-4">
                      Main Press Center
                    </h5>
                    <p className="text-purple-700">
                      主新闻中心
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Link 
              href="/pprdmun"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
            >
              ← 返回 PPRDMUN 主页
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
