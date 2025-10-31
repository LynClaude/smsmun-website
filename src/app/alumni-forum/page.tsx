'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n-context'

interface Message {
  id: string
  user_id?: string
  author: string
  content: string
  created_at: string
  timestamp?: string
  contact?: string
}

interface Question {
  id: string
  user_id?: string
  author: string
  question: string
  title?: string
  content?: string
  answers: Answer[]
  created_at: string
  timestamp?: string
}

interface Answer {
  id: string
  question_id: string
  user_id?: string
  author: string
  answer: string
  content?: string
  created_at: string
  timestamp?: string
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
  const { messages: t } = useI18n()
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
  const [userAvatars, setUserAvatars] = useState<{[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean, is_admin: boolean}}>({})

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
        
        // 获取所有留言的真实用户信息（仅用于头像和标签显示）
        if (messagesData && messagesData.length > 0) {
          // 获取所有唯一的用户名
          const usernames = Array.from(new Set(messagesData.map(msg => msg.author).filter(Boolean)))
          console.log('👤 提取的真实用户名:', usernames)
          
          if (usernames.length > 0) {
            const { data: usersData, error: usersError } = await supabase
              .from('users')
              .select('username, is_honor_advisor, is_alumni, is_admin')
              .in('username', usernames)
            
            console.log('👤 真实用户查询结果:', { 
              success: !usersError,
              error: usersError?.message,
              count: usersData?.length || 0,
              data: usersData 
            })
            
            if (usersError) {
              console.error('❌ 用户查询失败:', usersError.message)
            } else if (usersData) {
              const avatarMap: {[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean, is_admin: boolean}} = {}
              usersData.forEach(u => {
                if (u.username) {
                  avatarMap[u.username] = {
                    username: u.username,
                    is_honor_advisor: u.is_honor_advisor || false,
                    is_alumni: u.is_alumni || false,
                    is_admin: u.is_admin || false
                  }
                }
              })
              console.log('✅ 真实用户名映射:', avatarMap)
              setUserAvatars(prev => ({ ...prev, ...avatarMap }))
            } else {
              console.log('⚠️ 没有找到用户数据')
            }
          } else {
            console.log('⚠️ 没有找到用户名')
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
          const allUsernames = new Set<string>()
          
          // 收集问题的用户名
          questionsWithAnswers.forEach(question => {
            if (question.author) {
              allUsernames.add(question.author)
            }
            // 收集回答的用户名
            question.answers?.forEach((answer: Answer) => {
              if (answer.author) {
                allUsernames.add(answer.author)
              }
            })
          })

          console.log('👤 问答区用户名列表:', Array.from(allUsernames))

          if (allUsernames.size > 0) {
            const { data: usersData, error: usersError } = await supabase
              .from('users')
              .select('username, is_honor_advisor, is_alumni, is_admin')
              .in('username', Array.from(allUsernames))
            
            console.log('👤 问答区用户查询结果:', { 
              success: !usersError,
              error: usersError?.message,
              count: usersData?.length || 0,
              data: usersData 
            })
            
            if (usersError) {
              console.error('❌ 问答区用户查询失败:', usersError.message)
            } else if (usersData) {
              const avatarMap: {[key: string]: {username: string, is_honor_advisor: boolean, is_alumni: boolean, is_admin: boolean}} = {}
              usersData.forEach(u => {
                if (u.username) {
                  avatarMap[u.username] = {
                    username: u.username,
                    is_honor_advisor: u.is_honor_advisor || false,
                    is_alumni: u.is_alumni || false,
                    is_admin: u.is_admin || false
                  }
                }
              })
              console.log('✅ 问答区用户名映射:', avatarMap)
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.alumni_forum.access_restricted}</h1>
            <p className="text-gray-600 mb-6">{t.alumni_forum.access_message}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t.alumni_forum.return_home}
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
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t.alumni_forum.title}</h1>
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
                {t.alumni_forum.tabs.messages}
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'qa'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.alumni_forum.tabs.qa}
              </button>
              <button
                onClick={() => setActiveTab('advisor')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'advisor'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.alumni_forum.tabs.advisor}
              </button>
            </div>

            {/* 留言板 */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">{t.alumni_forum.messages.title}</h2>
                
                {/* 发送留言 */}
                <div className="mb-6">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t.alumni_forum.messages.placeholder}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {t.alumni_forum.messages.send}
                  </button>
                </div>

