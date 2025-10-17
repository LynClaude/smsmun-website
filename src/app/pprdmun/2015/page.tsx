'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2015Page() {
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
              alt="PPRDMUN 2015 Background"
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
                    PPRDMUN 2015
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    2015年的泛珠模联意义特殊。作为泛珠模联的承办方与泛珠地区率先成立的模联组织之一，深中模联恰历经十载春秋。而泛珠三角高中生模拟联合国大会，正是深中模联与各位泛珠模联界同仁一道打造，共同品味的饕餮盛宴。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2015年7月14日-17日</li>
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
                    alt="PPRDMUN 2015"
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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center mb-8">欢迎信</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6">尊敬的各校模联人及模联指导老师:</p>
                <p className="mb-6">展信佳!</p>
                <p className="mb-6">2015 年泛珠三角高中生模拟联合国大会兹定于 2015 年 7 月 14 日-17 日在深圳中学召开。在此，我们诚挚地邀请您参加本次会议。</p>
                <p className="mb-6">2015 年的泛珠模联意义特殊。今年，作为泛珠模联的承办方与泛珠地区率先成立的模联组织之一，深中模联恰历经十载春秋。十年间，从无到有，从小到大，深中模联不断于探索间迈步前行，始终在挑战中稳健发展，到如今已然建立起自主高效的管理机制。我们有幸与众模联人一同见证这一历程，同样也十分荣幸能够亲历泛珠地区模联发展和各模联组织成长的全过程。</p>
                <p className="mb-6">而泛珠三角高中生模拟联合国大会，正是深中模联与各位泛珠模联界同仁一道打造，共同品味的饕餮盛宴。自 2010 年始，泛珠模联承载着众模联人的活力与梦想，如今正要迎来她的五周岁生日。火红的凤凰花下，五度花开花谢、来去匆匆，不断有新的模联人在时代的孕育下茁壮成长，也有经验丰富的先驱者继续驰骋于模联舞台，为泛珠地区模联的持续发展贡献着自己愈发成熟的力量。</p>
                <p className="mb-6">犹记 2014 年的泛珠模联，盛况空前，在各校模联人热情支持与积极参与下，我们迎来了来自 70 余所学校的 300 余名代表。而台前幕后，为此倾注心血的组委人数也多达 200 余人。在筹备过程中，我们坚持严谨、高效的自主管理，在科学精简的协会结构与成熟合理的运作机制的基础上，汇聚模联精英，打造卓越会议，让每一位参与其中的青年人都向世界公民迈进一步。</p>
                <p className="mb-6">今夏，在改革创新之风吹拂下的南海之滨，怀揣着不变的热情与渴望，大会将继续带给代表们高质量的模联体验。为此，我们优化联动体系，改进常规会议，精心构建特殊委员会，为泛珠模联创造新的开始，也希望能给诸位带来更精致的会议体验。</p>
                <p className="mb-6">最后，再次感谢各位对泛珠三角高中生模拟联合国大会的关注与支持！2015年泛珠三角高中生模拟联合国大会将因各位的热情参与而更加精彩！</p>
                <p className="mb-6">吾等联合国之子民，为更好之世界而联合。</p>
                <p>2015 年泛珠三角高中生模拟联合国大会 组委会</p>
              </div>
            </div>
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 2001联动系统 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2001联动系统</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 上海合作组织部长级会议</li>
                      <li>• 阿拉伯国家联盟部长级（外长）理事会</li>
                      <li>• 北大西洋理事会紧急会议</li>
                      <li>• 塔利班内阁</li>
                      <li>• 北方联盟内阁</li>
                      <li>• 特代工作室</li>
                      <li>• 会议指导中心</li>
                      <li>• 主新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2001年，世界格局发生重大变化。九一一事件后，国际反恐合作成为各国关注的焦点。本联动系统将重现这一历史关键时刻，探讨各国在反恐合作中的立场与博弈。
                    </p>
                  </div>
                </div>
              </div>

              {/* 国际烟草问题协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">国际烟草问题协调机制</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 世界卫生大会</li>
                      <li>• 世界贸易组织部长级会议</li>
                      <li>• 主新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      国际社会对烟草控制问题的关注日益增加。本协调机制将探讨各国在烟草控制政策、国际贸易与公共健康之间的平衡。
                    </p>
                  </div>
                </div>
              </div>

              {/* 加泰罗尼亚独立问题特别委员会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">加泰罗尼亚独立问题特别委员会</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 加泰罗尼亚议会</li>
                      <li>• 西班牙议会众议院</li>
                      <li>• 会议指导中心</li>
                      <li>• 主新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      加泰罗尼亚独立问题是西班牙政治的重要议题。本特别委员会将探讨地区自治与国家统一的平衡，以及民族自决权的边界。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1782巴黎和谈 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1782巴黎和谈</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">历史委员会 - 重现1782年巴黎和谈的历史场景</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1782年巴黎和谈是结束美国独立战争的重要历史事件。本委员会将探讨各方在谈判中的立场与策略。
                    </p>
                  </div>
                </div>
              </div>

              {/* US CONGRESS */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">US CONGRESS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• C308 US CONGRESS</li>
                      <li>• MPC</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      美国国会是美国政治的核心机构。本委员会将探讨美国内政外交政策的制定过程。
                    </p>
                  </div>
                </div>
              </div>

              {/* MPC总新闻中心 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">MPC总新闻中心</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">总新闻中心 - 负责所有会议的新闻报道</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      新闻中心负责报道各个委员会的重要事件，为代表提供及时、准确的新闻报道，助力会议讨论的深入开展。
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
