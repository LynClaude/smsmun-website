'use client'

import { useState, useEffect } from 'react'

export default function BrowserTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testInBrowser()
  }, [])

  const testInBrowser = async () => {
    try {
      console.log('🌐 在浏览器中测试Supabase连接...')
      
      // 直接使用Supabase客户端
      const { createClient } = await import('@supabase/supabase-js')
      
      const supabaseUrl = 'https://xjeqpsicutiwkxjoqvls.supabase.co'
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZXFwc2ljdXRpd2t4am9xdmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzNjAsImV4cCI6MjA3NjI5ODM2MH0.h1qlkDGz9twJjKxR8ov8v5Hknm_kASyIhsph-aAIAY4'
      
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      console.log('🔧 创建Supabase客户端成功')
      
      // 测试1: 基本连接
      console.log('📊 测试1: 基本连接')
      const { data: basicData, error: basicError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true })
      
      // 测试2: 获取用户数据
      console.log('👥 测试2: 获取用户数据')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(3)
      
      // 测试3: 获取留言数据
      console.log('💬 测试3: 获取留言数据')
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .limit(3)
      
      // 测试4: 用户名映射
      let userMapping = {}
      if (messagesData && messagesData.length > 0) {
        console.log('🔗 测试4: 用户名映射')
        const userIds = Array.from(new Set(messagesData.map(msg => msg.user_id)))
        const { data: userNamesData, error: userNamesError } = await supabase
          .from('users')
          .select('id, username')
          .in('id', userIds)
        
        if (userNamesData) {
          userMapping = userNamesData.reduce((acc: any, user: any) => {
            acc[user.id] = user.username
            return acc
          }, {})
        }
      }

      const testResult = {
        timestamp: new Date().toISOString(),
        config: {
          url: supabaseUrl,
          hasKey: !!supabaseKey
        },
        basicConnection: {
          success: !basicError,
          error: basicError?.message,
          data: basicData
        },
        users: {
          success: !usersError,
          error: usersError?.message,
          count: usersData?.length || 0,
          data: usersData
        },
        messages: {
          success: !messagesError,
          error: messagesError?.message,
          count: messagesData?.length || 0,
          data: messagesData
        },
        userMapping: userMapping
      }

      console.log('📊 浏览器测试结果:', testResult)
      setResult(testResult)

    } catch (error: any) {
      console.error('❌ 浏览器测试失败:', error)
      setResult({
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">在浏览器中测试Supabase连接...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🌐 浏览器Supabase测试</h1>
          
          {result?.error ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-red-600">❌ 测试失败</h2>
              <div className="p-4 bg-red-50 text-red-800 rounded">
                <p><strong>错误:</strong> {result.error}</p>
                <p><strong>时间:</strong> {result.timestamp}</p>
                {result.stack && (
                  <div className="mt-4">
                    <p><strong>堆栈跟踪:</strong></p>
                    <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                      {result.stack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* 配置信息 */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">🔧 配置信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p><strong>Supabase URL:</strong> {result?.config?.url}</p>
                    <p><strong>API Key:</strong> {result?.config?.hasKey ? '✅ 已设置' : '❌ 未设置'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p><strong>测试时间:</strong> {result?.timestamp}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 基本连接 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">🔗 基本连接</h2>
                  <div className={`p-3 rounded ${result?.basicConnection?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p><strong>状态:</strong> {result?.basicConnection?.success ? '✅ 成功' : '❌ 失败'}</p>
                    <p><strong>错误:</strong> {result?.basicConnection?.error || '无'}</p>
                  </div>
                </div>

                {/* 用户数据 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">👥 用户数据</h2>
                  <div className={`p-3 rounded ${result?.users?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p><strong>状态:</strong> {result?.users?.success ? '✅ 成功' : '❌ 失败'}</p>
                    <p><strong>错误:</strong> {result?.users?.error || '无'}</p>
                    <p><strong>数据量:</strong> {result?.users?.count}</p>
                    {result?.users?.data && result.users.data.length > 0 && (
                      <div className="mt-2">
                        <p><strong>用户列表:</strong></p>
                        {result.users.data.map((user: any) => (
                          <div key={user.id} className="text-xs bg-white p-2 rounded mt-1">
                            <strong>{user.username}</strong> ({user.email})
                            <br />
                            <span className="text-gray-600">
                              校友: {user.is_alumni ? '是' : '否'} | 
                              荣誉顾问: {user.is_honor_advisor ? '是' : '否'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 留言数据 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">💬 留言数据</h2>
                  <div className={`p-3 rounded ${result?.messages?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p><strong>状态:</strong> {result?.messages?.success ? '✅ 成功' : '❌ 失败'}</p>
                    <p><strong>错误:</strong> {result?.messages?.error || '无'}</p>
                    <p><strong>数据量:</strong> {result?.messages?.count}</p>
                    {result?.messages?.data && result.messages.data.length > 0 && (
                      <div className="mt-2">
                        <p><strong>留言列表:</strong></p>
                        {result.messages.data.map((msg: any) => (
                          <div key={msg.id} className="text-xs bg-white p-2 rounded mt-1">
                            <strong>用户ID:</strong> {msg.user_id}
                            <br />
                            <strong>内容:</strong> {msg.content}
                            <br />
                            <strong>时间:</strong> {new Date(msg.created_at).toLocaleString()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 用户名映射 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">🔗 用户名映射</h2>
                  <div className="p-3 bg-gray-50 rounded">
                    <p><strong>映射结果:</strong></p>
                    <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                      {JSON.stringify(result?.userMapping || {}, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 完整结果 */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📊 完整测试结果</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={testInBrowser}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              重新测试
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

