'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  username: string
  email?: string
  isAlumni: boolean
  graduationYear?: string
  isAdmin: boolean
  joinDate: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithWechat: () => Promise<boolean>
  register: (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string) => Promise<boolean>
  logout: () => void
  adminLogin: (username: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的用户信息
    const savedUser = localStorage.getItem('smsmun_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 从共享存储中查找用户
      const users = JSON.parse(localStorage.getItem('smsmun_shared_users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userData = { ...foundUser }
        delete userData.password // 不保存密码到状态中
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

  const loginWithWechat = async (): Promise<boolean> => {
    try {
      // 模拟微信登录
      const mockUser: User = {
        id: 'wechat_' + Date.now(),
        username: '微信用户',
        isAlumni: false,
        isAdmin: false,
        joinDate: new Date().toISOString()
      }
      setUser(mockUser)
      localStorage.setItem('smsmun_user', JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error('WeChat login error:', error)
      return false
    }
  }

  const register = async (username: string, email: string, password: string, isAlumni: boolean, graduationYear?: string): Promise<boolean> => {
    try {
      // 使用共享的存储键，这样所有用户都能看到所有注册用户
      const users = JSON.parse(localStorage.getItem('smsmun_shared_users') || '[]')
      
      // 检查邮箱是否已存在
      if (users.find((u: any) => u.email === email)) {
        return false
      }

      const newUser: User = {
        id: 'user_' + Date.now(),
        username,
        email,
        isAlumni,
        graduationYear,
        isAdmin: false,
        joinDate: new Date().toISOString()
      }

      users.push({ ...newUser, password })
      localStorage.setItem('smsmun_shared_users', JSON.stringify(users))
      
      setUser(newUser)
      localStorage.setItem('smsmun_user', JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // 管理员账号验证
      const adminCredentials = {
        username: 'admin',
        password: 'smsmun2025'
      }

      if (username === adminCredentials.username && password === adminCredentials.password) {
        const adminUser: User = {
          id: 'admin',
          username: '管理员',
          isAlumni: true,
          isAdmin: true,
          joinDate: new Date().toISOString()
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

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithWechat,
      register,
      logout,
      adminLogin
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
