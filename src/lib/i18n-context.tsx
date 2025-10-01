'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'zh' | 'en' | 'fr' | 'es' | 'ru' | 'ar'

interface Messages {
  nav: {
    home: string
    about: string
    alumni_leadership: string
    pprdmun: string
    events: string
    alumni_network: string
    resources: string
    login: string
    open_menu: string
    close_menu: string
    select_language: string
  }
  site: {
    title: string
    description: string
    name_full: string
    name_short: string
  }
  hero: {
    title_line1: string
    title_line2: string
    description: string
  }
  home: {
    latest_news: string
    learn_more: string
    learn_details: string
    news1_title: string
    news1_desc: string
    news2_title: string
    news2_desc: string
    news3_title: string
    news3_desc: string
    news4_title: string
    news4_desc: string
  }
  footer: {
    social_media: string
    szmun_wechat: string
    pprdmun_wechat: string
    about_us: string
    club_intro: string
    contact: string
    join_us: string
    related_links: string
    sms_website: string
  }
}

interface I18nContextType {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh')
  const [messages, setMessages] = useState<Messages | null>(null)

  useEffect(() => {
    // 从localStorage读取保存的语言
    const savedLang = localStorage.getItem('language') as Locale
    if (savedLang && ['zh', 'en', 'fr', 'es', 'ru', 'ar'].includes(savedLang)) {
      setLocaleState(savedLang)
    }
  }, [])

  useEffect(() => {
    // 动态加载翻译文件
    import(`../../messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        // 如果加载失败，使用中文作为后备
        import(`../../messages/zh.json`).then((mod) => setMessages(mod.default))
      })
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('language', newLocale)
  }

  if (!messages) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  }

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
} 