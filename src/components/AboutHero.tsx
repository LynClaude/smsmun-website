'use client'

import Image from 'next/image'
import { useI18n } from '@/lib/i18n-context'

export default function AboutHero() {
  const { messages } = useI18n()
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/深中模联活动照.pic(1).jpg"
          alt="About Us Background"
          fill
          className="object-cover brightness-75"
          priority
        />
        {/* 深色蒙版 */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto h-full flex items-center justify-center">
        <div className="text-center text-white space-y-8 px-4">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            style={{ 
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {messages.about.title}
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
            }}
          >
            {messages.about.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
} 