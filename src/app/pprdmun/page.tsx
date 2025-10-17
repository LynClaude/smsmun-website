'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUNPage() {
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
                  alt="PPRDMUN Background"
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
                        PPRDMUN 2025
                      </h1>
                      <p 
                        className="text-lg md:text-xl leading-relaxed opacity-90"
                        style={{
                          fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                        }}
                      >
                        {messages.pprdmun.description}
                      </p>
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{messages.pprdmun.conference_info}</h2>
                        <ul className="list-disc list-inside space-y-2 opacity-90">
                          <li>{messages.pprdmun.time}</li>
                          <li>{messages.pprdmun.location}</li>
                          <li>{messages.pprdmun.language}</li>
                          <li>{messages.pprdmun.organizer}</li>
                        </ul>
                      </div>
                    </div>

                    {/* 右侧图片展示 */}
                    <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src="/深中模联活动照.pic(1).jpg"
                        alt="PPRDMUN"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News 部分 - 从主页移过来 */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {messages.home.latest_news}
                </motion.h2>
                <div className="overflow-x-auto pb-4">
                  <div className="flex space-x-8 min-w-max px-4">
                    {/* PPRDMUN 2025 二轮通告 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
                    >
                      <div className="relative h-48">
                        <img
                          src="/2025年泛珠三角高中生模拟联合国大会 (192 x 108 mm).png"
                          alt="PPRDMUN 2025 二轮通告"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news1_title}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news1_desc}</p>
                        <a 
                          href="https://mp.weixin.qq.com/s/GN_dAI6kytvnNq-pd3U-5A" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                        >
                          {messages.home.learn_more} →
                        </a>
                      </div>
                    </motion.div>

                    {/* PPRDMUN 2025 会场组委专访 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
                    >
                      <div className="relative h-48">
                        <Image
                          src="/interview.jpg"
                          alt="PPRDMUN 2025 会场组委专访"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news2_title}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news2_desc}</p>
                        <a 
                          href="https://mp.weixin.qq.com/s/u6gDHGuv_gBx2GzQdkwiKQ" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                        >
                          {messages.home.learn_details} →
                        </a>
                      </div>
                    </motion.div>

                    {/* PPRDMUN 2025 一轮通告 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
                    >
                      <div className="relative h-48">
                        <Image
                          src="/announcement.jpg"
                          alt="PPRDMUN 2025 一轮通告"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news3_title}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news3_desc}</p>
                        <a 
                          href="https://mp.weixin.qq.com/s/kLnpjWeEY6tQwvBIVlm0bw" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                        >
                          {messages.home.learn_more} →
                        </a>
                      </div>
                    </motion.div>

                    {/* PPRDMUN 2025 报名开始 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[400px] flex-shrink-0"
                    >
                      <div className="relative h-48">
                        <Image
                          src="/WechatIMG110.jpg"
                          alt="PPRDMUN 2025"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{messages.home.news4_title}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-4">{messages.home.news4_desc}</p>
                        <Link href="/pprdmun" className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base">
                          {messages.home.learn_more} →
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

        {/* 欢迎信区域 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <Link href="/pprdmun/welcome">
              <div className="relative w-full max-w-2xl mx-auto cursor-pointer bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-shadow">
                {/* 信封样式 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-lg" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
                      <path d="M22 8L12 2L2 8V16L12 22L22 16V8Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M2 8L12 14L22 8" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 14V22" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-4">欢迎信</h2>
                  <div className="text-center text-gray-600">点击打开欢迎信</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 英文特殊委员会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">英文特殊委员会 - 美国宪法第十九修正案</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1919年，美国宪法第十九修正案的通过标志着美国女性争取选举权运动的重大胜利。这一修正案禁止联邦政府和各州以性别为由剥夺或限制公民的投票权。本委员会将重现这一历史性时刻，探讨当时的社会背景、政治博弈以及对现代民主制度的深远影响。
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <div className="text-gray-600">
                      <p className="font-semibold mb-2">1919年美国第66届参议院司法委员会</p>
                      <p className="text-sm opacity-90">模拟1919年美国第66届参议院司法委员会就第十九修正案进行的历史性辩论与表决，重现这一改变美国政治格局的关键时刻。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 中文委员会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">中文委员会 - 加泰罗尼亚公投</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2017年加泰罗尼亚独立公投是西班牙近代史上最具争议性的政治事件之一。这次公投不仅挑战了西班牙的宪法秩序，也引发了关于民族自决、地区自治与国家统一的深刻讨论。本委员会将重点关注公投前后的谈判过程，探讨地区政府与中央政府之间的权力博弈，以及这一事件对欧洲地区政治格局的影响。
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <div className="text-gray-600 space-y-4">
                      <div>
                        <p className="font-semibold mb-2">1. 2017加泰罗尼亚独立公投协调机制双边会谈（BTCI）</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">2. 2017加泰罗尼亚独立公投协调机制加泰罗尼亚政府会场（CGM）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 主新闻中心 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">主新闻中心</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">中文新闻中心</h4>
                    <p className="text-gray-600">
                      负责报道加泰罗尼亚公投进程中的重要事件，深入分析各方立场，为代表提供及时、准确的中文新闻报道，助力委员会讨论的深入开展。
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">英文新闻中心</h4>
                    <p className="text-gray-600">
                      专注于美国宪法第十九修正案相关的历史事件报道，通过英文媒体视角，还原20世纪初美国女性争取选举权的重要时刻。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相关文件区域 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-primary">相关文件</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 风纪与行为条例 */}
              <Link href="/pprdmun/conduct">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-4 text-primary hover:text-blue-500 transition-colors">风纪与行为条例</h3>
                    <p className="text-gray-600 mb-6 flex-grow">大会安全政策、代表风纪与行为守则、学术团队成员行为守则等重要规定。</p>
                    <Link href="/pprdmun/conduct" className="text-blue-600 hover:text-blue-800 font-semibold">
                      了解详情 →
                    </Link>
                  </div>
                </div>
              </Link>

              {/* 学术团队预报名 */}
              <Link href="/pprdmun/academic-team">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-4 text-primary hover:text-blue-500 transition-colors">学术团队预报名</h3>
                    <p className="text-gray-600 mb-6 flex-grow">提前开放学术团队成员报名，获得优先面试机会。</p>
                    <Link href="/pprdmun/academic-team" className="text-blue-600 hover:text-blue-800 font-semibold">
                      了解详情 →
                    </Link>
                  </div>
                </div>
              </Link>

              {/* 大会代表报名 */}
              <Link href="/pprdmun/delegate">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-4 text-primary hover:text-blue-500 transition-colors">大会代表报名</h3>
                    <p className="text-gray-600 mb-6 flex-grow">查看大会报名方式、下载申请表及了解各会场信息。</p>
                    <Link href="/pprdmun/delegate" className="text-blue-600 hover:text-blue-800 font-semibold">
                      了解详情 →
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 