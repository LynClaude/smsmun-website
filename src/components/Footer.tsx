'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 社交媒体 */}
          <div>
            <h3 className="text-xl font-bold mb-4">社交媒体</h3>
            <ul className="space-y-2">
              <li>深中模联公众号</li>
              <li>泛珠模联公众号</li>
            </ul>
          </div>
          
          {/* 关于我们 */}
          <div>
            <h3 className="text-xl font-bold mb-4">关于我们</h3>
            <ul className="space-y-2">
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
                <span className="text-gray-400">加入我们（敬请期待）</span>
              </li>
            </ul>
          </div>
          
          {/* 相关链接 */}
          <div>
            <h3 className="text-xl font-bold mb-4">相关链接</h3>
            <ul className="space-y-2">
              <li>深圳中学公众号</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 