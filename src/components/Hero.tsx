'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ['/123.jpg', '/456.jpg']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000) // 每5秒切换一次

    return () => clearInterval(timer)
  }, [])

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
        {/* 深蓝色蒙版 */}
        <div className="absolute inset-0 bg-primary/30" />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full px-4">
          {/* 左侧图片展示 */}
          <div className="relative w-full max-w-[500px] mx-auto aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            {images.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* 右侧文字内容 */}
          <div className="text-white space-y-8 md:pl-8">
            <h1 
              className="text-5xl md:text-7xl font-bold text-right" 
              style={{ 
                fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                fontWeight: '700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              深圳中学模拟联合国协会欢迎您
            </h1>
            <p 
              className="text-sm md:text-base text-right leading-relaxed max-w-[600px] ml-auto opacity-90"
              style={{
                fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif"
              }}
            >
              作为深圳中学最具影响力的学生组织之一，我们致力于培养具有国际视野、卓越领导力和深厚人文素养的青年人才。通过模拟联合国会议、国际交流等活动，为学生提供探索国际事务、锻炼外交能力的专业平台。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 