'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  content: string
  created_at: string
}

interface Question {
  id: string
  title: string
  content: string
  created_at: string
  answers: Answer[]
}

interface Answer {
  id: string
  content: string
  created_at: string
  user_id: string
}

interface HonorAdvisor {
  id: string
  motivation: string
  experience: string
  created_at: string
  status: string
}

interface HonorAdvisorMember {
  id: string
  name: string
  email: string
  graduation_year: string
  position: string
  created_at: string
}

interface Feedback {
  id: string
  content: string
  created_at: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'messages' | 'questions' | 'honor' | 'feedback'>('feedback')
  const [messages, setMessages] = useState<Message[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [honorAdvisors, setHonorAdvisors] = useState<HonorAdvisor[]>([])
  const [honorAdvisorMembers, setHonorAdvisorMembers] = useState<HonorAdvisorMember[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [feedbackContent, setFeedbackContent] = useState('')
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  useEffect(() => {
    if (user) {
      loadUserData()
      // 根据用户身份设置默认标签页
      if (user.is_alumni) {
        setActiveTab('messages')
      } else {
        setActiveTab('feedback')
      }
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return
    
    console.log('Loading data for user:', user.id, user.email)
    setLoading(true)
    try {
      // 加载用户消息
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (messagesError) {
        console.error('Error loading messages:', messagesError.message)
      } else {
        console.log('Loaded messages:', messagesData)
      }

      // 加载用户问题
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (questionsError) {
        console.error('Error loading questions:', questionsError.message)
      }

      // 为每个问题加载对应的回答
      let questionsWithAnswers = []
      if (questionsData) {
        questionsWithAnswers = await Promise.all(
          questionsData.map(async (question) => {
            const { data: answersData, error: answersError } = await supabase
              .from('answers')
              .select('*')
              .eq('question_id', question.id)
              .order('created_at', { ascending: true })

            if (answersError) {
              console.error('Error loading answers:', answersError.message)
              return { ...question, answers: [] }
            }

            return { ...question, answers: answersData || [] }
          })
        )
      }

      // 加载荣誉指导申请
      const { data: honorData } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (honorData) {
        setHonorAdvisors(honorData)
      }

      // 加载荣誉顾问委员会成员（所有已批准的荣誉顾问）
      const { data: membersData } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (membersData) {
        setHonorAdvisorMembers(membersData)
      }

      // 加载反馈数据（访客和校友都可以提交反馈）
      const { data: feedbackData } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setFeedbacks(feedbackData || [])

      setMessages(messagesData || [])
      setQuestions(questionsWithAnswers || [])
      setHonorAdvisors(honorData || [])
    } catch (error) {
      console.error('加载用户数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!user || !feedbackContent.trim()) return

    setSubmittingFeedback(true)
    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert([
          {
            user_id: user.id,
            content: feedbackContent,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('提交反馈失败:', error)
        alert('提交反馈失败，请重试')
      } else {
        setFeedbackContent('')
        alert('反馈提交成功！感谢您的建议。')
        loadUserData() // 重新加载数据
      }
    } catch (error) {
      console.error('提交反馈失败:', error)
      alert('提交反馈失败，请重试')
    } finally {
      setSubmittingFeedback(false)
    }
  }


  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* 用户信息卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {user?.is_honor_advisor ? (
                  <div className="w-16 h-16">
                    <Image
                      src="/皇冠.png"
                      alt="荣誉顾问"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {user?.username}
                    {user?.is_alumni && (
                      <Image
                        src="/favicon.ico"
                        alt="深中模联成员"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    )}
                  </h1>
                  <p className="text-gray-600">
                    {user?.is_admin ? '管理员' : 
                     user?.is_honor_advisor ? '深中模联荣誉顾问' :
                     user?.is_alumni ? '深中模联校友' : 
                     '访客用户'}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              {/* 荣誉顾问身份标识 - 至尊设计 */}
              {user?.is_honor_advisor && (
                <div className="ml-8 p-6 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 rounded-xl shadow-xl border-2 border-amber-300 min-w-96 relative overflow-hidden">
                  {/* 装饰性背景图案 */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 w-8 h-8 border-2 border-amber-600 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-amber-600 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-4 h-4 border-2 border-amber-600 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-4">
                        <Image
                          src="/皇冠.png"
                          alt="皇冠"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-800">荣誉顾问委员会成员</h3>
                        <p className="text-amber-700 text-sm">恭喜！您已成为深中模联荣誉顾问委员会正式成员</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link
                        href="/alumni-forum/honor-advisors/committee"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-700 text-white rounded-lg hover:from-amber-700 hover:to-yellow-800 transition-all font-semibold shadow-md text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        进入委员会
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm('确定要退出荣誉顾问委员会吗？')) {
                            alert('退出委员会功能正在开发中...')
                          }
                        }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-md text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        退出委员会
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>


          {/* 标签切换 */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="flex border-b border-gray-200">
              {user?.is_alumni ? (
                // 校友的标签页
                <>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === 'messages'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    我的留言 ({messages.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('questions')}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === 'questions'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    我的问答 ({questions.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('honor')}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === 'honor'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    荣誉顾问 ({honorAdvisors.length})
                  </button>
                </>
              ) : (
                // 访客的标签页
                <>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === 'feedback'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    意见反馈 ({feedbacks.length})
                  </button>
                </>
              )}
            </div>

            <div className="p-6">
              {user?.is_alumni && activeTab === 'messages' && (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">暂无留言</p>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-900">{message.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(message.created_at).toLocaleString('zh-CN')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {user?.is_alumni && activeTab === 'questions' && (
                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">暂无问答</p>
                  ) : (
                    questions.map((question) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{question.title}</h3>
                        <p className="text-gray-700 mb-3">{question.content}</p>
                        <div className="space-y-2">
                          {question.answers.map((answer) => (
                            <div key={answer.id} className="bg-gray-50 rounded-lg p-3 ml-4">
                              <p className="text-gray-800">{answer.content}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(answer.created_at).toLocaleString('zh-CN')}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(question.created_at).toLocaleString('zh-CN')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'honor' && user?.is_alumni && (
                <div className="space-y-6">
                  {/* 我的荣誉顾问申请 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">我的荣誉顾问申请</h3>
                    {honorAdvisors.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">暂无荣誉顾问申请</p>
                    ) : (
                      honorAdvisors.map((advisor) => (
                        <div key={advisor.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              advisor.status === 'approved' ? 'bg-green-100 text-green-800' :
                              advisor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {advisor.status === 'approved' ? '已通过' :
                               advisor.status === 'rejected' ? '已拒绝' : '审核中'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(advisor.created_at).toLocaleString('zh-CN')}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">申请动机</h4>
                          <p className="text-gray-700 mb-3">{advisor.motivation}</p>
                          <h4 className="font-semibold text-gray-900 mb-2">相关经验</h4>
                          <p className="text-gray-700">{advisor.experience}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* 荣誉顾问委员会成员 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">荣誉顾问委员会成员</h3>
                    
                    {honorAdvisorMembers.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">暂无委员会成员</p>
                        <Link
                          href="/alumni-forum/honor-advisors"
                          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          查看荣誉顾问委员会
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {honorAdvisorMembers.slice(0, 4).map((member) => (
                            <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                  <p className="text-sm text-gray-600">{member.graduation_year}年毕业</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">邮箱：</span>{member.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">在协会职务：</span>{member.position}
                                </p>
                                <p className="text-xs text-gray-500">
                                  加入时间：{new Date(member.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {honorAdvisorMembers.length > 4 && (
                          <div className="text-center">
                            <Link
                              href="/alumni-forum/honor-advisors/committee"
                              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                            >
                              查看更多成员 ({honorAdvisorMembers.length - 4} 位)
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  {/* 提交反馈表单 */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {user?.is_alumni ? '提交意见反馈' : '提交反馈'}
                    </h3>
                    <textarea
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder={user?.is_alumni ? "请告诉我们您的建议或意见..." : "请告诉我们您对网站的建议或意见..."}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary h-24 resize-none"
                    />
                    <button
                      onClick={handleSubmitFeedback}
                      disabled={!feedbackContent.trim() || submittingFeedback}
                      className="mt-3 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {submittingFeedback ? '提交中...' : '提交反馈'}
                    </button>
                  </div>

                  {/* 历史反馈 */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">历史反馈</h3>
                    {feedbacks.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">暂无反馈记录</p>
                    ) : (
                      feedbacks.map((feedback) => (
                        <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-900">{feedback.content}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(feedback.created_at).toLocaleString('zh-CN')}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </PageTransition>
  )
}
