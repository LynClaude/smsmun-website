'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
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
  answers: Answer[]
  created_at: string
}

interface Answer {
  id: string
  question_id: string
  user_id: string
  content: string
  created_at: string
}

interface HonorAdvisor {
  id: string
  name: string
  email: string
  phone: string
  graduationYear: string
  message: string
  timestamp: string
}

export default function AlumniForumPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'messages' | 'qa' | 'advisor'>('messages')
  const [newMessage, setNewMessage] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null)
  
  // 荣誉指导申请表单
  const [advisorForm, setAdvisorForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [messages, setMessages] = useState<Message[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [honorAdvisors, setHonorAdvisors] = useState<HonorAdvisor[]>([])
  const [userNames, setUserNames] = useState<{[key: string]: string}>({})
  const [userAvatars, setUserAvatars] = useState<{[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean}}>({})

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

    // 加载数据
    loadData()
  }, [user, router])

  const loadData = async () => {
    try {
      console.log('🔍 开始加载真实Supabase数据...')
      
      // 从 Supabase 加载真实留言数据
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📝 真实留言查询结果:', { 
        success: !messagesError, 
        error: messagesError?.message,
        count: messagesData?.length || 0,
        data: messagesData 
      })

      if (messagesError) {
        console.error('❌ 留言查询失败:', messagesError.message)
        setMessages([])
      } else {
        setMessages(messagesData || [])
        
        // 获取所有留言的真实用户信息
        if (messagesData && messagesData.length > 0) {
          const userIds = Array.from(new Set(messagesData.filter(msg => msg.user_id).map(msg => msg.user_id)))
          console.log('👤 提取的真实用户ID:', userIds)
          
          if (userIds.length > 0) {
            const { data: usersData, error: usersError } = await supabase
              .from('users')
              .select('id, username, is_honor_advisor, is_alumni')
              .in('id', userIds)
            
            console.log('👤 真实用户查询结果:', { 
              success: !usersError,
              error: usersError?.message,
              count: usersData?.length || 0,
              data: usersData 
            })
            
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
              console.log('✅ 真实用户名映射:', nameMap)
              setUserNames(nameMap)
              setUserAvatars(avatarMap)
            } else {
              console.log('⚠️ 没有找到用户数据')
            }
          } else {
            console.log('⚠️ 没有找到用户ID')
          }
        } else {
          console.log('⚠️ 没有留言数据')
        }
      }

      // 从 Supabase 加载真实问题数据
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('❓ 真实问题查询结果:', { 
        success: !questionsError,
        error: questionsError?.message,
        count: questionsData?.length || 0,
        data: questionsData 
      })

      if (questionsError) {
        console.error('❌ 问题查询失败:', questionsError.message)
        setQuestions([])
      } else {
        // 为每个问题加载对应的真实回答
        const questionsWithAnswers = await Promise.all(
          (questionsData || []).map(async (question) => {
            try {
              const { data: answersData, error: answersError } = await supabase
                .from('answers')
                .select('*')
                .eq('question_id', question.id)
                .order('created_at', { ascending: true })

              if (answersError) {
                console.error('❌ 回答查询失败:', answersError.message)
                return { ...question, answers: [] }
              }

              return { ...question, answers: answersData || [] }
            } catch (error) {
              console.error('❌ 处理问题时出错:', error)
              return { ...question, answers: [] }
            }
          })
        )
        setQuestions(questionsWithAnswers)

        // 获取所有问题和回答的真实用户名
        if (questionsWithAnswers && questionsWithAnswers.length > 0) {
          const allUserIds = new Set<string>()
          
          // 收集问题的用户ID
          questionsWithAnswers.forEach(question => {
            if (question.user_id) {
              allUserIds.add(question.user_id)
            }
            // 收集回答的用户ID
            question.answers?.forEach((answer: Answer) => {
              if (answer.user_id) {
                allUserIds.add(answer.user_id)
              }
            })
          })

          console.log('👤 问答区用户ID列表:', Array.from(allUserIds))

          if (allUserIds.size > 0) {
            const { data: usersData, error: usersError } = await supabase
              .from('users')
              .select('id, username, is_honor_advisor, is_alumni')
              .in('id', Array.from(allUserIds))
            
            console.log('👤 问答区用户查询结果:', { 
              success: !usersError,
              error: usersError?.message,
              count: usersData?.length || 0,
              data: usersData 
            })
            
            if (usersError) {
              console.error('❌ 问答区用户查询失败:', usersError.message)
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
              console.log('✅ 问答区用户名映射:', nameMap)
              setUserNames(prev => ({ ...prev, ...nameMap }))
              setUserAvatars(prev => ({ ...prev, ...avatarMap }))
            }
          }
        }
      }

      // 从 Supabase 加载荣誉指导申请
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .order('created_at', { ascending: false })

      if (advisorsError) {
        console.error('Error loading honor advisors:', advisorsError.message)
      } else {
        setHonorAdvisors(advisorsData || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            user_id: user.id,
            author: user.username,
            content: newMessage,
            contact: user.email || '未提供',
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Error sending message:', error.message)
        alert('发送留言失败，请重试')
        return
      }

      if (data && data.length > 0) {
        setMessages([data[0], ...messages])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('发送留言失败，请重试')
    }
  }

  const handleAskQuestion = async () => {
    if (!newQuestion.trim() || !user) return

    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([
          {
            user_id: user.id,
            question: newQuestion,
            author: user.username,
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Error asking question:', error.message)
        alert('提交问题失败，请重试')
        return
      }

      if (data && data.length > 0) {
        const newQuestionWithAnswers = { ...data[0], answers: [] }
        setQuestions([newQuestionWithAnswers, ...questions])
        setNewQuestion('')
      }
    } catch (error) {
      console.error('Error asking question:', error)
      alert('提交问题失败，请重试')
    }
  }

  const handleAnswerQuestion = async (questionId: string) => {
    if (!newAnswer.trim() || !user) return

    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([
          {
            question_id: questionId,
            user_id: user.id,
            answer: newAnswer,
            author: user.username,
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Error answering question:', error.message)
        alert('提交回答失败，请重试')
        return
      }

      if (data && data.length > 0) {
        const updatedQuestions = questions.map(q => 
          q.id === questionId 
            ? { ...q, answers: [...q.answers, data[0]] }
            : q
        )
        setQuestions(updatedQuestions)
        setNewAnswer('')
        setAnsweringQuestion(null)
      }
    } catch (error) {
      console.error('Error answering question:', error)
      alert('提交回答失败，请重试')
    }
  }

  const handleSubmitAdvisorApplication = async () => {
    if (!advisorForm.name || !advisorForm.email || !advisorForm.phone || !advisorForm.message || !user) return

    try {
      const { data, error } = await supabase
        .from('honor_advisors')
        .insert([
          {
            name: advisorForm.name,
            email: advisorForm.email,
            phone: advisorForm.phone,
            graduation_year: user.graduation_year || '未知',
            message: advisorForm.message,
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Error submitting advisor application:', error.message)
        alert('提交申请失败，请重试')
        return
      }

      if (data && data.length > 0) {
        setHonorAdvisors([data[0], ...honorAdvisors])
        setAdvisorForm({ name: '', email: '', phone: '', message: '' })
        alert('申请提交成功！我们会尽快联系您。')
      }
    } catch (error) {
      console.error('Error submitting advisor application:', error)
      alert('提交申请失败，请重试')
    }
  }

  if (!user || !user.is_alumni) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">访问受限</h1>
            <p className="text-gray-600 mb-6">此页面仅限深中模联成员（包括在校生和校友）访问，请先登录您的深中模联账号</p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">校友交流</h1>
              <p className="text-gray-600">
                {user?.is_honor_advisor ? '深中模联荣誉顾问专属交流平台 - 荣誉顾问委员会系统已更新' : '深中模联校友专属交流平台 - 荣誉顾问委员会系统已更新'}
              </p>
            </div>

            {/* 标签切换 */}
            <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                留言板
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'qa'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                问答区
              </button>
              <button
                onClick={() => setActiveTab('advisor')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'advisor'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                荣誉顾问
              </button>
            </div>

            {/* 留言板 */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">留言板</h2>
                
                {/* 发送留言 */}
                <div className="mb-6">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="分享您的想法、回忆或祝福..."
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    发送留言
                  </button>
                </div>

                {/* 留言列表 */}
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
              </div>
            )}

            {/* 问答区 */}
            {activeTab === 'qa' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">问答区</h2>
                
                {/* 提问 */}
                <div className="mb-6">
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="有什么问题想请教其他校友？"
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                  <button
                    onClick={handleAskQuestion}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    提出问题
                  </button>
                </div>

                {/* 问题列表 */}
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
                      
                      {/* 回答列表 */}
                      <div className="space-y-3 mb-4">
                        {question.answers.map((answer) => (
                          <div key={answer.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-900">
                                {userNames[answer.user_id] || `用户 ${answer.user_id ? answer.user_id.substring(0, 8) : '未知'}`}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(answer.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{answer.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* 回答输入 */}
                      {answeringQuestion === question.id ? (
                        <div>
                          <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder="输入您的回答..."
                            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                            rows={2}
                          />
                          <div className="mt-2 space-x-2">
                            <button
                              onClick={() => handleAnswerQuestion(question.id)}
                              className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90"
                            >
                              提交回答
                            </button>
                            <button
                              onClick={() => {
                                setAnsweringQuestion(null)
                                setNewAnswer('')
                              }}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAnsweringQuestion(question.id)}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          回答这个问题
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 荣誉顾问 */}
            {activeTab === 'advisor' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">荣誉顾问委员会</h2>
                <p className="text-gray-600 mb-6">
                  为加强深圳中学模拟联合国协会与往届优秀成员之间的联系，充分发挥毕业成员的经验优势，提升协会活动质量，特设立顾问委员会。
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">顾问委员会核心特点</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>咨询指导：在协会筹办重要活动时提供宝贵经验和建议</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>经验分享：通过线上指导会议传承模联精神与技能</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>优先参与：优先受邀参加协会重大活动</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>荣誉身份：在官方文件中标注身份，获得年度纪念周边</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <Link
                    href="/alumni-forum/honor-advisors"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    了解详情并申请
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
