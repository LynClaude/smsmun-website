'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2017Page() {
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
              alt="PPRDMUN 2017 Background"
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
                    PPRDMUN 2017
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    光阴荏苒，承载着全国模联先驱梦想的深中模联，如今正稳健地走向第十二个春天，而泛珠模联也正迎来凤凰木下的第八次绽放。泛珠模联已然有着自己独特的芬芳。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2017年7月13日-16日</li>
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
                    alt="PPRDMUN 2017"
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
              year={2017}
              title="PPRDMUN 2017 邀请函"
              description="深中模联第十二年，泛珠模联第八次绽放"
              href="/pprdmun/2017/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 2014地缘危机联动系统 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2014地缘危机联动系统</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 联合国大会紧急特别会议</li>
                      <li>• 欧洲联盟特别外长级会议</li>
                      <li>• 乌克兰问题多方会谈</li>
                      <li>• 叙利亚问题日内瓦和谈</li>
                      <li>• 国家内阁及特殊代表</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2014年地缘危机联动系统，在外交复归理念的指导下，以全球化视野纵观世界格局。本联动系统将重现这一历史关键时刻，探讨各方在国际舞台上的立场与博弈。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1856克里米亚战争巴黎和谈 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1856克里米亚战争巴黎和谈</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">巴黎和谈委员会</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1856年克里米亚战争巴黎和谈，拨散开启近代科技战争的余烟，重新审视东北半球。本委员会将探讨各方在和平进程中的立场与策略。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1989中南半岛争端国际会议 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1989中南半岛争端国际会议</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">中南半岛争端国际会议</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1989年中南半岛争端国际会议，战争的达沃克利斯之剑催化着政治谈判与斡旋的进程。本委员会将探讨地区冲突与国际协调的平衡。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2002非洲联盟特别首脑会议 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2002非洲联盟特别首脑会议</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">非洲联盟特别首脑会议</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2002年非洲联盟特别首脑会议，交织抗衡的利益冲突以刚果盆地为源辐散震颤着大陆的调和与谈判。本委员会将探讨非洲一体化进程中的挑战与机遇。
                    </p>
                  </div>
                </div>
              </div>

              {/* Quebec Conference of 1864 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">Quebec Conference of 1864</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">Quebec会话委员会</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      Quebec Conference of 1864，以革新的姿态重温召开于魁北克城里程碑式的建设性会议。本委员会将探讨加拿大联邦形成过程中的重要历史时刻。
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
