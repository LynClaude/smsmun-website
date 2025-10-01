'use client'

import { useState, useRef, useEffect } from 'react'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n-context'

export const languages = [
  { code: 'zh' as const, name: '中文', nativeName: '中文' },
  { code: 'en' as const, name: 'English', nativeName: 'English' },
  { code: 'fr' as const, name: 'French', nativeName: 'Français' },
  { code: 'es' as const, name: 'Spanish', nativeName: 'Español' },
  { code: 'ru' as const, name: 'Russian', nativeName: 'Русский' },
  { code: 'ar' as const, name: 'Arabic', nativeName: 'العربية' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, setLocale, messages } = useI18n()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(l => l.code === locale) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (language: typeof languages[0]) => {
    setLocale(language.code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={messages.nav.select_language}
      >
        <FiGlobe className="w-5 h-5 text-gray-700" />
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {currentLanguage.nativeName}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{language.nativeName}</span>
                {locale === language.code && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-500">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 