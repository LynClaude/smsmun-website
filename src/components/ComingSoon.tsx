'use client'

import { motion } from 'framer-motion'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#1a237e] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          敬请期待
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          该页面正在建设中，即将与您相见
        </p>
      </motion.div>
    </div>
  )
} 