'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DatabaseTestPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testDatabase()
  }, [])

  const testDatabase = async () => {
    const testResults: any = {}

    try {
      // 1. 测试基本连接
      console.log('测试基本连接...')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, username, email')
        .limit(3)
      
      testResults.users = {
        success: !usersError,
        error: usersError?.message,
        data: usersData,
        count: usersData?.length || 0
      }

      // 2. 测试留言表
      console.log('测试留言表...')
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .limit(5)
      
      testResults.messages = {
        success: !messagesError,
        error: messagesError?.message,
        data: messagesData,
        count: messagesData?.length || 0
      }

      // 3. 测试问题表
      console.log('测试问题表...')
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .limit(3)
      
      testResults.questions = {
        success: !questionsError,
        error: questionsError?.message,
        data: questionsData,
        count: questionsData?.length || 0
      }

      // 4. 测试荣誉顾问表
      console.log('测试荣誉顾问表...')
      const { data: advisorsData, error: advisorsError } = await supabase
        .from('honor_advisors')
        .select('*')
        .limit(3)
      
      testResults.advisors = {
        success: !advisorsError,
        error: advisorsError?.message,
        data: advisorsData,
        count: advisorsData?.length || 0
      }

      // 5. 测试用户名映射
      if (messagesData && messagesData.length > 0) {
        console.log('测试用户名映射...')
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
    }

    setResults(testResults)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">测试数据库连接中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">数据库连接测试</h1>
          
          <div className="space-y-6">
            {/* 用户表测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">用户表测试</h2>
              <div className={`p-3 rounded ${results.users?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.users?.success ? '成功' : '失败'}</p>
                <p><strong>错误:</strong> {results.users?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.users?.count}</p>
                {results.users?.data && (
                  <div className="mt-2">
                    <p><strong>数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(results.users.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 留言表测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">留言表测试</h2>
              <div className={`p-3 rounded ${results.messages?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.messages?.success ? '成功' : '失败'}</p>
                <p><strong>错误:</strong> {results.messages?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.messages?.count}</p>
                {results.messages?.data && (
                  <div className="mt-2">
                    <p><strong>数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(results.messages.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 问题表测试 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">问题表测试</h2>
              <div className={`p-3 rounded ${results.questions?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p><strong>状态:</strong> {results.questions?.success ? '成功' : '失败'}</p>
                <p><strong>错误:</strong> {results.questions?.error || '无'}</p>
                <p><strong>数据量:</strong> {results.questions?.count}</p>
                {results.questions?.data && (
                  <div className="mt-2">
                    <p><strong>数据:</strong></p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(results.questions.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* 用户名映射测试 */}
            {results.userMapping && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">用户名映射测试</h2>
                <div className={`p-3 rounded ${results.userMapping?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p><strong>状态:</strong> {results.userMapping?.success ? '成功' : '失败'}</p>
                  <p><strong>错误:</strong> {results.userMapping?.error || '无'}</p>
                  <p><strong>用户ID列表:</strong> {JSON.stringify(results.userMapping.userIds)}</p>
                  <p><strong>用户名映射:</strong></p>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(results.userMapping.mapping, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* 一般错误 */}
            {results.generalError && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">一般错误</h2>
                <div className="p-3 rounded bg-red-50 text-red-800">
                  <p><strong>错误:</strong> {results.generalError}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