                {/* 留言列表 */}
                <div className="space-y-4">
                  {messages.map((message) => {
                    // 使用 author 字段直接显示用户名
                    const displayName = message.author || '未知用户'
                    const firstChar = displayName.charAt(0).toUpperCase()
                    const userInfo = userAvatars[message.author] || null
                    const isHonorAdvisor = userInfo?.is_honor_advisor || false
                    const isAdmin = userInfo?.is_admin || displayName === '管理员' || displayName.includes('admin')
                    
                    return (
                      <div 
                        key={message.id} 
                        className="pl-4 py-3 rounded-r-lg"
                        style={{
                          borderLeftWidth: '4px',
                          borderLeftStyle: 'solid',
                          borderLeftColor: isAdmin ? '#2563eb' : isHonorAdvisor ? '#eab308' : '#1e40af',
                          background: isAdmin ? 'linear-gradient(to right, #eff6ff, #e0e7ff)' : isHonorAdvisor ? 'linear-gradient(to right, #fefce8, #fef3c7)' : '#f9fafb'
                        }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          {/* 用户头像 */}
                          <div className="flex-shrink-0">
                            {isAdmin ? (
                              <div 
                                className="w-10 h-10 bg-blue-600 rounded-full shadow-md"
                                style={{
                                  backgroundImage: 'url(/顾问.png)',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              />
                            ) : isHonorAdvisor ? (
                              <div 
                                className="w-10 h-10 bg-yellow-400 rounded-full shadow-md"
                                style={{
                                  backgroundImage: 'url(/皇冠.png)',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {firstChar}
                              </div>
                            )}
                          </div>
                          
                          {/* 用户信息和留言内容 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${
                                  isAdmin ? 'text-blue-900' : 
                                  isHonorAdvisor ? 'text-amber-900' : 
                                  'text-gray-900'
                                }`}>
                                  {displayName}
                                </span>
                                {userInfo?.is_alumni && (
                                  <Image
                                    src="/favicon.ico"
                                    alt="深中模联成员"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                  />
                                )}
                                {isAdmin && (
                                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                                    管理员
                                  </span>
                                )}
                                {isHonorAdvisor && (
                                  <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-semibold">
                                    荣誉顾问
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                                {new Date(message.created_at || message.timestamp || '').toLocaleString()}
                              </span>
                            </div>
                            <p className={`${
                              isAdmin ? 'text-blue-900' : 
                              isHonorAdvisor ? 'text-amber-900' : 
                              'text-gray-700'
                            }`}>
                              {message.content}
                            </p>
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
                <h2 className="text-xl font-bold mb-4">{t.alumni_forum.qa.title}</h2>
                
                {/* 提问 */}
                <div className="mb-6">
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder={t.alumni_forum.qa.placeholder}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                  <button
                    onClick={handleAskQuestion}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {t.alumni_forum.qa.ask}
                  </button>
                </div>

                {/* 问题列表 */}
                <div className="space-y-6">
                  {questions.map((question) => {
                    const questionUserInfo = userAvatars[question.author] || null
                    const isQuestionHonorAdvisor = questionUserInfo?.is_honor_advisor || false
                    const questionDisplayName = question.author || '未知用户'
                    const isQuestionAdmin = questionUserInfo?.is_admin || questionDisplayName === '管理员' || questionDisplayName.includes('admin')
                    const questionFirstChar = questionDisplayName.charAt(0).toUpperCase()
                    
                    return (
                    <div 
                      key={question.id} 
                      className="rounded-lg p-4"
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderLeftWidth: '4px',
                        borderLeftStyle: 'solid',
                        borderColor: isQuestionAdmin ? '#2563eb' : isQuestionHonorAdvisor ? '#eab308' : '#e5e7eb',
                        borderLeftColor: isQuestionAdmin ? '#2563eb' : isQuestionHonorAdvisor ? '#eab308' : '#3b82f6',
                        background: isQuestionAdmin ? 'linear-gradient(to right, #eff6ff, #e0e7ff)' : isQuestionHonorAdvisor ? 'linear-gradient(to right, #fefce8, #fef3c7)' : '#ffffff'
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {/* 提问者头像 */}
                        <div className="flex-shrink-0">
                          {isQuestionAdmin ? (
                            <div 
                              className="w-10 h-10 bg-blue-600 rounded-full shadow-md"
                              style={{
                                backgroundImage: 'url(/顾问.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                          ) : isQuestionHonorAdvisor ? (
                            <div 
                              className="w-10 h-10 bg-yellow-400 rounded-full shadow-md"
                              style={{
                                backgroundImage: 'url(/皇冠.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {questionFirstChar}
                            </div>
                          )}
                        </div>
                        
                        {/* 问题内容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${
                                isQuestionAdmin ? 'text-blue-900' : 
                                isQuestionHonorAdvisor ? 'text-amber-900' : 
                                'text-gray-900'
                              }`}>
                                {question.author || '未知用户'}
                              </span>
                              {isQuestionAdmin && (
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                                  管理员
                                </span>
                              )}
                              {questionUserInfo?.is_honor_advisor && (
                                <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-semibold">
                                  荣誉顾问
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                              {new Date(question.created_at || question.timestamp || '').toLocaleString()}
                            </span>
                          </div>
                          <h3 className={`font-medium ${
                            isQuestionAdmin ? 'text-blue-900' : 
                            isQuestionHonorAdvisor ? 'text-amber-900' : 
                            'text-gray-900'
                          }`}>
                            {question.question || question.title || question.content}
                          </h3>
                        </div>
                      </div>
                      
                      {/* 回答列表 */}
                      <div className="space-y-3 mb-4">
                        {question.answers.map((answer) => {
                          const answerUserInfo = userAvatars[answer.author] || null
                          const isAnswerHonorAdvisor = answerUserInfo?.is_honor_advisor || false
                          const answerDisplayName = answer.author || '未知用户'
                          const isAnswerAdmin = answerUserInfo?.is_admin || answerDisplayName === '管理员' || answerDisplayName.includes('admin')
                          const answerFirstChar = answerDisplayName.charAt(0).toUpperCase()
                          
                          return (
                          <div 
                            key={answer.id} 
                            className="p-3 rounded-md"
                            style={{
                              borderLeftWidth: '4px',
                              borderLeftStyle: 'solid',
                              borderLeftColor: isAnswerAdmin ? '#2563eb' : isAnswerHonorAdvisor ? '#eab308' : '#3b82f6',
                              background: isAnswerAdmin ? 'linear-gradient(to right, #dbeafe, #e0e7ff)' : isAnswerHonorAdvisor ? 'linear-gradient(to right, #fefce8, #fef3c7)' : '#f9fafb'
                            }}
                          >
                            <div className="flex items-start gap-3 mb-2">
                              {/* 回答者头像 */}
                              <div className="flex-shrink-0">
                                {isAnswerAdmin ? (
                                  <div 
                                    className="w-8 h-8 bg-blue-600 rounded-full shadow-md"
                                    style={{
                                      backgroundImage: 'url(/顾问.png)',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center'
                                    }}
                                  />
                                ) : isAnswerHonorAdvisor ? (
                                  <div 
                                    className="w-8 h-8 bg-yellow-400 rounded-full shadow-md"
                                    style={{
                                      backgroundImage: 'url(/皇冠.png)',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center'
                                    }}
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {answerFirstChar}
                                  </div>
                                )}
                              </div>
                              
                              {/* 回答内容 */}
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-medium ${
                                      isAnswerAdmin ? 'text-blue-900' : 
                                      isAnswerHonorAdvisor ? 'text-amber-900' : 
                                      'text-gray-900'
                                    }`}>
                                      {answer.author || '未知用户'}
                                    </span>
                                    {isAnswerAdmin && (
                                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                                        管理员
                                      </span>
                                    )}
                                    {isAnswerHonorAdvisor && (
                                      <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-semibold">
                                        荣誉顾问
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                                    {new Date(answer.created_at || answer.timestamp || '').toLocaleString()}
                                  </span>
                                </div>
                                <p className={
                                  isAnswerAdmin ? 'text-blue-900' : 
                                  isAnswerHonorAdvisor ? 'text-amber-900' : 
                                  'text-gray-700'
                                }>
                                  {answer.answer || answer.content}
                                </p>
                              </div>
                            </div>
                          </div>
                          )
                        })}
                      </div>

                      {/* 回答输入 */}
                      {answeringQuestion === question.id ? (
                        <div>
                          <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder={t.alumni_forum.qa.answer_placeholder}
                            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                            rows={2}
                          />
                          <div className="mt-2 space-x-2">
                            <button
                              onClick={() => handleAnswerQuestion(question.id)}
                              className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90"
                            >
                              {t.alumni_forum.qa.submit_answer}
                            </button>
                            <button
                              onClick={() => {
                                setAnsweringQuestion(null)
                                setNewAnswer('')
                              }}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                            >
                              {t.alumni_forum.qa.cancel}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAnsweringQuestion(question.id)}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          {t.alumni_forum.qa.answer}
                        </button>
                      )}
                    </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 荣誉顾问 */}
            {activeTab === 'advisor' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">{t.alumni_forum.honor_advisors.title}</h2>
                <p className="text-gray-600 mb-6">
                  {t.alumni_forum.honor_advisors.subtitle}
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">{t.alumni_forum.honor_advisors.features.title}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>{t.alumni_forum.honor_advisors.features.consultation}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>{t.alumni_forum.honor_advisors.features.sharing}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>{t.alumni_forum.honor_advisors.features.priority}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>{t.alumni_forum.honor_advisors.features.honor}</span>
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
                    {t.alumni_forum.honor_advisors.learn_more}
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
