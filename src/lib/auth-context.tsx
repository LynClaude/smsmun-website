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
      // 先尝试从本地存储查找用户
      const users = JSON.parse(localStorage.getItem('smsmun_shared_users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userData = {
          id: foundUser.id || 'local',
          username: foundUser.username,
          email: foundUser.email,
          is_alumni: foundUser.isAlumni || false,
          graduation_year: foundUser.graduationYear,
          is_admin: foundUser.isAdmin || false,
          join_date: foundUser.joinDate || new Date().toISOString(),
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
      const users = JSON.parse(localStorage.getItem('smsmun_shared_users') || '[]')
      
      // 检查邮箱是否已存在
      const existingUser = users.find((u: any) => u.email === email)
      if (existingUser) {
        return false
      }

      // 创建新用户
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        isAlumni,
        graduationYear,
        isAdmin: false,
        joinDate: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem('smsmun_shared_users', JSON.stringify(users))
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  // 登出函数
  const logout = async () => {
    try {
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