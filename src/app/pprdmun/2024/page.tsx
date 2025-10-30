'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PageTransition from '@/components/PageTransition'
import InvitationLetter from '@/components/InvitationLetter'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDMUN2024Page() {
  const { messages } = useI18n()
  
  // 图片轮播状态
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    '/PPRD2024/20241.jpg',
    '/PPRD2024/20242.jpg',
    '/PPRD2024/20243.jpg',
    '/PPRD2024/20244.jpg'
  ]

  // 自动轮播效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // 每4秒切换一次

    return () => clearInterval(timer)
  }, [images.length])

  // 手动切换图片
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
  }

  // 下一张图片
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // 上一张图片
  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  
  return (
    <PageTransition>
      <div>
        {/* 第一页 */}
        <div className="relative">
          {/* 背景图片 */}
          <div className="relative h-screen">
            <Image
              src="/pprd-common-bg.webp"
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
                    <h2 className="text-2xl font-bold">{messages.pprdmun.conference_info}</h2>
                    <ul className="list-disc list-inside space-y-2 opacity-90">
                      <li>{messages.pprdmun.time.replace('2025', '2024')}</li>
                      <li>{messages.pprdmun.location}</li>
                      <li>{messages.pprdmun.language}</li>
                      <li>{messages.pprdmun.organizer}</li>
                    </ul>
                  </div>
                </div>

                {/* 右侧图片轮播 */}
                <div className="relative w-full mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                  {/* 轮播图片 */}
                  <div className="relative w-full h-full">
                    {images.map((image, index) => (
                      <motion.div
                        key={index}
                        className={`absolute inset-0 ${index === currentImageIndex ? 'z-10' : 'z-0'}`}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: index === currentImageIndex ? 1 : 0,
                          scale: index === currentImageIndex ? 1 : 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={image}
                          alt={`PPRDMUN 2024 活动照片 ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* 导航按钮 */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/75'
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
              year={2024}
              title="PPRDMUN 2024 邀请函"
              description="万象更新，满庭芳华，十五载泛珠模联再聚风冠凰羽之下"
              href="/pprdmun/2024/letter"
            />
          </div>
        </div>

        {/* 委员会设置 */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center text-primary">委员会设置</h2>
              
              {/* 1923 鲁尔危机协调机制 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">1923 鲁尔危机协调机制（1923 Coordination Mechanism for the Ruhr Crisis）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 1923 鲁尔危机协调机制就德国赔款问题多边会谈</li>
                      <li>• 1923鲁尔危机协调机制法国内阁</li>
                      <li>• 主新闻中心</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      1923年鲁尔危机协调机制，回溯二十世纪二十年代第一次世界大战所留余震之阴影仍笼罩着欧罗巴大陆，我们重新审视鲁尔危机的迸发，其底蕴究竟是法德国家利益的交锋，亦或是民族情怀与国际格局的错综交织。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2017 United Nations High Commissioner for Refugees */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
                <h3 className="text-3xl font-bold text-primary">2017 United Nations High Commissioner for Refugees（UNHCR）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">会场设置</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• United Nations High Commissioner for Refugees</li>
                      <li>• Main Press Center</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold">议题背景</h4>
                    <p className="text-gray-600">
                      2017年联合国难民事务高级专员办事处，我们纵观上世纪末延续至今的罗兴亚难民危机，其漫长的苦难岁月仿佛波澜不惊的历史长河中的一抹浓墨。在这场悲剧中，我们不禁要问：严格的边境控制和难民政策，到底是维护国家安全还是加剧了人道主义危机？
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
