'use client'

import { useState, useRef, useEffect } from 'react'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'

export const languages = [
  { code: 'zh', name: '中文', nativeName: '中文' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 从localStorage读取保存的语言
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

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
    setCurrentLanguage(language)
    localStorage.setItem('language', language.code)
    setIsOpen(false)
    // 这里可以添加实际的语言切换逻辑
    console.log('Language changed to:', language.code)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="选择语言"
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
                currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{language.nativeName}</span>
                {currentLanguage.code === language.code && (
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