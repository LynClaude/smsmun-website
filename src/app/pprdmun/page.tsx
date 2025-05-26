'use client'

import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export default function PPRDMUNPage() {
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
                    第十六届泛珠三角模拟联合国大会是华南地区最具影响力的模联会议之一。本届大会将继续秉承"和平、发展、合作、共赢"的理念，为各校学生提供一个展示外交才能、增进国际理解的专业平台。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2025年7月中旬</li>
                      <li>举办地点：深圳中学（泥岗校区）</li>
                      <li>会议语言：中文/英文</li>
                      <li>主办方：深圳中学模拟联合国协会</li>
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
                      <p className="font-semibold mb-2">美国参议院</p>
                      <p className="text-sm opacity-90">模拟1919年美国参议院就第十九修正案进行的历史性辩论与表决，重现这一改变美国政治格局的关键时刻。</p>
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