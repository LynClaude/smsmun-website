'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ['/123.jpg', '/456.jpg']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 10000) // 每10秒切换一次

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen">
      {/* 背景图片 */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
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
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
          深圳中学模拟联合国协会欢迎您
        </h1>
      </div>
    </div>
  )
} 