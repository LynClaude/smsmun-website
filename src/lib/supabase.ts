import { createClient } from '@supabase/supabase-js'

// 从环境变量获取Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 验证环境变量
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase环境变量未设置:', { 
    hasUrl: !!supabaseUrl, 
    hasKey: !!supabaseKey 
  })
  throw new Error('Supabase环境变量未正确设置')
}

console.log('Supabase配置已加载:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseKey,
  keyPrefix: supabaseKey?.substring(0, 20) + '...'
})

export const supabase = createClient(supabaseUrl, supabaseKey)

// 数据库表结构
export interface User {
  id: string
  username: string
  email: string
  is_alumni: boolean
  graduation_year?: string
  is_admin: boolean
  join_date: string
  created_at: string
}

export interface Message {
  id: string
  author: string
  content: string
  contact: string
  timestamp: string
  created_at: string
}

export interface Question {
  id: string
  question: string
  answers: Answer[]
  author: string
  timestamp: string
  created_at: string
}

export interface Answer {
  id: string
  answer: string
  author: string
  timestamp: string
  created_at: string
}

export interface HonorAdvisor {
  id: string
  name: string
  email: string
  phone: string
  graduation_year: string
  message: string
  timestamp: string
  created_at: string
}
