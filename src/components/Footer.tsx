'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-16 px-4">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {/* 社交媒体 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">社交媒体</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  深中模联公众号
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  泛珠模联公众号
                </a>
              </li>
            </ul>
          </div>

          {/* 获取帮助 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">获取帮助</h3>
            <div>
              <p className="text-gray-300 mb-2">社团高层联系方式</p>
              <a href="mailto:contact@szmun.org" className="hover:text-gray-300 transition-colors">
                contact@szmun.org
              </a>
            </div>
          </div>

          {/* 其他链接 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">其他链接</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://www.shenzhong.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  深圳中学官网
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  深圳中学公众号
                </a>
              </li>
              <li>
                <a 
                  href="https://www.un.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  联合国官网
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-gray-300">© 2025 深圳中学模拟联合国协会秘书处及高级顾问团队</p>
        </div>
      </div>
    </footer>
  )
} 