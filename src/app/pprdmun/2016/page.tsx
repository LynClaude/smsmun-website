'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2016Page() {
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
              alt="PPRDMUN 2016 Background"
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
                    PPRDMUN 2016
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    时光荏苒，岁月如梭。承载着全国模联先驱梦想的深中联，如今已迈入她崭新的第十一个年头，而泛珠模联也正迎来凤凰木下第七次的绽放。泛珠模联已然成为全国高中生模联大会的一面旗帜。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2016年7月12日-15日</li>
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
                    alt="PPRDMUN 2016"
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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center mb-8">邀请函</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6">尊敬的各校模联人及指导老师:</p>
                <p className="mb-6">展信佳!</p>
                <p className="mb-6">2016年泛珠三角高中生模拟联合国大会兹定于2016年7月12日至15日于深圳中学举行。在此，我们诚挚地邀请您参与本次会议。</p>
                <p className="mb-6">时光荏苒，岁月如梭。承载着全国模联先驱梦想的深中联，如今已迈入她崭新的第十一个年头，而泛珠模联也正迎来凤凰木下第七次的绽放。回首过往,十一年来，我们历经风雨，砥砺前行，从 2010 年泛珠三角模联人共同梦想的扬帆起航，到如今泛珠模联已然成为全国高中生模联大会的一面旗帜,我们深知深中模联成长的每一步中离不开各校模联人的热切关注与鼎力支持。如今，模联的多样化发展正欣欣向荣，而泛珠模联人最初的梦想却始终如一。继往开来，展望全新的征程，我们深信梦想的火炬必将走得更远，愿与各校模联同仁携手共同见证 2016 年泛珠模联再续华章!</p>
                <p className="mb-6">犹记得 2015 泛珠模联，盛况空前。在各校模联人热情支持与积极参与下，我们迎来了来自 70 余所学校的 300 余名代表。而台前幕后，为此倾注心血的组委人数也多达 200 余人。在筹备过程中，我们坚持严谨、高效的自主管理，在科学精简的协会结构与成熟合理的运作机制的基础上，汇聚模联精英，打造卓越会议，让每一位参与其中的青年人都向世界公民迈进一步。从会前到会后，从神州各地到凤凰木下,从学术团队到各校代表，每一所学校的支持，每一位模联人的参与，我们都铭记心中并时刻感激。</p>
                <p className="mb-6">今夏,经历了六年淬炼和成长的泛珠三角高中生模拟联合国大会将再度大放异彩。大会组委会将延续过往六届泛珠模联的筹办理念，总结经验，稳中求进，在致力于进一步推广优化模拟联合国活动的同时，打造一场更为卓越的公民教育与成长体验。凤凰木下，怀揣着不变的热情与渴望，大会组委会将继续带给代表们高质量的模联体验。</p>
                <p className="mb-6">感谢各位对泛珠三角高中生模拟联合国大会的关注与支持!2016年泛珠三角高中生模拟联合国大会定会因各位的热情参与而更加精彩!</p>
                <p className="mb-6">吾等联合国之子民，为更好之世界而联合。</p>
                <p>2016 年泛珠三角高中生模拟联合国大会 组委会</p>
              </div>
            </div>
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 1973中东局势联动系统 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1973中东局势联动系统</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 联合国安理会</li>
                      <li>• 阿拉伯国家联盟理事会</li>
                      <li>• 欧洲共同体特别会议</li>
                      <li>• 主新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1973年，中东地区爆发了第四次中东战争（赎罪日战争）。本联动系统将重现这一历史关键时刻，探讨各方在国际舞台上的立场与博弈，以及国际社会对中东局势的应对。
                    </p>
                  </div>
                </div>
              </div>

              {/* 欧洲-地中海国家协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">欧洲-地中海国家协调机制</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 欧洲联盟部长理事会</li>
                      <li>• 欧洲-地中海国家议会大会</li>
                      <li>• 新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      欧洲与地中海地区国家的合作机制是区域一体化的重要体现。本协调机制将探讨欧地合作的发展历程、挑战与机遇，以及各方在区域事务中的协调与合作。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1997北爱尔兰问题多党和平谈判 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1997北爱尔兰问题多党和平谈判</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">多党和平谈判委员会</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1997年北爱尔兰多党和平谈判是解决北爱冲突的重要历史进程。本委员会将探讨各方在和平进程中的立场与策略，以及实现地区和平与稳定的路径。
                    </p>
                  </div>
                </div>
              </div>

              {/* 中欧裁军谈判预备会议 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">中欧裁军谈判预备会议</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <p className="text-gray-600">中欧裁军谈判预备会议</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      中欧裁军谈判预备会议是国际军控与裁军领域的重要机制。本委员会将探讨各方在裁军问题上的立场，以及实现地区安全与稳定的途径。
                    </p>
                  </div>
                </div>
              </div>

              {/* House of Commons */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">House of Commons, 19th Parliament of the United Kingdom</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">委员会设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• House of Commons</li>
                      <li>• MPC Setting</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      英国下议院是英国政治制度的核心机构。本委员会将探讨英国议会制度的运作机制，以及议员在立法和监督政府方面的作用。
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
