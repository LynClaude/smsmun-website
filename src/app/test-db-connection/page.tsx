'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestDBConnectionPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    const results: any = {}

    // 1. 检查环境变量
    results.envCheck = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
      hasEnvVars: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }

    // 2. 测试基本连接
    try {
      const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })
      results.basicConnection = { success: !error, error: error?.message }
    } catch (err: any) {
      results.basicConnection = { success: false, error: err.message }
    }

    // 3. 测试荣誉顾问表
    try {
      const { data, error } = await supabase.from('honor_advisors').select('*').limit(5)
      results.honorAdvisors = { 
        success: !error, 
        error: error?.message, 
        count: data?.length || 0,
        data: data || []
      }
    } catch (err: any) {
      results.honorAdvisors = { success: false, error: err.message }
    }

    // 4. 测试已批准的荣誉顾问
    try {
      const { data, error } = await supabase.from('honor_advisors').select('*').eq('status', 'approved')
      results.approvedAdvisors = { 
        success: !error, 
        error: error?.message, 
        count: data?.length || 0,
        data: data || []
      }
    } catch (err: any) {
      results.approvedAdvisors = { success: false, error: err.message }
    }

    setResults(results)
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
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">数据库连接测试</h1>
        
        <div className="space-y-6">
          {/* 环境变量检查 */}
          <div className={`p-6 rounded-lg border ${
            results.envCheck?.hasEnvVars ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">
              环境变量检查: {results.envCheck?.hasEnvVars ? '✅ 已配置' : '❌ 未配置'}
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Supabase URL:</strong> {results.envCheck?.supabaseUrl || '未设置'}</p>
              <p><strong>Supabase Key:</strong> {results.envCheck?.supabaseKey || '未设置'}</p>
            </div>
          </div>

          {/* 基本连接测试 */}
          <div className={`p-6 rounded-lg border ${
            results.basicConnection?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">
              基本连接测试: {results.basicConnection?.success ? '✅ 成功' : '❌ 失败'}
            </h2>
            <p className="text-sm">{results.basicConnection?.error || '连接正常'}</p>
          </div>

          {/* 荣誉顾问表测试 */}
          <div className={`p-6 rounded-lg border ${
            results.honorAdvisors?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">
              荣誉顾问表查询: {results.honorAdvisors?.success ? '✅ 成功' : '❌ 失败'}
            </h2>
            <p className="text-sm mb-2">错误: {results.honorAdvisors?.error || '无'}</p>
            <p className="text-sm">记录数: {results.honorAdvisors?.count || 0}</p>
            {results.honorAdvisors?.data?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">数据预览:</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                  {JSON.stringify(results.honorAdvisors.data.slice(0, 2), null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* 已批准荣誉顾问测试 */}
          <div className={`p-6 rounded-lg border ${
            results.approvedAdvisors?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">
              已批准荣誉顾问查询: {results.approvedAdvisors?.success ? '✅ 成功' : '❌ 失败'}
            </h2>
            <p className="text-sm mb-2">错误: {results.approvedAdvisors?.error || '无'}</p>
            <p className="text-sm">已批准数量: {results.approvedAdvisors?.count || 0}</p>
            {results.approvedAdvisors?.data?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">已批准荣誉顾问:</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                  {JSON.stringify(results.approvedAdvisors.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={testConnection}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            重新测试连接
          </button>
        </div>
      </div>
    </div>
  )
}
