'use client'

import { useEffect } from 'react'

export default function VerificationMeta() {
  useEffect(() => {
    // 添加百度验证meta标签
    const baiduMeta = document.querySelector('meta[name="baidu-site-verification"]')
    if (!baiduMeta) {
      const meta = document.createElement('meta')
      meta.name = 'baidu-site-verification'
      meta.content = 'codeva-dEZ6qyjTdt'
      document.head.appendChild(meta)
    }
  }, [])

  return null
}

