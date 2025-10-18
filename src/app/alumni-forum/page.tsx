'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
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

  useEffect(() => {
    // 检查用户权限
    if (!user) {
      router.push('/auth/login')
      return
    }
    if (!user.isAlumni) {
      router.push('/')
      return
    }

    // 加载数据
    loadData()
  }, [user, router])

  const loadData = () => {
    // 从本地存储加载数据
    const savedMessages = JSON.parse(localStorage.getItem('smsmun_messages') || '[]')
    const savedQuestions = JSON.parse(localStorage.getItem('smsmun_questions') || '[]')
    const savedAdvisors = JSON.parse(localStorage.getItem('smsmun_honor_advisors') || '[]')
    
    setMessages(savedMessages)
    setQuestions(savedQuestions)
    setHonorAdvisors(savedAdvisors)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      contact: user.email || '未提供',
      content: newMessage,
      timestamp: new Date().toISOString(),
      author: user.username
    }

    const updatedMessages = [message, ...messages]
    setMessages(updatedMessages)
    localStorage.setItem('smsmun_messages', JSON.stringify(updatedMessages))
    setNewMessage('')
  }

  const handleAskQuestion = () => {
    if (!newQuestion.trim() || !user) return

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion,
      answers: [],
      timestamp: new Date().toISOString(),
      author: user.username
    }

    const updatedQuestions = [question, ...questions]
    setQuestions(updatedQuestions)
    localStorage.setItem('smsmun_questions', JSON.stringify(updatedQuestions))
    setNewQuestion('')
  }

  const handleAnswerQuestion = (questionId: string) => {
    if (!newAnswer.trim() || !user) return

    const answer: Answer = {
      id: Date.now().toString(),
      answer: newAnswer,
      timestamp: new Date().toISOString(),
      author: user.username
    }

    const updatedQuestions = questions.map(q => 
      q.id === questionId 
        ? { ...q, answers: [...q.answers, answer] }
        : q
    )
    setQuestions(updatedQuestions)
    localStorage.setItem('smsmun_questions', JSON.stringify(updatedQuestions))
    setNewAnswer('')
    setAnsweringQuestion(null)
  }

  const handleSubmitAdvisorApplication = () => {
    if (!advisorForm.name || !advisorForm.email || !advisorForm.phone || !advisorForm.message || !user) return

    const advisor: HonorAdvisor = {
      id: Date.now().toString(),
      name: advisorForm.name,
      email: advisorForm.email,
      phone: advisorForm.phone,
      graduationYear: user.graduationYear || '未知',
      message: advisorForm.message,
      timestamp: new Date().toISOString()
    }

    const updatedAdvisors = [advisor, ...honorAdvisors]
    setHonorAdvisors(updatedAdvisors)
    localStorage.setItem('smsmun_honor_advisors', JSON.stringify(updatedAdvisors))
    setAdvisorForm({ name: '', email: '', phone: '', message: '' })
    alert('申请提交成功！我们会尽快联系您。')
  }

  if (!user || !user.isAlumni) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">访问受限</h1>
            <p className="text-gray-600 mb-6">此页面仅限深中模联校友访问</p>
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
              <p className="text-gray-600">深中模联校友专属交流平台</p>
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
                荣誉指导
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
                  {messages.map((message) => (
                    <div key={message.id} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">{message.author}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  ))}
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
                        <h3 className="font-medium text-gray-900">{question.question}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(question.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">提问者：{question.author}</p>
                      
                      {/* 回答列表 */}
                      <div className="space-y-3 mb-4">
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

            {/* 荣誉指导申请 */}
            {activeTab === 'advisor' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">荣誉指导申请</h2>
                <p className="text-gray-600 mb-6">
                  成为今年的荣誉指导，参与指导成就PPRDMUN等会议的工作。成为荣誉指导可获得年度周边一份。
                </p>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmitAdvisorApplication(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      value={advisorForm.name}
                      onChange={(e) => setAdvisorForm({...advisorForm, name: e.target.value})}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input
                      type="email"
                      value={advisorForm.email}
                      onChange={(e) => setAdvisorForm({...advisorForm, email: e.target.value})}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="请输入您的邮箱"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                    <input
                      type="tel"
                      value={advisorForm.phone}
                      onChange={(e) => setAdvisorForm({...advisorForm, phone: e.target.value})}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="请输入您的电话"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">申请理由</label>
                    <textarea
                      value={advisorForm.message}
                      onChange={(e) => setAdvisorForm({...advisorForm, message: e.target.value})}
                      required
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="请简述您希望成为荣誉指导的原因和能够提供的帮助..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    提交申请
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
