'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const images = ['/123.jpg', '/456.jpg']

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImage((prev) => (prev === 0 ? 1 : 0))
        setIsTransitioning(false)
      }, 500) // 500ms后切换图片
    }, 5000) // 每5秒切换一次

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen">
      {/* 背景图片 */}
      <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={images[currentImage]}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* 深蓝色蒙版 */}
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* 欢迎文字 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4" style={{ fontFamily: "'KaiTi', '楷体', serif" }}>
          深圳中学模拟联合国协会欢迎您
        </h1>
      </div>
    </div>
  )
} 