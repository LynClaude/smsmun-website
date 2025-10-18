'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n-context'

export default function ActivitiesSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages } = useI18n()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const activities = [
    { name: '습袖峰会', href: '/activities/leadership-summit' },
    { name: '深圳中学校内会', href: '/activities/school-mun' },
    { name: '其他活动', href: '/activities' }
  ]

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100) // 100ms延迟，给用户时间移动到下拉菜单
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/activities"
        className="text-xs xl:text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
      >
        活动与项目
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      
      {/* 下拉菜单 */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-h-80 overflow-y-auto">
            {activities.map((activity) => (
              <Link
                key={activity.name}
                href={activity.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
              >
                {activity.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
