'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2018Page() {
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
              alt="PPRDMUN 2018 Background"
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
                    PPRDMUN 2018
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    沐春风而思飞扬，承载着全国先驱梦想的泛珠模联稳步走进第九个万物生长的时节。泛珠模联以敢为人先的精神，专精锐意，力除积弊进取革新。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2018年7月17日-20日</li>
                      <li>举办地点：深圳中学</li>
                      <li>会议语言：中文/英文</li>
                      <li>主办方：深圳中学模拟联合国协会</li>
                    </ul>
                  </div>
                </div>

                {/* 右侧图片展示 */}
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/深中模联活动照.pic(1).jpg"
                    alt="PPRDMUN 2018"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 邀请函区域 */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">邀请函</h2>
              <p className="text-gray-600">点击信件查看完整邀请函内容</p>
            </div>
            <InvitationLetter
              year={2018}
              title="PPRDMUN 2018 邀请函"
              description="泛珠模联第九年，创新与变革的时代"
              href="/pprdmun/2018/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 1914 七月危机局势系统 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1914 七月危机局势系统（1914 July Crisis Situation System）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 伦敦和平会议 London Peace Conference</li>
                      <li>• 巴黎社会主义国际特别会议 Socialist International Paris Conference</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1914年七月危机局势系统，重现第一次世界大战前夕的关键时刻。在欧罗巴诸国剑拔弩张、世界战乱一触即发的旧有格局土崩瓦解的断崖边寻求局势缓和、秩序重建。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1926 大不列颠帝国协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1926 大不列颠帝国协调机制（1926 British Empire Coordination Mechanism）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 英国议会下议院 House of Commons</li>
                      <li>• 伦敦帝国会议 London Imperial Conference</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1926年大不列颠帝国协调机制，重回帝国扩张时代，演绎欧罗巴均势的此消彼长。探讨大英帝国在全球政治格局中的地位与影响。
                    </p>
                  </div>
                </div>
              </div>

              {/* 前南斯拉夫问题国际刑事法庭 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">前南斯拉夫问题国际刑事法庭</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">International Criminal Tribunal for the former Yugoslavia</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      前南斯拉夫问题国际刑事法庭，伫立于铁幕缓缓落下的巴尔干，斟酌联合国处理主权国家内政问题的方案。倾听民族独立的呼喊，在蒙眼女神的天平上探讨屠杀的暴行、平民的福祉。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2018 世界贸易组织总理事会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2018 世界贸易组织总理事会</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">2018 World Trade Organization General Council</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      2018年世界贸易组织总理事会，着眼中国与欧美的贸易摩擦，考量其背后的政治经济矛盾。探讨国际贸易规则与全球经济治理的未来发展。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1763 Congress of Paris */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1763 Congress of Paris</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1763年巴黎会议委员会</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      1763年巴黎会议，重现七年战争结束后的历史场景。探讨欧洲列强在战后秩序重建中的立场与策略，以及全球殖民体系的重新划分。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1947 Historical Security Council */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1947 Historical Security Council</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1947年历史安理会委员会</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      1947年历史安理会，重现联合国成立初期的关键历史时刻。探讨冷战格局形成过程中安理会的作用与挑战。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
