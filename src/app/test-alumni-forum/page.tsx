'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'

export default function TestAlumniForumPage() {
  const { user } = useAuth()
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    const runTests = async () => {
      const results: string[] = []
      
      try {
        // 测试1: 检查用户状态
        results.push(`✅ 用户状态: ${user ? '已登录' : '未登录'}`)
        if (user) {
          results.push(`✅ 用户ID: ${user.id}`)
          results.push(`✅ 是否校友: ${user.is_alumni}`)
          results.push(`✅ 是否荣誉顾问: ${user.is_honor_advisor}`)
        }

        // 测试2: 检查Supabase连接
        const { data: testData, error: testError } = await supabase
          .from('users')
          .select('count')
          .limit(1)
        
        if (testError) {
          results.push(`❌ Supabase连接错误: ${testError.message}`)
        } else {
          results.push(`✅ Supabase连接正常`)
        }

        // 测试3: 检查messages表
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .limit(5)
        
        if (messagesError) {
          results.push(`❌ Messages表错误: ${messagesError.message}`)
        } else {
          results.push(`✅ Messages表正常，数据量: ${messagesData?.length || 0}`)
        }

        // 测试4: 检查questions表
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .limit(5)
        
        if (questionsError) {
          results.push(`❌ Questions表错误: ${questionsError.message}`)
        } else {
          results.push(`✅ Questions表正常，数据量: ${questionsData?.length || 0}`)
        }

        // 测试5: 检查honor_advisors表
        const { data: honorAdvisorsData, error: honorAdvisorsError } = await supabase
          .from('honor_advisors')
          .select('*')
          .limit(5)
        
        if (honorAdvisorsError) {
          results.push(`❌ Honor_advisors表错误: ${honorAdvisorsError.message}`)
        } else {
          results.push(`✅ Honor_advisors表正常，数据量: ${honorAdvisorsData?.length || 0}`)
        }

      } catch (error) {
        results.push(`❌ 测试过程中出现错误: ${error}`)
      }

      setTestResults(results)
    }

    runTests()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">校友交流页面测试</h1>
            
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <pre className="text-sm">{result}</pre>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/alumni-forum"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                返回校友交流页面
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
