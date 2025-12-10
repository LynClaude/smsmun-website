'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SimpleConnectionTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      console.log('🔍 开始测试Supabase连接...')
      console.log('Supabase URL:', 'https://xjeqpsicutiwkxjoqvls.supabase.co')
      
      // 最简单的测试：尝试查询用户表
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1)

      const testResult = {
        timestamp: new Date().toISOString(),
        supabaseUrl: 'https://xjeqpsicutiwkxjoqvls.supabase.co',
        success: !error,
        error: error?.message,
        data: data,
        hasData: data && data.length > 0
      }

      console.log('📊 连接测试结果:', testResult)
      setResult(testResult)

    } catch (err: any) {
      console.error('❌ 连接测试失败:', err)
      setResult({
        timestamp: new Date().toISOString(),
        success: false,
        error: err.message,
        data: null
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
          <p className="text-gray-600">测试Supabase连接中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🔗 Supabase连接测试</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">连接状态</h2>
            <div className={`p-4 rounded ${result?.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p><strong>状态:</strong> {result?.success ? '✅ 连接成功' : '❌ 连接失败'}</p>
              <p><strong>时间:</strong> {result?.timestamp}</p>
              <p><strong>Supabase URL:</strong> {result?.supabaseUrl}</p>
              {result?.error && <p><strong>错误信息:</strong> {result.error}</p>}
            </div>
          </div>

          {result?.success && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">数据测试</h2>
              <div className="p-4 bg-gray-50 rounded">
                <p><strong>是否有数据:</strong> {result?.hasData ? '✅ 有数据' : '⚠️ 无数据'}</p>
                {result?.data && (
                  <div className="mt-4">
                    <p><strong>查询到的数据:</strong></p>
                    <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">完整结果</h2>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={testConnection}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              重新测试连接
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}





