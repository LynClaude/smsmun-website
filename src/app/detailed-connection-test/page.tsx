'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DetailedConnectionTest() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    runDetailedTest()
  }, [])

  const runDetailedTest = async () => {
    const testResults: any = {
      timestamp: new Date().toISOString(),
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    }

    try {
      console.log('🔍 开始详细连接测试...')

      // 测试1: 基本连接
      console.log('📊 测试1: 基本连接')
      const { data: basicData, error: basicError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true })
      
      testResults.basicConnection = {
        success: !basicError,
        error: basicError?.message,
        data: basicData
      }

      // 测试2: 用户表
      console.log('👥 测试2: 用户表')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(5)
      
      testResults.users = {
        success: !usersError,
        error: usersError?.message,
        count: usersData?.length || 0,
        data: usersData
      }

      // 测试3: 留言表
      console.log('💬 测试3: 留言表')
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .limit(5)
      
      testResults.messages = {
        success: !messagesError,
        error: messagesError?.message,
        count: messagesData?.length || 0,
        data: messagesData
      }

      // 测试4: 问题表
      console.log('❓ 测试4: 问题表')
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .limit(5)
      
      testResults.questions = {
        success: !questionsError,
        error: questionsError?.message,
        count: questionsData?.length || 0,
        data: questionsData
      }

      // 测试5: 回答表
      console.log('💭 测试5: 回答表')
      const { data: answersData, error: answersError } = await supabase
        .from('answers')
        .select('*')
        .limit(5)
      
      testResults.answers = {
        success: !answersError,
        error: answersError?.message,
        count: answersData?.length || 0,
        data: answersData
      }

      // 测试6: 荣誉顾问表
      console.log('👑 测试6: 荣誉顾问表')
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .limit(5)
      
      testResults.advisors = {
        success: !advisorsError,
        error: advisorsError?.message,
        count: advisorsData?.length || 0,
        data: advisorsData
      }

      // 测试7: 用户名映射测试
      if (messagesData && messagesData.length > 0) {
        console.log('🔗 测试7: 用户名映射')
        const userIds = Array.from(new Set(messagesData.map(msg => msg.user_id)))
        const { data: userNamesData, error: userNamesError } = await supabase
          .from('users')
          .select('id, username')
          .in('id', userIds)
        
        testResults.userMapping = {
          success: !userNamesError,
          error: userNamesError?.message,
          userIds: userIds,
          userNames: userNamesData,
          mapping: userNamesData?.reduce((acc: any, user: any) => {
            acc[user.id] = user.username
            return acc
          }, {}) || {}
        }
      }

    } catch (error: any) {
      testResults.generalError = error.message
      console.error('❌ 测试过程中发生错误:', error)
    }

    console.log('📊 详细测试结果:', testResults)
    setResults(testResults)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">运行详细连接测试中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 详细Supabase连接测试</h1>
          
          {/* 配置信息 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">🔧 配置信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p><strong>Supabase URL:</strong> {results.config?.url}</p>
                <p><strong>API Key:</strong> {results.config?.hasKey ? '✅ 已设置' : '❌ 未设置'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p><strong>测试时间:</strong> {results.timestamp}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 基本连接 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🔗 基本连接</h2>
              <div className={`p-3 rounded ${results.basicConnection?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.basicConnection?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.basicConnection?.error || '无'}</p>
              </div>
            </div>

            {/* 用户表 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👥 用户表</h2>
              <div className={`p-3 rounded ${results.users?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.users?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.users?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.users?.count}</p>
                {results.users?.data && results.users.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>用户列表:</strong></p>
                    {results.users.data.map((user: any) => (
                      <div key={user.id} className="text-xs bg-white p-2 rounded mt-1">
                        {user.username} ({user.email})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 留言表 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💬 留言表</h2>
              <div className={`p-3 rounded ${results.messages?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.messages?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.messages?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.messages?.count}</p>
                {results.messages?.data && results.messages.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>留言列表:</strong></p>
                    {results.messages.data.map((msg: any) => (
                      <div key={msg.id} className="text-xs bg-white p-2 rounded mt-1">
                        {msg.content.substring(0, 50)}...
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 问题表 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">❓ 问题表</h2>
              <div className={`p-3 rounded ${results.questions?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.questions?.success ? '✅ 成功' : '❌ 失败'}</p>
                <p><strong>错误:</strong> {results.questions?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.questions?.count}</p>
                {results.questions?.data && results.questions.data.length > 0 && (
                  <div className="mt-2">
                    <p><strong>问题列表:</strong></p>
                    {results.questions.data.map((q: any) => (
                      <div key={q.id} className="text-xs bg-white p-2 rounded mt-1">
                        {q.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 用户名映射 */}
            {results.userMapping && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">🔗 用户名映射</h2>
                <div className={`p-3 rounded ${results.userMapping?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p><strong>状态:</strong> {results.userMapping?.success ? '✅ 成功' : '❌ 失败'}</p>
                  <p><strong>错误:</strong> {results.userMapping?.error || '无'}</p>
                  <p><strong>用户ID列表:</strong> {JSON.stringify(results.userMapping.userIds)}</p>
                  <p><strong>用户名映射:</strong></p>
                  <pre className="text-xs bg-white p-2 rounded mt-1">
                    {JSON.stringify(results.userMapping.mapping, null, 2)}
                  </pre>
                </div>
              </div>
            )}
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
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📊 完整测试结果</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={runDetailedTest}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              重新运行测试
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




