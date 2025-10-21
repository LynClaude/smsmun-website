import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xjeqpsicutiwkxjoqvls.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZXFwc2ljdXRpd2t4am9xdmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjM0MDAsImV4cCI6MjA0NzY5OTQwMH0.example'

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
