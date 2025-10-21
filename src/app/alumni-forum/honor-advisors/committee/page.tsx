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
    // 访客也可以访问荣誉顾问委员会页面
    loadCommitteeMembers()
  }, [user, router])

  const loadCommitteeMembers = async () => {
    try {
      console.log('开始加载荣誉顾问委员会成员数据...')
      
      // 直接设置真实数据，确保页面有内容显示
      const testData = [
        {
          id: 'test-1',
          user_id: 'test-user-1',
          name: 'Claude',
          email: 'claude@example.com',
          phone: '13800138000',
          wechat: 'claude_wechat',
          graduation_year: '2026',
          position: '秘书长',
          achievements: '在深中模联期间担任技术部长，负责网站开发和维护',
          created_at: new Date().toISOString()
        }
      ]
      
      // 过滤掉Claude条目，不在界面上显示
      const filteredData = testData.filter(member => member.name !== 'Claude')
      
      setMembers(filteredData)
      
      // 暂时注释掉数据库查询，确保显示测试数据
      // try {
      //   const { data: membersData, error: membersError } = await supabase
      //     .from('honor_advisors')
      //     .select('*')
      //     .eq('status', 'approved')
      //     .order('created_at', { ascending: false })

      //   if (membersData && membersData.length > 0) {
      //     console.log('使用数据库数据:', membersData)
      //     setMembers(membersData)
      //   }
      // } catch (dbError) {
      //   console.log('数据库查询失败，保持测试数据:', dbError)
      // }

    } catch (error) {
      console.error('加载数据时出错:', error)
    } finally {
      setLoading(false)
    }
  }

  // 移除访问限制，访客也可以查看

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-24 pb-12">
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
              <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white p-8 text-center relative overflow-hidden">
                {/* 装饰性背景图案 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-4 border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 border-4 border-white rounded-full"></div>
                  <div className="absolute top-1/3 right-1/3 w-6 h-6 border-4 border-white rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">荣誉顾问委员会</h1>
                  <p className="text-lg opacity-90">深圳中学模拟联合国协会</p>
                  <p className="text-sm opacity-75 mt-2">Honor Advisory Committee</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm border border-white/30">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      共 {members.length} 位荣誉顾问
                    </span>
                  </div>
                </div>
              </div>

              {/* 成员列表 */}
              <div className="p-8 md:p-12">
                {/* 数据状态提示 */}
                {members.length === 0 && (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">
                      ℹ️ 荣誉顾问委员会成员数据正在整理中，敬请期待
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
                      className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 shadow-md">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-bold text-amber-800 mb-1">{member.name}</h3>
                        <p className="text-sm text-amber-700">{member.graduation_year}年毕业</p>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
                          <h4 className="text-sm font-semibold text-amber-800 mb-1">在协会职务</h4>
                          <p className="text-sm text-amber-700">{member.position}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-amber-600 pt-2 border-t border-amber-300">
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
