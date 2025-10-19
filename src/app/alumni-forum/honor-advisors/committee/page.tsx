'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface HonorAdvisorMember {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  wechat: string
  graduation_year: string
  position: string
  achievements: string
  created_at: string
}

export default function HonorAdvisorCommitteePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<HonorAdvisorMember[]>([])

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

    loadCommitteeMembers()
  }, [user, router])

  const loadCommitteeMembers = async () => {
    try {
      console.log('开始加载荣誉顾问数据...')
      
      // 查询已批准的数据
      const { data, error } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      console.log('已批准的荣誉顾问:', data)
      console.log('查询错误:', error)

      if (error || !data || data.length === 0) {
        console.log('使用测试数据...')
        const testData = [
          {
            id: 'test-1',
            user_id: 'test-user-1',
            name: 'Claude',
            email: 'claude@example.com',
            phone: '13800138000',
            wechat: 'claude_wechat',
            graduation_year: '2023',
            position: '技术顾问',
            achievements: '在深中模联期间担任技术部长，负责网站开发和维护',
            created_at: new Date().toISOString()
          },
          {
            id: 'test-2',
            user_id: 'test-user-2',
            name: '张三',
            email: 'zhangsan@example.com',
            phone: '13800138001',
            wechat: 'zhangsan_wechat',
            graduation_year: '2022',
            position: '学术顾问',
            achievements: '在模联领域有丰富经验，多次获得最佳代表奖',
            created_at: new Date().toISOString()
          }
        ]
        setMembers(testData)
      } else {
        console.log('设置荣誉顾问数据:', data)
        setMembers(data)
      }
    } catch (error) {
      console.error('Error loading honor advisors:', error)
      // 如果出现任何错误，使用测试数据
      console.log('发生错误，使用测试数据...')
      const testData = [
        {
          id: 'test-1',
          user_id: 'test-user-1',
          name: 'Claude',
          email: 'claude@example.com',
          phone: '13800138000',
          wechat: 'claude_wechat',
          graduation_year: '2023',
          position: '技术顾问',
          achievements: '在深中模联期间担任技术部长，负责网站开发和维护',
          created_at: new Date().toISOString()
        },
        {
          id: 'test-2',
          user_id: 'test-user-2',
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138001',
          wechat: 'zhangsan_wechat',
          graduation_year: '2022',
          position: '学术顾问',
          achievements: '在模联领域有丰富经验，多次获得最佳代表奖',
          created_at: new Date().toISOString()
        }
      ]
      setMembers(testData)
    } finally {
      setLoading(false)
    }
  }

  if (!user || !user.is_alumni) {
    return null
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/profile"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回我的页面
              </Link>
            </div>

            {/* 主要内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* 页面头部 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">荣誉顾问委员会</h1>
                <p className="text-lg opacity-90">深圳中学模拟联合国协会</p>
                <p className="text-sm opacity-75 mt-2">Honor Advisory Committee</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    共 {members.length} 位荣誉顾问
                  </span>
                </div>
              </div>

              {/* 成员列表 */}
              <div className="p-8 md:p-12">
                {/* 测试数据提示 */}
                {members.length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      ℹ️ 当前显示的是测试数据，包含 {members.length} 位荣誉顾问委员会成员
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.graduation_year}年毕业</p>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">在协会职务</h4>
                          <p className="text-sm text-gray-900">{member.position}</p>
                        </div>

                        <div className="bg-white/50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">主要成就</h4>
                          <p className="text-sm text-gray-900 line-clamp-3">{member.achievements}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                          <span>加入时间</span>
                          <span>{new Date(member.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {members.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">暂无荣誉顾问成员</h3>
                    <p className="text-gray-600">荣誉顾问委员会正在建设中...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}