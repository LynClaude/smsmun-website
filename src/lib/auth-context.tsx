'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { supabase } from './supabase'

// 用户类型定义
interface User {
  id: string
  username: string
  email: string
  is_alumni: boolean
  graduation_year?: string
  is_admin: boolean
  join_date: string
}

// 认证上下文类型
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string) => Promise<boolean>
  logout: () => Promise<void>
  adminLogin: (username: string, password: string) => Promise<boolean>
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 认证提供者组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的用户数据（用于向后兼容）
    const checkLocalStorage = () => {
      try {
        const localUser = localStorage.getItem('smsmun_user')
        if (localUser) {
          const parsedUser = JSON.parse(localUser)
          // 转换字段名以匹配新的类型定义
          setUser({
            id: parsedUser.id || 'local',
            username: parsedUser.username,
            email: parsedUser.email,
            is_alumni: parsedUser.isAlumni || false,
            graduation_year: parsedUser.graduationYear,
            is_admin: parsedUser.isAdmin || false,
            join_date: parsedUser.joinDate || new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error('Error checking localStorage:', error)
      }
      setIsLoading(false)
    }

    checkLocalStorage()
  }, [])

  // 登录函数
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 从 users 表中查找用户
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error) {
        console.error('Login error:', error.message)
        return false
      }

      if (data) {
        const userData = {
          id: data.id,
          username: data.username,
          email: data.email,
          is_alumni: data.is_alumni,
          graduation_year: data.graduation_year,
          is_admin: data.is_admin,
          join_date: data.join_date,
        }

        setUser(userData)
        localStorage.setItem('smsmun_user', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // 注册函数
  const register = async (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string): Promise<boolean> => {
    try {
      // 直接插入到 users 表中（简化版本）
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            username,
            email,
            password: password, // 注意：在生产环境中不应该存储明文密码
            is_alumni: isAlumni,
            graduation_year: graduationYear,
            is_admin: false,
          }
        ])
        .select()

      if (error) {
        console.error('Error inserting user:', error.message)
        return false
      }

      if (data && data.length > 0) {
        console.log('User registered successfully:', data[0])
        return true
      }
      return false
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  // 登出函数
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Supabase logout error:', error.message)
      }
      setUser(null)
      localStorage.removeItem('smsmun_user')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // 管理员登录函数
  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      if (username === 'admin' && password === 'smsmun2025') {
        const adminUser: User = {
          id: 'admin',
          username: '管理员',
          email: 'admin@smsmun.com',
          is_alumni: true,
          is_admin: true,
          join_date: new Date().toISOString(),
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

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

// 使用认证上下文的钩子
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}