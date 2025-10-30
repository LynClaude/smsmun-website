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
    honor_advisor: string
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
    important_events: string
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
    event1_title: string
    event1_desc: string
    event2_title: string
    event2_desc: string
    event3_title: string
    event3_desc: string
    event4_title: string
    event4_desc: string
    event5_title: string
    event5_desc: string
    event6_title: string
    event6_desc: string
    activities_title: string
    activities_desc: string
    guidance_title: string
    guidance_desc: string
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
  alumni: {
    title: string
    secretariat: string
    advisors: string
    leadership_members: string
    no_data: string
    position: string
    name: string
    contact: string
    positions: {
      association_secretary_general: string
      executive_secretary_general: string
      academic_affairs_deputy: string
      public_relations_deputy: string
      administrative_affairs_deputy: string
      technical_affairs_deputy: string
      academic_affairs_advisor: string
      public_relations_advisor: string
      administrative_affairs_advisor: string
    }
  }
  departments: {
    title: string
    academic: {
      name: string
      description: string
      intro: string
      responsibilities: string
      benefits: string
      requirements: string
      resp1: string
      resp2: string
      resp3: string
      resp4: string
      resp5: string
      benefit1: string
      benefit2: string
      benefit3: string
      benefit4: string
      benefit5: string
      req1: string
      req2: string
      req3: string
      req4: string
    }
    administrative: {
      name: string
      description: string
      intro: string
      work_stages: string
      training_period: string
      training_desc: string
      carnival_prep: string
      carnival_desc: string
      sponsorship: string
      sponsorship_desc: string
      pprd_prep: string
      pprd_desc: string
      benefit1: string
      benefit2: string
      benefit3: string
      benefit4: string
      benefit5: string
      req1: string
      req2: string
      req3: string
      req4: string
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
  pprdmun: {
    return_to: string
    full_name: string
    english_name: string
    invitation_letter: string
    greeting: string
    opening: string
    closing: string
    signature: string
    committee_settings: string
    venue_settings: string
    main_press_center: string
    title: string
    description: string
    select_year: string
    conference_info: string
    time: string
    location: string
    language: string
    organizer: string
    committees: string
    related_docs: string
    welcome_title: string
    welcome_greeting: string
    welcome_opening: string
    welcome_invitation: string
    welcome_2025: string
    welcome_15_years: string
    welcome_concept: string
    welcome_gratitude: string
    welcome_ending: string
    welcome_signature: string
    academic_team_title: string
    academic_team_desc: string
    academic_team_priority: string
    academic_team_wechat: string
    academic_team_contact: string
    academic_team_secretary: string
    academic_team_vice_secretary: string
    download_form: string
    press_center: string
    chinese_press: string
    english_press: string
    chinese_press_desc: string
    english_press_desc: string
    invitation_title: string
    invitation_desc: string
    invitation_letter_2025: string
    invitation_letter_desc: string
    year_descriptions: {
      '2024': string
      '2023': string
      '2022': string
      '2021': string
      '2020': string
    }
  }
  common: {
    dept_intro: string
  }
  alumni_forum: {
    title: string
    subtitle: string
    access_restricted: string
    access_message: string
    return_home: string
    tabs: {
      messages: string
      qa: string
      advisor: string
    }
    messages: {
      title: string
      placeholder: string
      send: string
      send_failed: string
    }
    qa: {
      title: string
      placeholder: string
      ask: string
      ask_failed: string
      answer: string
      answer_placeholder: string
      submit_answer: string
      cancel: string
      answer_failed: string
    }
    honor_advisors: {
      title: string
      subtitle: string
      features: {
        title: string
        consultation: string
        sharing: string
        priority: string
        honor: string
      }
      learn_more: string
      members_count: string
      overview: string
      overview_content: string
      overview_content2: string
      overview_content3: string
      core_features: string
      consultation_guide: string
      consultation_desc: string
      experience_sharing: string
      experience_desc: string
      priority_participation: string
      priority_desc: string
      honor_status: string
      honor_desc: string
      requirements: string
      requirement1: string
      requirement2: string
      requirement3: string
      members: string
      refresh: string
      refreshing: string
      loading: string
      no_members: string
      building: string
      read_charter: string
      apply: string
      email: string
      position: string
      join_time: string
      graduation_year: string
    }
  }
  profile: {
    title: string
    loading: string
    user_info: {
      admin: string
      honor_advisor: string
      alumni: string
      visitor: string
    }
    honor_advisor_badge: {
      title: string
      subtitle: string
      enter_committee: string
      exit_committee: string
      exit_confirm: string
      exit_developing: string
    }
    tabs: {
      my_messages: string
      my_qa: string
      honor: string
      feedback: string
    }
    messages: {
      no_messages: string
    }
    questions: {
      no_questions: string
    }
    honor_advisors: {
      my_applications: string
      no_applications: string
      status: {
        approved: string
        rejected: string
        pending: string
      }
      motivation: string
      experience: string
    }
    feedback: {
      title_alumni: string
      title_visitor: string
      placeholder_alumni: string
      placeholder_visitor: string
      submit: string
      submitting: string
      submit_success: string
      submit_failed: string
      history: string
      no_feedback: string
    }
  }
  admin: {
    login: {
      title: string
      subtitle: string
      username: string
      username_placeholder: string
      password: string
      password_placeholder: string
      login: string
      logging: string
      error: string
      return_home: string
    }
    dashboard: {
      title: string
      tabs: {
        users: string
        messages: string
        qa: string
        advisors: string
      }
      delete_confirm: string
      delete_success: string
      delete_failed: string
      delete_question_confirm: string
      delete_question_success: string
      delete_question_failed: string
    }
  }
  activities: {
    menu: {
      leadership_summit: string
      school_conference: string
      carnival: string
    }
    school_conference: {
      title: string
      subtitle: string
      yearly_conferences: string
      conference_info: string
      view_wechat: string
    }
    leadership_summit: {
      title: string
      title_short: string
      subtitle: string
      select_year: string
      overview: string
      overview_content: string
      details: {
        time: string
        location: string
        theme: string
      }
    }
    carnival: {
      title: string
      subtitle: string
      description: string
    }
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