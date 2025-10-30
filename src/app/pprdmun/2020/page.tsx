'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2020Page() {
  const { messages } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 2020年的照片数组 - 使用PPRD2020文件夹中的所有图片
  const images = [
    '/PPRD2020/20201.jpeg',
    '/PPRD2020/20202.jpeg',
    '/PPRD2020/20203.jpeg',
    '/PPRD2020/20204.jpeg',
    '/PPRD2020/20205.jpeg',
    '/PPRD2020/20206.jpeg',
    '/PPRD2020/20207.jpeg',
    '/PPRD2020/20208.jpeg',
    '/PPRD2020/20209.jpeg'
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
              alt="PPRDMUN 2020 Background"
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
                    PPRDMUN 2020
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    贰零贰零是不平凡的一年，深中模联已走过十六载光阴。在泛珠模联人不懈的坚守中、在泛珠模联人崇高的追求中，信念的微光积累成岁月的光束，映出往日斑驳的波澜。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{messages.pprdmun.conference_info}</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>{messages.pprdmun.time.replace('2025', '2020').replace('7月中旬', '7月24日-27日')}</li>
                      <li>{messages.pprdmun.location.replace('深圳中学泥岗校区', '线上会议')}</li>
                      <li>{messages.pprdmun.language}</li>
                      <li>{messages.pprdmun.organizer}</li>
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
                        alt={`PPRDMUN 2020 Photo ${currentImageIndex + 1}`}
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
              year={2020}
              title="PPRDMUN 2020 邀请函"
              description="线上会议元年，泛珠模联十一载"
              href="/pprdmun/2020/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 2020 欧盟疫情危机协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2020 欧盟疫情危机协调机制（2020 European Union Coronavirus Pandemic Crisis Coordination Mechanism）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 欧盟二十七国首脑会议 EU Summit(EU27)</li>
                      <li>• 欧盟外长级理事会会议 EU Foreign Affairs Council(FAC)</li>
                      <li>• 主新闻中心 Main Press Center</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2020年欧盟疫情危机协调机制，数月以来，全球疫情日益严峻，欧盟内部合作危机逐渐加剧。在疫情的梦魇笼罩在欧洲上方，在国家的利益与"欧洲统一"理念的矛盾中，如何能拨开迷雾，使欧罗巴大陆往日的生机重现？
                    </p>
                  </div>
                </div>
              </div>

              {/* 1999 Negotiation Conference of Five Caspian countries */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1999 Negotiation Conference of Five Caspian countries(CoCs5)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1999 Negotiation Conference of Five Caspian countries(CoCs5)</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      拨动时光的指针，回到20世纪未被窥探已久的里海，波光粼粼、浮光跃金，其中隐藏着令人迷醉的财富，也暗藏着打破土地的平静的危机。站在历史的高点，我们凝视着每一个事实背后的可能。
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
