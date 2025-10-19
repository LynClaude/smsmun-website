'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
  const [showVerification, setShowVerification] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending')

  const { login, register } = useAuth()
  const router = useRouter()

  // 验证邮箱是否为smsmun开头
  const isSMSMUNEmail = (email: string) => {
    return email.toLowerCase().startsWith('smsmun')
  }

  // 验证学号格式（深圳中学学号为20XX年+7位数字，共11位）
  const isValidStudentId = (id: string) => {
    return /^20\d{2}\d{7}$/.test(id)
  }

  // 处理成员验证
  const handleMemberVerification = () => {
    if (isSMSMUNEmail(email)) {
      setVerificationStatus('verified')
      setShowVerification(true)
    } else {
      setShowVerification(true)
      setVerificationStatus('pending')
    }
  }

  // 验证学号
  const handleStudentIdVerification = () => {
    if (isValidStudentId(studentId)) {
      setVerificationStatus('verified')
    } else {
      setVerificationStatus('failed')
      setError('学号格式不正确，请输入深圳中学学号（格式：20XX年+7位数字）')
    }
  }

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

    // 如果是成员但验证未通过，不允许注册
    if (isAlumni && verificationStatus !== 'verified') {
      setError('请完成身份验证后再注册')
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
                  {isAlumni && (
                    <p className="text-xs text-gray-500 mt-1">
                      深中模联成员身份验证：请使用smsmun开头邮箱进行验证，如无此邮箱，请提供深圳中学学号（格式：20XX年+7位数字）。
                    </p>
                  )}
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
                      onChange={(e) => {
                        setIsAlumni(e.target.checked)
                        if (e.target.checked) {
                          handleMemberVerification()
                        } else {
                          setShowVerification(false)
                          setVerificationStatus('pending')
                        }
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="isAlumni" className="ml-2 block text-sm text-gray-700">
                      我是（曾是）深中模联成员
                    </label>
                  </div>

                  {/* 成员验证区域 */}
                  {isAlumni && showVerification && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 mb-3">
                        {verificationStatus === 'verified' 
                          ? '✅ 验证通过！您可以使用深中模联成员身份注册。'
                          : verificationStatus === 'failed'
                          ? '❌ 验证失败，请检查学号格式。'
                          : isSMSMUNEmail(email)
                          ? '✅ 检测到smsmun邮箱，验证通过！'
                          : '请提供以下信息进行身份验证：'
                        }
                      </p>
                      
                      {!isSMSMUNEmail(email) && verificationStatus !== 'verified' && verificationStatus !== 'failed' && (
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                              深圳中学学号
                            </label>
                            <input
                              id="studentId"
                              type="text"
                              value={studentId}
                              onChange={(e) => setStudentId(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                              placeholder="请输入深圳中学学号（20XX年+7位数字）"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              请输入您的深圳中学学号进行身份验证（格式：20XX年+7位数字）
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleStudentIdVerification}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                          >
                            验证学号
                          </button>
                        </div>
                      )}
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
