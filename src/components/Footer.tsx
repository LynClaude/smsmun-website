'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 社交媒体 */}
          <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">社交媒体</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://mp.weixin.qq.com/s/qQGbxgXTlMRWkqkGXxhBEw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  深中模联公众号
                </a>
              </li>
              <li>
                <a 
                  href="https://mp.weixin.qq.com/s/qQGbxgXTlMRWkqkGXxhBEw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  泛珠模联公众号
                </a>
              </li>
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">关于我们</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  社团简介
                </Link>
              </li>
              <li>
                <Link href="/alumni-leadership" className="hover:text-primary transition-colors">
                  联系方式
                </Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  加入我们（敬请期待）
                </span>
              </li>
            </ul>
          </div>

          {/* 相关链接 */}
          <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">相关链接</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://mp.weixin.qq.com/s/qQGbxgXTlMRWkqkGXxhBEw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  深圳中学公众号
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 