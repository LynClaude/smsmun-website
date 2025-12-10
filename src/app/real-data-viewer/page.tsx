'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function RealDataViewerPage() {
  const [realData, setRealData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRealData()
  }, [])

  const loadRealData = async () => {
    try {
      console.log('🔍 加载真实数据库数据...')
      
      // 1. 获取所有真实用户
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      // 2. 获取所有真实留言
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      // 3. 获取所有真实问题
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })

      // 4. 获取所有真实回答
      const { data: answersData, error: answersError } = await supabase
        .from('answers')
        .select('*')
        .order('created_at', { ascending: false })

      // 5. 获取所有真实荣誉顾问
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .order('created_at', { ascending: false })

      const realDataResult = {
        timestamp: new Date().toISOString(),
        users: {
          data: usersData,
          error: usersError?.message,
          count: usersData?.length || 0
        },
        messages: {
          data: messagesData,
          error: messagesError?.message,
          count: messagesData?.length || 0
        },
        questions: {
          data: questionsData,
          error: questionsError?.message,
          count: questionsData?.length || 0
        },
        answers: {
          data: answersData,
          error: answersError?.message,
          count: answersData?.length || 0
        },
        advisors: {
          data: advisorsData,
          error: advisorsError?.message,
          count: advisorsData?.length || 0
        }
      }

      console.log('📊 真实数据库数据:', realDataResult)
      setRealData(realDataResult)

    } catch (error) {
      console.error('❌ 加载真实数据时出错:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">加载真实数据库数据中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">📊 真实数据库数据查看器</h1>
          <p className="text-gray-600 mb-8">数据来源: Supabase 项目 xjeqpsicutiwkxjoqvls</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 用户数据 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👥 用户数据 ({realData.users?.count || 0})</h2>
              {realData.users?.error ? (
                <div className="p-3 bg-red-50 text-red-800 rounded">
                  <p><strong>错误:</strong> {realData.users.error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realData.users?.data?.map((user: any) => (
                    <div key={user.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>ID:</strong> {user.id}</p>
                      <p><strong>用户名:</strong> {user.username}</p>
                      <p><strong>邮箱:</strong> {user.email}</p>
                      <p><strong>是否校友:</strong> {user.is_alumni ? '是' : '否'}</p>
                      <p><strong>是否荣誉顾问:</strong> {user.is_honor_advisor ? '是' : '否'}</p>
                      <p><strong>毕业年份:</strong> {user.graduation_year || '未设置'}</p>
                      <p><strong>创建时间:</strong> {new Date(user.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 留言数据 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💬 留言数据 ({realData.messages?.count || 0})</h2>
              {realData.messages?.error ? (
                <div className="p-3 bg-red-50 text-red-800 rounded">
                  <p><strong>错误:</strong> {realData.messages.error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realData.messages?.data?.map((message: any) => (
                    <div key={message.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>ID:</strong> {message.id}</p>
                      <p><strong>用户ID:</strong> {message.user_id}</p>
                      <p><strong>内容:</strong> {message.content}</p>
                      <p><strong>创建时间:</strong> {new Date(message.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 问题数据 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">❓ 问题数据 ({realData.questions?.count || 0})</h2>
              {realData.questions?.error ? (
                <div className="p-3 bg-red-50 text-red-800 rounded">
                  <p><strong>错误:</strong> {realData.questions.error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realData.questions?.data?.map((question: any) => (
                    <div key={question.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>ID:</strong> {question.id}</p>
                      <p><strong>用户ID:</strong> {question.user_id}</p>
                      <p><strong>标题:</strong> {question.title}</p>
                      <p><strong>内容:</strong> {question.content}</p>
                      <p><strong>创建时间:</strong> {new Date(question.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 回答数据 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💭 回答数据 ({realData.answers?.count || 0})</h2>
              {realData.answers?.error ? (
                <div className="p-3 bg-red-50 text-red-800 rounded">
                  <p><strong>错误:</strong> {realData.answers.error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realData.answers?.data?.map((answer: any) => (
                    <div key={answer.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>ID:</strong> {answer.id}</p>
                      <p><strong>问题ID:</strong> {answer.question_id}</p>
                      <p><strong>用户ID:</strong> {answer.user_id}</p>
                      <p><strong>内容:</strong> {answer.content}</p>
                      <p><strong>创建时间:</strong> {new Date(answer.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 荣誉顾问数据 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👑 荣誉顾问数据 ({realData.advisors?.count || 0})</h2>
              {realData.advisors?.error ? (
                <div className="p-3 bg-red-50 text-red-800 rounded">
                  <p><strong>错误:</strong> {realData.advisors.error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realData.advisors?.data?.map((advisor: any) => (
                    <div key={advisor.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>ID:</strong> {advisor.id}</p>
                      <p><strong>用户ID:</strong> {advisor.user_id}</p>
                      <p><strong>姓名:</strong> {advisor.name || '未设置'}</p>
                      <p><strong>邮箱:</strong> {advisor.email || '未设置'}</p>
                      <p><strong>状态:</strong> {advisor.status || '未设置'}</p>
                      <p><strong>创建时间:</strong> {new Date(advisor.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 用户名映射测试 */}
          {realData.messages?.data && realData.users?.data && (
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🔗 用户名映射测试</h2>
              <div className="space-y-3">
                {realData.messages.data.map((message: any) => {
                  const user = realData.users.data.find((u: any) => u.id === message.user_id)
                  return (
                    <div key={message.id} className="p-3 bg-gray-50 rounded">
                      <p><strong>留言ID:</strong> {message.id}</p>
                      <p><strong>留言内容:</strong> {message.content}</p>
                      <p><strong>用户ID:</strong> {message.user_id}</p>
                      <p><strong>找到的用户:</strong> {user ? user.username : '❌ 未找到用户'}</p>
                      <p><strong>用户邮箱:</strong> {user ? user.email : '❌ 未找到用户'}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 完整原始数据 */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📋 完整原始数据</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(realData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}





