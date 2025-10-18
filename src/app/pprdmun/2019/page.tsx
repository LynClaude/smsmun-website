'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2019Page() {
  const { messages } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 2019年的照片数组 - 使用PPRD2019文件夹中的所有图片
  const images = [
    '/PPRD2019/20191.jpeg',
    '/PPRD2019/20192.jpeg',
    '/PPRD2019/20193.jpeg',
    '/PPRD2019/20194.jpeg',
    '/PPRD2019/20195.jpeg',
    '/PPRD2019/20196.jpeg',
    '/PPRD2019/20197.jpeg',
    '/PPRD2019/20198.jpeg',
    '/PPRD2019/20199.jpeg'
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
              alt="PPRDMUN 2019 Background"
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
                    PPRDMUN 2019
                  </h1>
                  <p 
                    className="text-lg md:text-xl leading-relaxed opacity-90"
                    style={{
                      fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
                    }}
                  >
                    二零一九年是意义非凡的一年，深中模联恰历十五春秋，泛珠模联也将迎来它的十度绽放。作为模联人，我们始终怀着希望，这希望源于我们独立的精神、自由的激情。
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">大会信息</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>举办时间：2019年7月24日-27日</li>
                      <li>举办地点：深圳中学</li>
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
                        alt={`PPRDMUN 2019 Photo ${currentImageIndex + 1}`}
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
              year={2019}
              title="PPRDMUN 2019 邀请函"
              description="深中模联十五载，泛珠模联十周岁生日"
              href="/pprdmun/2019/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 1930 魏玛共和国复辟危机局势系统 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1930 魏玛共和国复辟危机局势系统（1930 Weimar Republic Restoration Crisis Situation System）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 德国内阁会议 German Cabinet Meeting</li>
                      <li>• 德国国会 Reichtag</li>
                      <li>• 凡尔赛和约缔约国会议 Conference of the Parties of the Treaty of Versailles</li>
                      <li>• 主新闻中心 Main Press Center</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1930年魏玛共和国复辟危机局势系统，回望一战后的经济大萧条，战后重建的国际体系见证了魏玛共和国民主体系的崩溃，当纳粹党异军突起时，推动王朝复辟是解决党派斗争的权宜之计。
                    </p>
                  </div>
                </div>
              </div>

              {/* 英国脱欧谈判协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">英国脱欧谈判协调机制（Brexit Negotiations Coordination Mechanism）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 英国议会下议院·HoC</li>
                      <li>• 欧盟二十七国峰会EU27</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      英国脱欧谈判协调机制，当今世界政治时局，风云诡谲，阴晴多变，在英国脱离欧盟的重重迷雾中，我们着眼于均势与协调，当乌合之众的民主打翻谈判棋牌时，未来又该如何建构？
                    </p>
                  </div>
                </div>
              </div>

              {/* 1959 南极峰会 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1959 南极峰会（1959 Summit of Antarctica）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1959 Summit of Antarctica</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      1959年南极峰会，无论是登上南极这片神秘之地，还是梦回欧洲与拿破仑斗争，伫立历史的彼端，我们致以最虔诚的凝视。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1991 Parliament of the Socialist Republic of Bosnia and Herzegovina in Sarajevo */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1991 Parliament of the Socialist Republic of Bosnia and Herzegovina in Sarajevo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1991 Parliament of the Socialist Republic of Bosnia and Herzegovina in Sarajevo</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      1991年波斯尼亚和黑塞哥维那社会主义共和国议会，我们还将重返二十世纪九十年代，见证南斯拉夫的瓦解，目睹民族与人道主义危机并存。
                    </p>
                  </div>
                </div>
              </div>

              {/* 1814 Congress of Vienna */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1814 Congress of Vienna</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Committee Setting</h4>
                    <p className="text-gray-600">1814 Congress of Vienna</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Topic Background</h4>
                    <p className="text-gray-600">
                      1814年维也纳会议，梦回欧洲与拿破仑斗争的历史时刻，重回帝国扩张时代，演绎欧罗巴均势的此消彼长。
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
