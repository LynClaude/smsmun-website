'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface LeadershipCardProps {
  position: string
  name: string
  contact: string
}

export default function LeadershipCard({ position, name, contact }: LeadershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* 照片区域 */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src="/placeholder.jpg"
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* 信息区域 */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{position}</h3>
        <p className="text-lg text-gray-700 mb-4">{name}</p>
        <p className="text-sm text-gray-500">{contact}</p>
      </div>
    </motion.div>
  )
} 