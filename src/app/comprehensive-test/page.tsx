'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ComprehensiveTestPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    runComprehensiveTest()
  }, [])

  const runComprehensiveTest = async () => {
    const testResults: any = {
      timestamp: new Date().toISOString(),
      supabaseConfig: {
        url: 'https://xjeqpsicutiwkxjoqvls.supabase.co',
        hasKey: true
      }
    }

    try {
      // 1. 测试基本连接
      console.log('🔍 测试基本连接...')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, username, email, is_alumni, is_honor_advisor')
        .limit(5)
      
      testResults.basicConnection = {
        success: !usersError,
        error: usersError?.message,
        data: usersData,
        count: usersData?.length || 0
      }

      // 2. 测试留言表
      console.log('🔍 测试留言表...')
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      
      testResults.messages = {
        success: !messagesError,
        error: messagesError?.message,
        data: messagesData,
        count: messagesData?.length || 0
      }

      // 3. 测试问题表
      console.log('🔍 测试问题表...')
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      testResults.questions = {
        success: !questionsError,
        error: questionsError?.message,
        data: questionsData,
        count: questionsData?.length || 0
      }

      // 4. 测试用户名映射逻辑
      if (messagesData && messagesData.length > 0) {
        console.log('🔍 测试用户名映射逻辑...')
        const userIds = Array.from(new Set(messagesData.map(msg => msg.user_id).filter(Boolean)))
        
        if (userIds.length > 0) {
          const { data: userNamesData, error: userNamesError } = await supabase
            .from('users')
            .select('id, username, is_honor_advisor, is_alumni')
            .in('id', userIds)
          
          const nameMap: {[key: string]: string} = {}
          const avatarMap: {[key: string]: any} = {}
          
          if (userNamesData) {
            userNamesData.forEach(u => {
              if (u.id && u.username) {
                nameMap[u.id] = u.username
                avatarMap[u.id] = {
                  username: u.username,
                  is_honor_advisor: u.is_honor_advisor || false,
                  is_alumni: u.is_alumni || false
                }
              }
            })
          }

          testResults.userMapping = {
            success: !userNamesError,
            error: userNamesError?.message,
            userIds: userIds,
            userNames: userNamesData,
            nameMap: nameMap,
            avatarMap: avatarMap
          }
        }
      }

      // 5. 测试问答区逻辑
      if (questionsData && questionsData.length > 0) {
        console.log('🔍 测试问答区逻辑...')
        const questionsWithAnswers = await Promise.all(
          questionsData.map(async (question) => {
            const { data: answersData, error: answersError } = await supabase
              .from('answers')
              .select('*')
              .eq('question_id', question.id)
              .order('created_at', { ascending: true })

            return { 
              ...question, 
              answers: answersData || [],
              answersError: answersError?.message
            }
          })
        )

        testResults.qaLogic = {
          questionsWithAnswers: questionsWithAnswers,
          totalQuestions: questionsWithAnswers.length,
          totalAnswers: questionsWithAnswers.reduce((sum, q) => sum + q.answers.length, 0)
        }
      }

      // 6. 测试荣誉顾问表
      console.log('🔍 测试荣誉顾问表...')
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      
      testResults.advisors = {
        success: !advisorsError,
        error: advisorsError?.message,
        data: advisorsData,
        count: advisorsData?.length || 0
      }

    } catch (error: any) {
      testResults.generalError = error.message
      console.error('❌ 测试过程中发生错误:', error)
    }

    console.log('📊 完整测试结果:', testResults)
    setResults(testResults)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">进行全面数据库测试中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 全面数据库测试</h1>
          <p className="text-gray-600 mb-8">测试时间: {results.timestamp}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 基本连接测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🔗 基本连接测试</h2>
              <div className={`p-3 rounded ${results.basicConnection?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.basicConnection?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.basicConnection?.error || '无'}</p>
                <p><strong>用户数量:</strong> {results.basicConnection?.count}</p>
                {results.basicConnection?.data && (
                  <div className="mt-2">
                    <p><strong>用户数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(results.basicConnection.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 留言表测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💬 留言表测试</h2>
              <div className={`p-3 rounded ${results.messages?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.messages?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.messages?.error || '无'}</p>
                <p><strong>留言数量:</strong> {results.messages?.count}</p>
                {results.messages?.data && results.messages.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>留言数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(results.messages.data.slice(0, 3), null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 问题表测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">❓ 问题表测试</h2>
              <div className={`p-3 rounded ${results.questions?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.questions?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.questions?.error || '无'}</p>
                <p><strong>问题数量:</strong> {results.questions?.count}</p>
                {results.questions?.data && results.questions.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>问题数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(results.questions.data.slice(0, 2), null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 用户名映射测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👤 用户名映射测试</h2>
              {results.userMapping ? (
                <div className={`p-3 rounded ${results.userMapping?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p><strong>状态:</strong> {results.userMapping?.success ? '✅ 成功' : '❌ 失败'}</p>
                  <p><strong>错误:</strong> {results.userMapping?.error || '无'}</p>
                  <p><strong>用户ID列表:</strong> {JSON.stringify(results.userMapping.userIds)}</p>
                  <p><strong>用户名映射:</strong></p>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(results.userMapping.nameMap, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="p-3 rounded bg-yellow-50 text-yellow-800">
                  <p>⚠️ 没有留言数据，无法测试用户名映射</p>
                </div>
              )}
            </div>

            {/* 问答区逻辑测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💭 问答区逻辑测试</h2>
              {results.qaLogic ? (
                <div className="p-3 rounded bg-green-50 text-green-800">
                  <p><strong>状态:</strong> ✅ 成功</p>
                  <p><strong>问题总数:</strong> {results.qaLogic.totalQuestions}</p>
                  <p><strong>回答总数:</strong> {results.qaLogic.totalAnswers}</p>
                  {results.qaLogic.questionsWithAnswers.length > 0 && (
                    <div className="mt-2">
                      <p><strong>问答数据:</strong></p>
                      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                        {JSON.stringify(results.qaLogic.questionsWithAnswers.slice(0, 1), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded bg-yellow-50 text-yellow-800">
                  <p>⚠️ 没有问题数据，无法测试问答区逻辑</p>
                </div>
              )}
            </div>

            {/* 荣誉顾问测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👑 荣誉顾问测试</h2>
              <div className={`p-3 rounded ${results.advisors?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.advisors?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.advisors?.error || '无'}</p>
                <p><strong>已批准顾问数量:</strong> {results.advisors?.count}</p>
                {results.advisors?.data && results.advisors.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>顾问数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(results.advisors.data.slice(0, 2), null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 一般错误 */}
          {results.generalError && (
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">❌ 一般错误</h2>
              <div className="p-3 rounded bg-red-50 text-red-800">
                <p><strong>错误:</strong> {results.generalError}</p>
              </div>
            </div>
          )}

          {/* 完整结果 */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📊 完整测试结果</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
