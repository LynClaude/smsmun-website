'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n-context'

export default function PPRDYearSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages } = useI18n()
  
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i) // 2015-2025

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/pprdmun"
        className="text-xs xl:text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
      >
        {messages.nav.pprdmun}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      
      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="max-h-80 overflow-y-auto">
            {years.map((year) => (
              <Link
                key={year}
                href={year === 2025 ? '/pprdmun' : `/pprdmun/${year}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
              >
                PPRDMUN {year}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
