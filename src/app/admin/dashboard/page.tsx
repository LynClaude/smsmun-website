'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageTransition from '@/components/PageTransition'

interface Message {
  id: string
  contact: string
  content: string
  timestamp: string
  author: string
}

interface Question {
  id: string
  question: string
  answers: Answer[]
  timestamp: string
  author: string
}

interface Answer {
  id: string
  answer: string
  timestamp: string
  author: string
}

interface HonorAdvisor {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  wechat: string
  graduation_year: string
  position: string
  achievements: string
  motivation: string
  availability: string
  additional_info: string
  status: string
  created_at: string
}

interface User {
  id: string
  username: string
  email?: string
  is_alumni: boolean
  graduation_year?: string
  is_admin: boolean
  join_date: string
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'users' | 'messages' | 'qa' | 'advisors'>('users')
  
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [honorAdvisors, setHonorAdvisors] = useState<HonorAdvisor[]>([])

  useEffect(() => {
    // 检查管理员权限
    if (!user || !user.is_admin) {
      router.push('/admin/login')
      return
    }

    loadData()
  }, [user, router])

  // 删除留言功能
  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('确定要删除这条留言吗？此操作不可撤销。')) {
      return
    }

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)

      if (error) {
        console.error('Error deleting message:', error.message)
        alert('删除留言失败：' + error.message)
      } else {
        // 更新本地状态
        setMessages(messages.filter(msg => msg.id !== messageId))
        alert('留言已删除')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('删除留言失败，请重试')
    }
  }

  // 删除问答功能
  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('确定要删除这个问题吗？此操作不可撤销。')) {
      return
    }

    try {
      // 先删除相关的回答
      const { error: answersError } = await supabase
        .from('answers')
        .delete()
        .eq('question_id', questionId)

      if (answersError) {
        console.error('Error deleting answers:', answersError.message)
      }

      // 再删除问题
      const { error: questionError } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId)

      if (questionError) {
        console.error('Error deleting question:', questionError.message)
        alert('删除问题失败：' + questionError.message)
      } else {
        // 更新本地状态
        setQuestions(questions.filter(q => q.id !== questionId))
        alert('问题已删除')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('删除问题失败，请重试')
    }
  }

  // 解聘荣誉顾问功能
  const handleDismissHonorAdvisor = async (advisorId: string, advisorName: string) => {
    if (!confirm(`确定要解聘荣誉顾问 "${advisorName}" 吗？此操作不可撤销。`)) {
      return
    }

    try {
      // 更新荣誉顾问状态为已解聘
      const { error: advisorError } = await supabase
        .from('honor_advisors')
        .update({ 
          status: 'dismissed',
          resignation_reason: '管理员解聘',
          updated_at: new Date().toISOString()
        })
        .eq('id', advisorId)

      if (advisorError) {
        console.error('Error dismissing honor advisor:', advisorError.message)
        alert('解聘荣誉顾问失败：' + advisorError.message)
        return
      }

      // 更新用户表中的荣誉顾问状态
      const { error: userError } = await supabase
        .from('users')
        .update({ 
          is_honor_advisor: false,
          honor_advisor_approved_at: null
        })
        .eq('id', advisorId)

      if (userError) {
        console.error('Error updating user status:', userError.message)
        alert('更新用户状态失败：' + userError.message)
        return
      }

      // 更新本地状态
      setHonorAdvisors(honorAdvisors.filter(advisor => advisor.id !== advisorId))
      alert('荣誉顾问已解聘')
      
      // 重新加载数据以确保同步
      loadData()
    } catch (error) {
      console.error('Error dismissing honor advisor:', error)
      alert('解聘荣誉顾问失败，请重试')
    }
  }

  const loadData = async () => {
    try {
      // 从 Supabase 加载用户数据
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('join_date', { ascending: false })

      if (usersError) {
        console.error('Error loading users:', usersError.message)
      } else {
        // 移除密码字段
        const usersWithoutPassword = (usersData || []).map((u: any) => {
          const { password, ...userWithoutPassword } = u
          return userWithoutPassword
        })
        setUsers(usersWithoutPassword)
      }

      // 创建用户ID到用户名的映射
      const userMap = new Map<string, string>()
      if (usersData) {
        usersData.forEach((user: any) => {
          userMap.set(user.id, user.username)
        })
      }

      // 从 Supabase 加载留言数据
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: false })

      if (messagesError) {
        console.error('Error loading messages:', messagesError.message)
      } else {
        // 为留言添加用户名
        const messagesWithNames = (messagesData || []).map((message: any) => ({
          ...message,
          author: userMap.get(message.user_id) || '未知用户'
        }))
        setMessages(messagesWithNames)
      }

      // 从 Supabase 加载问题数据
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('timestamp', { ascending: false })

      if (questionsError) {
        console.error('Error loading questions:', questionsError.message)
      } else {
        // 为每个问题加载对应的真实回答
        const questionsWithAnswers = await Promise.all(
          (questionsData || []).map(async (question: any) => {
            try {
              const { data: answersData, error: answersError } = await supabase
                .from('answers')
                .select('*')
                .eq('question_id', question.id)
                .order('created_at', { ascending: true })

              if (answersError) {
                console.error('❌ 回答查询失败:', answersError.message)
                return { 
                  ...question, 
                  answers: [],
                  author: userMap.get(question.user_id) || '未知用户',
                  timestamp: question.created_at || question.timestamp
                }
              }

              // 为回答添加用户名
              const answersWithNames = (answersData || []).map((answer: any) => ({
                ...answer,
                author: userMap.get(answer.user_id) || '未知用户',
                answer: answer.content || answer.answer,
                timestamp: answer.created_at || answer.timestamp
              }))

              return { 
                ...question, 
                answers: answersWithNames,
                author: userMap.get(question.user_id) || '未知用户',
                question: question.content || question.question,
                timestamp: question.created_at || question.timestamp
              }
            } catch (error) {
              console.error('❌ 处理问题时出错:', error)
              return { 
                ...question, 
                answers: [],
                author: userMap.get(question.user_id) || '未知用户',
                question: question.content || question.question,
                timestamp: question.created_at || question.timestamp
              }
            }
          })
        )
        setQuestions(questionsWithAnswers)
      }

      // 从 Supabase 加载荣誉顾问申请数据
      console.log('Loading honor advisors...')
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .order('created_at', { ascending: false })

      if (advisorsError) {
        console.error('Error loading honor advisors:', advisorsError.message)
        console.error('Full error:', advisorsError)
      } else {
        console.log('Loaded honor advisors:', advisorsData)
        setHonorAdvisors(advisorsData || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleApproveAdvisor = async (advisorId: string, userId: string) => {
    try {
      // 更新申请状态为已批准
      const { error: updateError } = await supabase
        .from('honor_advisors')
        .update({ status: 'approved' })
        .eq('id', advisorId)

      if (updateError) {
        console.error('Error approving advisor:', updateError.message)
        alert('批准申请失败，请重试')
        return
      }

      // 更新用户表中的荣誉顾问状态
      const { error: userError } = await supabase
        .from('users')
        .update({ 
          is_honor_advisor: true,
          honor_advisor_approved_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user status:', userError.message)
        alert('更新用户状态失败，请重试')
        return
      }

      // 重新加载数据
      loadData()
      alert('申请已批准！')
    } catch (error) {
      console.error('Error approving advisor:', error)
      alert('批准申请失败，请重试')
    }
  }

  const handleRejectAdvisor = async (advisorId: string) => {
    try {
      const { error } = await supabase
        .from('honor_advisors')
        .update({ status: 'rejected' })
        .eq('id', advisorId)

      if (error) {
        console.error('Error rejecting advisor:', error.message)
        alert('拒绝申请失败，请重试')
        return
      }

      // 重新加载数据
      loadData()
      alert('申请已拒绝！')
    } catch (error) {
      console.error('Error rejecting advisor:', error)
      alert('拒绝申请失败，请重试')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  if (!user || !user.is_admin) {
    return null
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* 头部 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-red-600 mb-2">管理员面板</h1>
                  <p className="text-gray-600">深中模联网站管理系统</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">注册用户</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">留言数量</p>
                    <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">问题数量</p>
                    <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">荣誉顾问申请</p>
                    <p className="text-2xl font-bold text-gray-900">{honorAdvisors.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 标签切换 */}
            <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                用户管理
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                留言管理
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'qa'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                问答管理
              </button>
              <button
                onClick={() => setActiveTab('advisors')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'advisors'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                荣誉顾问申请
              </button>
            </div>

            {/* 用户管理 */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">用户管理</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">是否校友</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">毕业年份</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || '未提供'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.is_alumni ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.is_alumni ? '是' : '否'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.graduation_year || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.join_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 留言管理 */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">留言管理</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">{message.author}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{message.content}</p>
                      <p className="text-sm text-gray-500">联系方式：{message.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 问答管理 */}
            {activeTab === 'qa' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">问答管理</h2>
                <div className="space-y-6">
                  {questions.map((question) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-900">{question.question}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {new Date(question.timestamp).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">提问者：{question.author}</p>
                      
                      <div className="space-y-3">
                        {question.answers.map((answer) => (
                          <div key={answer.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-900">{answer.author}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(answer.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{answer.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 荣誉顾问申请管理 */}
            {activeTab === 'advisors' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">荣誉顾问申请管理</h2>
                
                {/* 调试信息 */}
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    当前加载的申请数量: {honorAdvisors.length}
                  </p>
                  {honorAdvisors.length === 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      没有找到荣誉顾问申请数据。请检查数据库连接和表结构。
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {honorAdvisors.map((advisor) => (
                    <div key={advisor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{advisor.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            advisor.status === 'approved' ? 'bg-green-100 text-green-800' :
                            advisor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {advisor.status === 'approved' ? '已批准' :
                             advisor.status === 'rejected' ? '已拒绝' : '待审核'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(advisor.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600"><strong>邮箱：</strong>{advisor.email}</p>
                          <p className="text-sm text-gray-600"><strong>电话：</strong>{advisor.phone}</p>
                          <p className="text-sm text-gray-600"><strong>微信：</strong>{advisor.wechat || '未提供'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600"><strong>毕业年份：</strong>{advisor.graduation_year}</p>
                          <p className="text-sm text-gray-600"><strong>在协会职务：</strong>{advisor.position}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-gray-700 mb-1">主要成就：</p>
                          <p className="text-gray-700">{advisor.achievements}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-gray-700 mb-1">申请动机：</p>
                          <p className="text-gray-700">{advisor.motivation}</p>
                        </div>

                        {advisor.availability && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-gray-700 mb-1">可参与时间：</p>
                            <p className="text-gray-700">{advisor.availability}</p>
                          </div>
                        )}

                        {advisor.additional_info && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-gray-700 mb-1">其他信息：</p>
                            <p className="text-gray-700">{advisor.additional_info}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        {advisor.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveAdvisor(advisor.id, advisor.user_id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              批准申请
                            </button>
                            <button
                              onClick={() => handleRejectAdvisor(advisor.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              拒绝申请
                            </button>
                          </>
                        )}
                        
                        {advisor.status === 'approved' && (
                          <button
                            onClick={() => handleDismissHonorAdvisor(advisor.id, advisor.name)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            解聘荣誉顾问
                          </button>
                        )}
                        
                        {advisor.status === 'rejected' && (
                          <div className="text-sm text-gray-500">
                            申请已被拒绝
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
