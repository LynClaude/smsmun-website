'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import PageTransition from '@/components/PageTransition'

export default function TestSupabasePage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    setTestResults(null)

    try {
      const results: any = {}

      // 检查环境变量
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'
      
      results.environmentCheck = {
        supabaseUrl: supabaseUrl,
        supabaseKey: supabaseKey.substring(0, 20) + '...',
        isUsingDummy: supabaseUrl.includes('dummy') || supabaseKey.includes('dummy'),
        hasEnvVars: !supabaseUrl.includes('dummy') && !supabaseKey.includes('dummy')
      }

      // 测试1: 基本连接
      console.log('测试1: 基本连接...')
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('count(*)')
        .limit(1)
      
      results.usersTest = {
        success: !usersError,
        error: usersError?.message,
        data: usersData
      }

      // 测试2: honor_advisors表
      console.log('测试2: honor_advisors表...')
      const { data: honorData, error: honorError } = await supabase
        .from('honor_advisors')
        .select('*')
        .limit(5)
      
      results.honorAdvisorsTest = {
        success: !honorError,
        error: honorError?.message,
        data: honorData,
        count: honorData?.length || 0
      }

      // 测试3: 已批准查询
      console.log('测试3: 已批准查询...')
      const { data: approvedData, error: approvedError } = await supabase
        .from('honor_advisors')
        .select('*')
        .eq('status', 'approved')
      
      results.approvedTest = {
        success: !approvedError,
        error: approvedError?.message,
        data: approvedData,
        count: approvedData?.length || 0
      }

      // 测试4: 状态统计
      console.log('测试4: 状态统计...')
      const { data: statusData, error: statusError } = await supabase
        .from('honor_advisors')
        .select('status')
      
      results.statusTest = {
        success: !statusError,
        error: statusError?.message,
        data: statusData
      }

      setTestResults(results)
      console.log('所有测试结果:', results)

    } catch (error: any) {
      console.error('测试过程中出错:', error)
      setTestResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Supabase 连接测试</h1>
              
              <button
                onClick={runTests}
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors mb-6"
              >
                {loading ? '测试中...' : '运行测试'}
              </button>

              {testResults && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">测试结果:</h3>
                    <pre className="text-sm text-blue-800 overflow-auto">
                      {JSON.stringify(testResults, null, 2)}
                    </pre>
                  </div>

                  {testResults.environmentCheck && (
                    <div className={`p-4 rounded-lg border ${
                      testResults.environmentCheck.hasEnvVars 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <h4 className="font-medium mb-2">
                        环境变量检查: {testResults.environmentCheck.hasEnvVars ? '✅ 已配置' : '❌ 未配置'}
                      </h4>
                      <p className="text-sm text-gray-600">URL: {testResults.environmentCheck.supabaseUrl}</p>
                      <p className="text-sm text-gray-600">Key: {testResults.environmentCheck.supabaseKey}</p>
                      {testResults.environmentCheck.isUsingDummy && (
                        <p className="text-sm text-red-600">⚠️ 正在使用默认配置，需要设置环境变量</p>
                      )}
                    </div>
                  )}

                  {testResults.usersTest && (
                    <div className={`p-4 rounded-lg border ${
                      testResults.usersTest.success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <h4 className="font-medium mb-2">
                        用户表测试: {testResults.usersTest.success ? '✅ 成功' : '❌ 失败'}
                      </h4>
                      {testResults.usersTest.error && (
                        <p className="text-sm text-red-600">错误: {testResults.usersTest.error}</p>
                      )}
                    </div>
                  )}

                  {testResults.honorAdvisorsTest && (
                    <div className={`p-4 rounded-lg border ${
                      testResults.honorAdvisorsTest.success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <h4 className="font-medium mb-2">
                        荣誉顾问表测试: {testResults.honorAdvisorsTest.success ? '✅ 成功' : '❌ 失败'}
                      </h4>
                      {testResults.honorAdvisorsTest.success && (
                        <p className="text-sm text-green-600">
                          找到 {testResults.honorAdvisorsTest.count} 条记录
                        </p>
                      )}
                      {testResults.honorAdvisorsTest.error && (
                        <p className="text-sm text-red-600">错误: {testResults.honorAdvisorsTest.error}</p>
                      )}
                    </div>
                  )}

                  {testResults.approvedTest && (
                    <div className={`p-4 rounded-lg border ${
                      testResults.approvedTest.success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <h4 className="font-medium mb-2">
                        已批准查询测试: {testResults.approvedTest.success ? '✅ 成功' : '❌ 失败'}
                      </h4>
                      {testResults.approvedTest.success && (
                        <p className="text-sm text-green-600">
                          找到 {testResults.approvedTest.count} 条已批准记录
                        </p>
                      )}
                      {testResults.approvedTest.error && (
                        <p className="text-sm text-red-600">错误: {testResults.approvedTest.error}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">环境变量检查:</h3>
                <p className="text-sm text-yellow-800">
                  如果测试失败，请检查您的 <code>.env.local</code> 文件是否包含正确的 Supabase 配置。
                </p>
                <p className="text-xs text-yellow-700 mt-2">
                  需要设置: NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
