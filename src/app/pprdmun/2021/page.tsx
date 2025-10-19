'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2021Page() {
  const { messages } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 2021年的照片数组
  const images = [
    '/PPRD2021/20211.jpeg',
    '/PPRD2021/20212.jpeg',
    '/PPRD2021/20213.jpeg',
    '/PPRD2021/20214.png',
    '/PPRD2021/20215.png',
    '/PPRD2021/20216.png'
  ]

  // 自动轮播图片
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // 每3秒切换一张图片

    return () => clearInterval(interval)
  }, [images.length])
  
  return (
    <PageTransition>
      <div>
        {/* 第一页 */}
        <div className="relative">
          {/* 背景图片 */}
          <div className="relative h-screen">
            <Image
              src="/pprd-common-bg.webp"
              alt="PPRDMUN 2021 Background"
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
                    PPRDMUN 2021
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    贰零贰壹是时盛岁新的一年，十二载休戚与共，十二载初心不改。身为模联人，为天地立心，为生民立命，为往圣继绝学，为万世开太平。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2021年7月中旬</li>
                      <li>举办地点：深圳中学新校区</li>
                      <li>会议语言：中文/英文</li>
                      <li>主办方：深圳中学模拟联合国协会</li>
                    </ul>
                  </div>
                </div>

                {/* 右侧图片展示 - 自动轮播 */}
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[currentImageIndex]}
                        alt={`PPRDMUN 2021 Photo ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
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
              year={2021}
              title="PPRDMUN 2021 邀请函"
              description="时盛岁新，十二载休戚与共，十二载初心不改"
              href="/pprdmun/2021/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 2021 世界卫生组织新冠疫苗协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2021 世界卫生组织新冠疫苗协调机制（2021 World Health Organization Coordination Mechanism for Coronavirus disease vaccine）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 世界卫生组织第七十三届世界卫生大会(WHA73)</li>
                      <li>• 世界卫生组织第一百四十八届执行委员会特别会议(EB148)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2021年世界卫生组织新冠疫苗协调机制，自贰零年初始，新冠疫情爆发，模联活动受阻无穷，面对未知前路，泛珠模联人披荆斩棘，迎难而上。病毒以惊人的速度散布全球，带来死亡与恐惧，而被视为"唯一也是最好的解决方案"的新冠疫苗，能否如人们所愿带去健康和安宁？
                    </p>
                  </div>
                </div>
              </div>

              {/* 2013 叙利亚化学武器危机安理会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2013 叙利亚化学武器危机安理会（2013 Security Council on Syria's Chemical Weapons Crisis）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 联合国安全理事会</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2013年叙利亚化学武器危机安理会，在国际局势表面的和平之下暗潮涌动，化学武器危机的爆发到底是刺伤了人们，还是揭开了被掩盖的最后一道伤疤？
                    </p>
                  </div>
                </div>
              </div>

              {/* 1678 奈梅亨和会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1678 奈梅亨和会（1678 Nijmegen Peace Conference）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 奈梅亨和会</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1678年奈梅亨和会，再回望过去，落眼于中世纪的欧洲。太阳王的光辉普照，无限荣光下，战争和动荡却也洒遍每一个角落。国家与国家在棋盘之上纵横博弈，谁将最终为此付出鲜血？
                    </p>
                  </div>
                </div>
              </div>

              {/* 2021 United Nations Climate Change Conference */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2021 United Nations Climate Change Conference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 联合国气候变化大会</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2021年联合国气候变化大会，随着人类社会的发展，环境保护成为不可回避的时代课题，各自怀揣利益的人们，如何在重重纠葛之中寻求人与自然的破局之法？
                    </p>
                  </div>
                </div>
              </div>

              {/* 1555 Augsburg Imperial Diet */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1555 Augsburg Imperial Diet</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 奥格斯堡帝国议会</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1555年奥格斯堡帝国议会，站在历史的彼岸，我们求索着每一个事实背后新的可能。
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
