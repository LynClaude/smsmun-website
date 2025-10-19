'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface HonorAdvisorApplication {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  graduation_year: string
  position: string
  achievements: string
  motivation: string
  availability: string
  additional_info: string
  created_at: string
}

export default function HonorAdvisorApplyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wechat: '',
    graduation_year: '',
    position: '',
    achievements: '',
    motivation: '',
    availability: '',
    additional_info: ''
  })

  useEffect(() => {
    // 检查用户权限
    if (!user) {
      router.push('/auth/login')
      return
    }
    if (!user.is_alumni) {
      router.push('/')
      return
    }
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // 验证表单数据
      if (!formData.name || !formData.email || !formData.graduation_year || !formData.position || !formData.achievements || !formData.motivation) {
        setError('请填写所有必填字段')
        setLoading(false)
        return
      }

      // 提交申请到 Supabase
      const { data, error: insertError } = await supabase
        .from('honor_advisors')
        .insert([
          {
            user_id: user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            wechat: formData.wechat || '',
            graduation_year: formData.graduation_year,
            position: formData.position,
            achievements: formData.achievements,
            motivation: formData.motivation,
            availability: formData.availability,
            additional_info: formData.additional_info
          }
        ])
        .select()

      if (insertError) {
        console.error('Error submitting application:', insertError.message)
        setError('提交申请失败，请重试')
      } else {
        setSuccess('申请提交成功！我们会尽快审核您的申请。')
        setSubmitted(true)
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          wechat: '',
          graduation_year: '',
          position: '',
          achievements: '',
          motivation: '',
          availability: '',
          additional_info: ''
        })
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setError('提交申请失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (!user || !user.is_alumni) {
    return null
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/alumni-forum/honor-advisors"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回荣誉顾问页面
              </Link>
            </div>

            {/* 申请表单 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* 页面头部 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">荣誉顾问申请</h1>
                <p className="text-lg opacity-90">深圳中学模拟联合国协会</p>
                <p className="text-sm opacity-75 mt-2">Honor Advisor Application</p>
              </div>

              {/* 表单内容 */}
              <div className="p-8 md:p-12">
                {success && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="请输入您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="请输入您的邮箱"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        联系电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="请输入您的联系电话"
                      />
                    </div>

                    <div>
                      <label htmlFor="wechat" className="block text-sm font-medium text-gray-700 mb-2">
                        微信号
                      </label>
                      <input
                        type="text"
                        id="wechat"
                        name="wechat"
                        value={formData.wechat}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="请输入您的微信号"
                      />
                    </div>

                    <div>
                      <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700 mb-2">
                        毕业年份 <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="graduation_year"
                        name="graduation_year"
                        value={formData.graduation_year}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">请选择毕业年份</option>
                        {Array.from({ length: 20 }, (_, i) => {
                          const year = 2024 - i
                          return (
                            <option key={year} value={year.toString()}>
                              {year}年
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* 在协会的职务 */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      在协会的职务 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="如：秘书长、副秘书长、部长等"
                    />
                  </div>

                  {/* 主要成就和贡献 */}
                  <div>
                    <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
                      主要成就和贡献 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="请详细描述您在协会期间的主要成就和贡献"
                    />
                  </div>

                  {/* 申请动机 */}
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      申请动机 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="请说明您申请成为荣誉顾问的原因和动机"
                    />
                  </div>

                  {/* 可参与时间 */}
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      可参与时间
                    </label>
                    <textarea
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="请说明您可用于指导活动的时间安排"
                    />
                  </div>

                  {/* 其他信息 */}
                  <div>
                    <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-2">
                      其他信息
                    </label>
                    <textarea
                      id="additional_info"
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="如有其他需要说明的信息，请在此填写"
                    />
                  </div>

                  {/* 提交按钮 */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          提交中...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          提交申请
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
