'use client'

import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import PageTransition from '@/components/PageTransition'

export default function FixUserStatusPage() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  // 只有管理员可以访问此页面
  if (!user || !user.is_admin) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">无权限访问</h1>
              <p className="text-gray-600 mt-2">只有管理员可以访问此页面</p>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  const fixUserStatus = async () => {
    if (!email.trim()) {
      setResult('请输入邮箱地址')
      return
    }

    setLoading(true)
    setResult('')

    try {
      // 查找用户
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.trim())
        .single()

      if (userError || !userData) {
        setResult(`未找到邮箱为 ${email} 的用户`)
        setLoading(false)
        return
      }

      console.log('找到用户:', userData)

      // 检查是否有批准的荣誉顾问申请
      const { data: honorData, error: honorError } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('user_id', userData.id)
        .eq('status', 'approved')

      if (honorError) {
        setResult(`查询荣誉顾问申请失败: ${honorError.message}`)
        setLoading(false)
        return
      }

      console.log('荣誉顾问申请数据:', honorData)

      if (!honorData || honorData.length === 0) {
        setResult(`用户 ${email} 没有批准的荣誉顾问申请`)
        setLoading(false)
        return
      }

      // 更新用户状态
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          is_honor_advisor: true,
          honor_advisor_approved_at: new Date().toISOString()
        })
        .eq('id', userData.id)

      if (updateError) {
        setResult(`更新用户状态失败: ${updateError.message}`)
      } else {
        setResult(`成功！用户 ${email} 的状态已更新为荣誉顾问`)
      }

    } catch (error) {
      console.error('修复用户状态时出错:', error)
      setResult(`修复失败: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">修复用户状态</h1>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  用户邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="输入用户的邮箱地址"
                />
              </div>

              <button
                onClick={fixUserStatus}
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '处理中...' : '修复用户状态'}
              </button>

              {result && (
                <div className={`mt-4 p-4 rounded-md ${
                  result.includes('成功') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {result}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-medium text-blue-900 mb-2">说明：</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 此工具用于修复荣誉顾问用户的显示状态</li>
                  <li>• 输入用户的邮箱地址，系统会自动检查是否有批准的荣誉顾问申请</li>
                  <li>• 如果有批准的申请，会自动更新用户的is_honor_advisor状态为true</li>
                  <li>• 修复后，用户应该能看到荣誉顾问图标和委员会入口</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
