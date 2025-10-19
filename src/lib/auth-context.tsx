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
  is_honor_advisor?: boolean
  honor_advisor_approved_at?: string
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
    // 检查本地存储的用户数据
    const checkLocalStorage = async () => {
      try {
        const localUser = localStorage.getItem('smsmun_user')
        if (localUser) {
          const parsedUser = JSON.parse(localUser)
          console.log('Loading user from localStorage:', parsedUser)
          
          // 确保字段名正确匹配
          const userData = {
            id: parsedUser.id || 'local',
            username: parsedUser.username,
            email: parsedUser.email,
            is_alumni: parsedUser.is_alumni !== undefined ? parsedUser.is_alumni : (parsedUser.isAlumni || false),
            graduation_year: parsedUser.graduation_year || parsedUser.graduationYear,
            is_admin: parsedUser.is_admin !== undefined ? parsedUser.is_admin : (parsedUser.isAdmin || false),
            join_date: parsedUser.join_date || parsedUser.joinDate || new Date().toISOString(),
            is_honor_advisor: parsedUser.is_honor_advisor || false,
            honor_advisor_approved_at: parsedUser.honor_advisor_approved_at,
          }
          
          // 如果不是本地用户，尝试同步荣誉顾问状态
          if (userData.id !== 'local') {
            const statusUpdated = await syncHonorAdvisorStatus(userData.id)
            if (statusUpdated) {
              // 如果状态已更新，重新获取用户数据
              const { data: updatedData, error: updateError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userData.id)
                .single()

              if (!updateError && updatedData) {
                const updatedUserData = {
                  ...userData,
                  is_honor_advisor: updatedData.is_honor_advisor || false,
                  honor_advisor_approved_at: updatedData.honor_advisor_approved_at,
                }
                setUser(updatedUserData)
                localStorage.setItem('smsmun_user', JSON.stringify(updatedUserData))
                console.log('User status updated:', updatedUserData)
                return
              }
            }
          }
          
          setUser(userData)
          console.log('User state set:', userData)
        } else {
          console.log('No user found in localStorage')
        }
      } catch (error) {
        console.error('Error checking localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkLocalStorage()
  }, [])

  // 自动同步用户荣誉顾问状态
  const syncHonorAdvisorStatus = async (userId: string) => {
    try {
      // 检查是否有批准的荣誉顾问申请
      const { data: honorData, error: honorError } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'approved')

      if (honorError) {
        console.error('检查荣誉顾问状态失败:', honorError)
        return false
      }

      // 如果用户有批准的申请但状态不是荣誉顾问，则更新状态
      if (honorData && honorData.length > 0) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ 
            is_honor_advisor: true,
            honor_advisor_approved_at: new Date().toISOString()
          })
          .eq('id', userId)

        if (updateError) {
          console.error('更新荣誉顾问状态失败:', updateError)
          return false
        }

        console.log('荣誉顾问状态已同步')
        return true
      }

      return false
    } catch (error) {
      console.error('同步荣誉顾问状态时出错:', error)
      return false
    }
  }

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
        // 自动同步荣誉顾问状态
        await syncHonorAdvisorStatus(data.id)

        // 重新获取用户数据以确保状态是最新的
        const { data: updatedData, error: updateError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.id)
          .single()

        const finalData = updateError ? data : updatedData

        const userData = {
          id: finalData.id,
          username: finalData.username,
          email: finalData.email,
          is_alumni: finalData.is_alumni,
          graduation_year: finalData.graduation_year,
          is_admin: finalData.is_admin,
          join_date: finalData.join_date,
          is_honor_advisor: finalData.is_honor_advisor || false,
          honor_advisor_approved_at: finalData.honor_advisor_approved_at,
        }

        console.log('Login successful, saving user data:', userData)
        setUser(userData)
        localStorage.setItem('smsmun_user', JSON.stringify(userData))
        console.log('User data saved to localStorage')
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
      console.log('Logging out user')
      setUser(null)
      localStorage.removeItem('smsmun_user')
      console.log('User logged out and localStorage cleared')
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