'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageTransition from '@/components/PageTransition'
import Image from 'next/image'

interface Message {
  id: string
  user_id: string
  content: string
  created_at: string
}

interface Question {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
}

export default function TestAlumniForumPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'messages' | 'qa'>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [userNames, setUserNames] = useState<{[key: string]: string}>({})
  const [userAvatars, setUserAvatars] = useState<{[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean}}>({})
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    if (!user.is_alumni) {
      router.push('/')
      return
    }

    loadData()
  }, [user, router])

  const loadData = async () => {
    try {
      console.log('🚀 开始加载测试数据...')
      setLoading(true)
      
      const debugData: any = {
        timestamp: new Date().toISOString(),
        user: {
          id: user?.id,
          email: user?.email,
          is_alumni: user?.is_alumni
        }
      }

      // 1. 测试留言数据
      console.log('📝 加载留言数据...')
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      debugData.messages = {
        success: !messagesError,
        error: messagesError?.message,
        count: messagesData?.length || 0,
        data: messagesData
      }

      console.log('📝 留言查询结果:', debugData.messages)

      if (messagesError) {
        console.error('❌ 留言查询失败:', messagesError.message)
        setMessages([])
      } else {
        setMessages(messagesData || [])
        
        // 获取用户名
        if (messagesData && messagesData.length > 0) {
          const userIds = Array.from(new Set(messagesData.filter(msg => msg.user_id).map(msg => msg.user_id)))
          console.log('👤 提取的用户ID:', userIds)
          
          if (userIds.length > 0) {
            const { data: usersData, error: usersError } = await supabase
              .from('users')
              .select('id, username, is_honor_advisor, is_alumni')
              .in('id', userIds)
            
            debugData.userQuery = {
              success: !usersError,
              error: usersError?.message,
              userIds: userIds,
              userData: usersData
            }

            console.log('👤 用户查询结果:', debugData.userQuery)
            
            if (usersError) {
              console.error('❌ 用户查询失败:', usersError.message)
            } else if (usersData) {
              const nameMap: {[key: string]: string} = {}
              const avatarMap: {[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean}} = {}
              
              usersData.forEach(u => {
                if (u.id && u.username) {
                  nameMap[u.id] = u.username
                  avatarMap[u.id] = {
                    username: u.username,
                    is_honor_advisor: u.is_honor_advisor || false,
                    is_alumni: u.is_alumni || false
                  }
                }
              })
              
              console.log('✅ 用户名映射:', nameMap)
              setUserNames(nameMap)
              setUserAvatars(avatarMap)
            }
          }
        }
      }

      // 2. 测试问题数据
      console.log('❓ 加载问题数据...')
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      debugData.questions = {
        success: !questionsError,
        error: questionsError?.message,
        count: questionsData?.length || 0,
        data: questionsData
      }

      console.log('❓ 问题查询结果:', debugData.questions)

      if (questionsError) {
        console.error('❌ 问题查询失败:', questionsError.message)
        setQuestions([])
      } else {
        setQuestions(questionsData || [])
      }

      setDebugInfo(debugData)
      console.log('📊 完整调试信息:', debugData)

    } catch (error) {
      console.error('❌ 加载数据时发生错误:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">加载测试数据中...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🧪 校友交流测试页面
            </h1>

            {/* 调试信息 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">🔍 调试信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p><strong>留言数量:</strong> {messages.length}</p>
                  <p><strong>问题数量:</strong> {questions.length}</p>
                  <p><strong>用户名映射数量:</strong> {Object.keys(userNames).length}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p><strong>当前用户:</strong> {user?.email}</p>
                  <p><strong>是否校友:</strong> {user?.is_alumni ? '是' : '否'}</p>
                </div>
              </div>
            </div>

            {/* 标签页 */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                留言板 ({messages.length})
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'qa'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                问答区 ({questions.length})
              </button>
            </div>

            {/* 留言板 */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">💬 留言板</h2>
                
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">暂无留言</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const userInfo = userAvatars[message.user_id]
                      const displayName = userNames[message.user_id] || `用户 ${message.user_id ? message.user_id.substring(0, 8) : '未知'}`
                      
                      return (
                        <div key={message.id} className="border-l-4 border-primary pl-4 py-3 bg-gray-50 rounded-r-lg">
                          <div className="flex items-start gap-3 mb-2">
                            {/* 用户头像 */}
                            <div className="flex-shrink-0">
                              {userInfo?.is_honor_advisor ? (
                                <div className="w-10 h-10">
                                  <Image
                                    src="/皇冠.png"
                                    alt="荣誉顾问"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {displayName.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            
                            {/* 用户信息和留言内容 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{displayName}</span>
                                  {userInfo?.is_alumni && (
                                    <Image
                                      src="/favicon.ico"
                                      alt="深中模联成员"
                                      width={16}
                                      height={16}
                                      className="w-4 h-4"
                                    />
                                  )}
                                  {userInfo?.is_honor_advisor && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                      荣誉顾问
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(message.created_at).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 问答区 */}
            {activeTab === 'qa' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">❓ 问答区</h2>
                
                {questions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">暂无问题</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questions.map((question) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-gray-900">{question.title}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(question.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          提问者：{userNames[question.user_id] || `用户 ${question.user_id ? question.user_id.substring(0, 8) : '未知'}`}
                        </p>
                        <p className="text-gray-700">{question.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 完整调试信息 */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📊 完整调试信息</h2>
              <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}




