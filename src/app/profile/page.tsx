'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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

interface Feedback {
  id: string
  content: string
  created_at: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'messages' | 'questions' | 'honor' | 'feedback'>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [honorAdvisors, setHonorAdvisors] = useState<HonorAdvisor[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [feedbackContent, setFeedbackContent] = useState('')
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      // 加载用户消息
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // 加载用户问题
      const { data: questionsData } = await supabase
        .from('questions')
        .select(`
          *,
          answers (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // 加载荣誉指导申请
      const { data: honorData } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // 如果是访客，加载反馈
      if (!user.is_alumni) {
        const { data: feedbackData } = await supabase
          .from('feedbacks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setFeedbacks(feedbackData || [])
      }

      setMessages(messagesData || [])
      setQuestions(questionsData || [])
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
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
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
                  {user?.is_admin ? '管理员' : user?.is_alumni ? '深中模联校友' : '访客用户'}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </motion.div>

          {/* 标签切换 */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="flex border-b border-gray-200">
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
              {user?.is_alumni && (
                <button
                  onClick={() => setActiveTab('honor')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    activeTab === 'honor'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  荣誉指导 ({honorAdvisors.length})
                </button>
              )}
              {!user?.is_alumni && (
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    activeTab === 'feedback'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  我的反馈 ({feedbacks.length})
                </button>
              )}
            </div>

            <div className="p-6">
              {activeTab === 'messages' && (
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

              {activeTab === 'questions' && (
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
                <div className="space-y-4">
                  {honorAdvisors.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">暂无荣誉指导申请</p>
                  ) : (
                    honorAdvisors.map((advisor) => (
                      <div key={advisor.id} className="border border-gray-200 rounded-lg p-4">
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
                        <h3 className="font-semibold text-gray-900 mb-2">申请动机</h3>
                        <p className="text-gray-700 mb-3">{advisor.motivation}</p>
                        <h3 className="font-semibold text-gray-900 mb-2">相关经验</h3>
                        <p className="text-gray-700">{advisor.experience}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'feedback' && !user?.is_alumni && (
                <div className="space-y-6">
                  {/* 提交反馈表单 */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">提交反馈</h3>
                    <textarea
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder="请告诉我们您的建议或意见..."
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
