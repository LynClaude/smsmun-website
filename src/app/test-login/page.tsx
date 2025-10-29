'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'

export default function TestLoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (msg: string) => {
    console.log(msg)
    setResults(prev => [...prev, msg])
  }

  const testDatabase = async () => {
    setResults([])
    setLoading(true)
    
    try {
      addResult('🔍 第1步：查询所有用户...')
      const { data: allUsers, error: allError } = await supabase
        .from('users')
        .select('*')
      
      if (allError) {
        addResult(`❌ 查询所有用户失败: ${allError.message}`)
      } else {
        addResult(`✅ 找到 ${allUsers?.length || 0} 个用户`)
        allUsers?.forEach((user: any) => {
          addResult(`   - 邮箱: ${user.email}, 密码: ${user.password}`)
        })
      }

      addResult('\n🔍 第2步：查找您的邮箱...')
      if (email) {
        const { data: emailUsers, error: emailError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
        
        if (emailError) {
          addResult(`❌ 查找邮箱失败: ${emailError.message}`)
        } else {
          addResult(`✅ 找到 ${emailUsers?.length || 0} 个匹配邮箱的用户`)
          if (emailUsers && emailUsers.length > 0) {
            emailUsers.forEach((user: any) => {
              addResult(`   - 密码: ${user.password}`)
              addResult(`   - 您输入的密码: ${password}`)
              addResult(`   - 是否匹配: ${user.password === password}`)
            })
          }
        }
      }

      addResult('\n🔐 第3步：尝试登录...')
      if (email && password) {
        const success = await login(email, password)
        if (success) {
          addResult('✅ 登录成功！')
        } else {
          addResult('❌ 登录失败')
        }
      }
    } catch (error: any) {
      addResult(`❌ 错误: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>登录测试工具</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          邮箱:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          密码:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button 
          onClick={testDatabase}
          disabled={loading}
          style={{ padding: '10px 20px', marginTop: '10px' }}
        >
          {loading ? '测试中...' : '开始测试'}
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        fontFamily: 'monospace',
        maxHeight: '500px',
        overflow: 'auto'
      }}>
        {results.length === 0 ? (
          <p style={{ color: '#666' }}>点击"开始测试"按钮查看结果</p>
        ) : (
          results.map((msg, i) => (
            <div key={i} style={{ marginBottom: '5px' }}>{msg}</div>
          ))
        )}
      </div>
    </div>
  )
}
