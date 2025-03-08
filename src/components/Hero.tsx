'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 深蓝色蒙版 */}
      <div className="absolute inset-0 bg-primary/30" />

      {/* 欢迎文字 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 
          className="text-5xl md:text-7xl text-white text-center px-4 tracking-wider" 
          style={{ 
            fontFamily: "'STKaiti', 'KaiTi', '楷体', serif",
            fontWeight: '500',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          深圳中学模拟联合国协会欢迎您
        </h1>
      </div>
    </div>
  )
} 