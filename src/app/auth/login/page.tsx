'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAlumni, setIsAlumni] = useState(false)
  const [graduationYear, setGraduationYear] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register, loginWithWechat } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const success = await login(email, password)
    if (success) {
      setSuccess('登录成功！')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      setError('邮箱或密码错误')
    }
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setIsLoading(false)
      return
    }

    const success = await register(username, email, password, isAlumni, isAlumni ? graduationYear : undefined)
    if (success) {
      setSuccess('注册成功！')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      setError('邮箱已存在或注册失败')
    }
    setIsLoading(false)
  }

  const handleWechatLogin = async () => {
    setIsLoading(true)
    setError('')

    const success = await loginWithWechat()
    if (success) {
      setSuccess('微信登录成功！')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      setError('微信登录失败')
    }
    setIsLoading(false)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                {activeTab === 'login' ? '登录' : '注册'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'login' ? '欢迎回到深中模联' : '加入深中模联社区'}
              </p>
            </div>

            {/* 标签切换 */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                注册
              </button>
            </div>


            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请输入邮箱"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    密码
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请输入密码"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '登录中...' : '登录'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请输入用户名"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请输入邮箱"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    密码
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请输入密码"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    确认密码
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="请再次输入密码"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="isAlumni"
                      type="checkbox"
                      checked={isAlumni}
                      onChange={(e) => setIsAlumni(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                      <label htmlFor="isAlumni" className="ml-2 block text-sm text-gray-700">
                        我是（曾是）深中模联成员
                      </label>
                  </div>

                  {isAlumni && (
                    <div>
                      <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                        毕业年份
                      </label>
                      <select
                        id="graduationYear"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      >
                        <option value="">请选择您所在的届别</option>
                        {[
                          '2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021',
                          '2019-2020', '2018-2019', '2017-2018', '2016-2017', '2015-2016',
                          '2014-2015', '2013-2014', '2012-2013', '2011-2012', '2010-2011',
                          '2009-2010', '2008-2009', '2007-2008', '2006-2007', '2005-2006'
                        ].map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '注册中...' : '注册'}
                </button>
              </form>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/admin/login"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                管理员登录 →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
