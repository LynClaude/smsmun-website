'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n-context'

export default function Hero() {
  const { messages } = useI18n()
  const [currentImage, setCurrentImage] = useState(0)
  const [showArrow, setShowArrow] = useState(true)
  const images = ['/123.jpg', '/456.jpg']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowArrow(scrollPosition < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative h-screen">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/IMG_1832.jpg"
          alt="Background"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full px-4">
          {/* 左侧图片展示 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[500px] mx-auto aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
          >
            {images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImage ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={`Slideshow ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            ))}
          </motion.div>

          {/* 右侧文字内容 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ 
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: '700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <span className="block mb-2">{messages.hero.title_line1}</span>
              <span className="block">{messages.hero.title_line2}</span>
            </h1>
            <p 
              className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90"
              style={{
                fontFamily: "'Noto Serif SC', serif"
              }}
            >
              {messages.hero.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 向下滚动指引按钮 */}
      <motion.button 
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showArrow ? 1 : 0, y: showArrow ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </motion.button>
    </div>
  )
} 