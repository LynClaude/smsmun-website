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
  about: {
    title: string
    subtitle: string
    intro_title: string
    intro_content: string
  }
  pprdmun: {
    title: string
    description: string
    conference_info: string
    committees: string
    related_docs: string
  }
  alumni: {
    title: string
    secretariat: string
    advisors: string
    leadership_members: string
  }
  departments: {
    title: string
    academic: {
      name: string
      description: string
    }
    administrative: {
      name: string
      description: string
    }
    pr: {
      name: string
      description: string
    }
    tech: {
      name: string
      description: string
    }
  }
  history: {
    title: string
    event1_year: string
    event1_title: string
    event1_desc: string
    event2_year: string
    event2_title: string
    event2_desc: string
    event3_year: string
    event3_title: string
    event3_desc: string
    event4_year: string
    event4_title: string
    event4_desc: string
    event5_year: string
    event5_title: string
    event5_desc: string
    event6_year: string
    event6_title: string
    event6_desc: string
  }
  common: {
    dept_intro: string
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