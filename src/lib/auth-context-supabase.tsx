'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, User, Message, Question, HonorAdvisor } from './supabase'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string) => Promise<boolean>
  logout: () => void
  adminLogin: (username: string, password: string) => Promise<boolean>
  // 数据管理函数
  getUsers: () => Promise<User[]>
  getMessages: () => Promise<Message[]>
  getQuestions: () => Promise<Question[]>
  getHonorAdvisors: () => Promise<HonorAdvisor[]>
  sendMessage: (message: Omit<Message, 'id' | 'created_at'>) => Promise<boolean>
  askQuestion: (question: Omit<Question, 'id' | 'created_at'>) => Promise<boolean>
  answerQuestion: (questionId: string, answer: Omit<Answer, 'id' | 'created_at'>) => Promise<boolean>
  submitHonorAdvisor: (advisor: Omit<HonorAdvisor, 'id' | 'created_at'>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的用户会话
    const savedUser = localStorage.getItem('smsmun_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 从数据库查询用户
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password) // 注意：生产环境应该使用哈希密码

      if (error || !users || users.length === 0) {
        return false
      }

      const userData = users[0]
      delete (userData as any).password // 移除密码
      setUser(userData)
      localStorage.setItem('smsmun_user', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string): Promise<boolean> => {
    try {
      // 检查邮箱是否已存在
      const { data: existingUsers } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)

      if (existingUsers && existingUsers.length > 0) {
        return false
      }

      const newUser = {
        username,
        email,
        password, // 注意：生产环境应该哈希密码
        is_alumni: isAlumni,
        graduation_year: graduationYear,
        is_admin: false,
        join_date: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()

      if (error || !data) {
        return false
      }

      const userData = data[0]
      delete (userData as any).password
      setUser(userData)
      localStorage.setItem('smsmun_user', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // 管理员账号验证
      if (username === 'admin' && password === 'smsmun2025') {
        const adminUser: User = {
          id: 'admin',
          username: '管理员',
          email: 'admin@smsmun.com',
          is_alumni: true,
          graduation_year: 'N/A',
          is_admin: true,
          join_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        setUser(adminUser)
        localStorage.setItem('smsmun_user', JSON.stringify(adminUser))
        return true
      }
      return false
    } catch (error) {
      console.error('Admin login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('smsmun_user')
  }

  // 数据管理函数
  const getUsers = async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .neq('is_admin', true) // 排除管理员账号

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  const getMessages = async (): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching messages:', error)
      return []
    }
  }

  const getQuestions = async (): Promise<Question[]> => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching questions:', error)
      return []
    }
  }

  const getHonorAdvisors = async (): Promise<HonorAdvisor[]> => {
    try {
      const { data, error } = await supabase
        .from('honor_advisors')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching honor advisors:', error)
      return []
    }
  }

  const affinity = async (message: Omit<Message, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert([message])

      return !error
    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }

  const askQuestion = async (question: Omit<Question, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('questions')
        .insert([question])

      return !error
    } catch (error) {
      console.error('Error asking question:', error)
      return false
    }
  }

  const answerQuestion = async (questionId: string, answer: Omit<Answer, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      // 这里需要根据您的数据库结构来实现
      // 可能需要更新 questions 表中的 answers 字段
      const { error } = await supabase
        .from('answers')
        .insert([{ ...answer, question_id: questionId }])

      return !error
    } catch (error) {
      console.error('Error answering question:', error)
      return false
    }
  }

  const submitHonorAdvisor = async (advisor: Omit<HonorAdvisor, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('honor_advisors')
        .insert([advisor])

      return !error
    } catch (error) {
      console.error('Error submitting honor advisor:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      adminLogin,
      getUsers,
      getMessages,
      getQuestions,
      getHonorAdvisors,
      sendMessage,
      askQuestion,
      answerQuestion,
      submitHonorAdvisor
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
