'use client'

import Image from 'next/image'

export default function AboutHero() {
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
            className="text-5xl md:text-7xl font-bold"
            style={{ 
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            关于我们
          </h1>
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
            }}
          >
            深中模联，为更美好之世界而联合
          </p>
        </div>
      </div>
    </div>
  )
} 