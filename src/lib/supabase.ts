import { createClient } from '@supabase/supabase-js'

// 使用正确的Supabase项目URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xjeqpsicutiwkxjoqvls.supabase.co'
// 注意：这里需要真实的API密钥，请从Supabase Dashboard获取
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_REAL_API_KEY_HERE'

console.log('Supabase配置:', { supabaseUrl, hasKey: !!supabaseKey })

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
