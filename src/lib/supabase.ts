import { createClient } from '@supabase/supabase-js'

// Supabase配置 - 直接使用项目配置
const supabaseUrl = 'https://xjeqpsicutiwkxjoqvls.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZXFwc2ljdXRpd2t4am9xdmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzNjAsImV4cCI6MjA3NjI5ODM2MH0.h1qlkDGz9twJjKxR8ov8v5Hknm_kASyIhsph-aAIAY4'

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
  password?: string
  is_alumni: boolean
  graduation_year?: string
  is_admin: boolean
  is_honor_advisor?: boolean
  honor_advisor_approved_at?: string
  join_date: string
  created_at: string
}

export interface Message {
  id: string
  user_id: string
  content: string
  created_at: string
}

export interface Question {
  id: string
  user_id: string
  title: string
  content: string
  answers: Answer[]
  created_at: string
}

export interface Answer {
  id: string
  question_id: string
  user_id: string
  content: string
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
