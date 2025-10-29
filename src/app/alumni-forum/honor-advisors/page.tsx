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
  name: string
  email: string
  graduation_year: string
  position: string
  created_at: string
}

export default function HonorAdvisorsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [honorAdvisors, setHonorAdvisors] = useState<HonorAdvisorMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 加载荣誉顾问列表（现在访客也可以访问）
    loadHonorAdvisors()
  }, [user, router])

  const loadHonorAdvisors = async () => {
    try {
      console.log('开始加载荣誉顾问数据...')
      
      // 从Supabase加载荣誉顾问数据
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      console.log('荣誉顾问查询结果:', { advisorsData, advisorsError })

      if (advisorsError) {
        console.error('Error loading honor advisors:', advisorsError.message)
        setHonorAdvisors([])
      } else {
        setHonorAdvisors(advisorsData || [])
      }
    } catch (error) {
      console.error('加载荣誉顾问数据时出错:', error)
      setHonorAdvisors([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/alumni-forum"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回校友交流
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
                      共 {honorAdvisors.length} 位荣誉顾问
                    </span>
                  </div>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-8 md:p-12">
                {/* 总体介绍 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6">总体介绍</h2>
                  <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
                    <p className="mb-6">
                      为加强深圳中学模拟联合国协会与往届优秀成员之间的联系，充分发挥毕业成员的经验优势，提升协会活动质量，建立长期发展支持体系，特设立顾问委员会。
                    </p>
                    <p className="mb-6">
                      顾问委员会为协会下设之咨询型、非执行性机构，其成员具有指导资格但不直接参与协会日常行政管理及具体事务执行。
                    </p>
                    <p className="mb-6">
                      作为荣誉顾问，您将享有在协会筹办重要活动时被咨询意见的权利，可参与线上指导会议、经验分享或培训活动，并有权优先受邀参加协会举办的重大活动。
                    </p>
                  </div>
                </div>

                {/* 核心特点 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6">核心特点</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary mb-3">咨询指导</h3>
                      <p className="text-gray-700">
                        在协会筹办重要活动或大型会议时，为现任成员提供宝贵的经验和建议。
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary mb-3">经验分享</h3>
                      <p className="text-gray-700">
                        通过线上指导会议、经验分享或培训活动，传承模联精神与技能。
                      </p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary mb-3">优先参与</h3>
                      <p className="text-gray-700">
                        有权优先受邀参加协会举办的重大活动，如年会、开幕式、成果展示等。
                      </p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary mb-3">荣誉身份</h3>
                      <p className="text-gray-700">
                        姓名及"荣誉顾问"身份可在协会官方文件中标注，获得年度纪念周边。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 任职条件 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6">任职条件</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        为本协会往届成员，且在协会任职期间有突出贡献或表现优异
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        在模拟联合国或相关领域具有经验积累，能够为协会提供建设性意见
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        具备良好品行，认同协会价值观
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 现有荣誉顾问 */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary">荣誉顾问委员会成员</h2>
                    <button
                      onClick={() => {
                        setLoading(true)
                        loadHonorAdvisors()
                      }}
                      disabled={loading}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors text-sm"
                    >
                      {loading ? '刷新中...' : '刷新数据'}
                    </button>
                  </div>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">加载中...</p>
                    </div>
                  ) : honorAdvisors.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          调试信息：当前加载的荣誉顾问数量为 {honorAdvisors.length}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                          请检查浏览器控制台的详细日志
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          💡 点击上方的"刷新数据"按钮重新加载数据
                        </p>
                      </div>
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">暂无委员会成员</h3>
                      <p className="text-gray-600">荣誉顾问委员会正在建设中...</p>
                    </div>
                  ) : (
                    <div>
                      {honorAdvisors.length > 0 && honorAdvisors[0]?.id?.startsWith('test-') && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-800">
                            ℹ️ 当前显示的是测试数据，因为数据库连接有问题
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {honorAdvisors.map((advisor) => (
                          <div key={advisor.id} className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                                {advisor.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-amber-800 text-lg">{advisor.name}</h3>
                                <p className="text-sm text-amber-700">{advisor.graduation_year}年毕业</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm text-amber-700">
                                <span className="font-semibold">邮箱：</span>{advisor.email}
                              </p>
                              <p className="text-sm text-amber-700">
                                <span className="font-semibold">在协会职务：</span>{advisor.position}
                              </p>
                              <div className="pt-2 border-t border-amber-300">
                                <p className="text-xs text-amber-600">
                                  加入时间：{new Date(advisor.created_at || '').toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/alumni-forum/honor-advisors/charter"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2 bedside-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    阅读详细章程
                  </Link>
                  
                  {/* 只有登录的校友才能申请 */}
                  {user && user.is_alumni && (
                    <Link
                      href="/alumni-forum/honor-advisors/apply"
                      className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      申请成为荣誉顾问
                    </Link>
                  )}
                  
                  {/* 访客提示 */}
                  {(!user || !user.is_alumni) && (
                    <div className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed shadow-md">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      登录后可申请成为荣誉顾问
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
