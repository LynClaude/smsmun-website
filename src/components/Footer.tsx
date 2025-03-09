'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* 社交媒体 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold mb-6">社交媒体</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl mb-2">深中模联公众号</h4>
                <p className="text-gray-300 text-sm">关注获取最新活动资讯</p>
              </div>
              <div>
                <h4 className="text-xl mb-2">泛珠模联公众号</h4>
                <p className="text-gray-300 text-sm">了解大会动态与报名信息</p>
              </div>
            </div>
          </div>

          {/* 获取帮助 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold mb-6">获取帮助</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl mb-2">社团高层联系方式</h4>
                <p className="text-gray-300 text-sm">邮箱：contact@szmun.org</p>
              </div>
            </div>
          </div>

          {/* 其他链接 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold mb-6">其他链接</h3>
            <div className="space-y-4">
              <div>
                <a 
                  href="https://www.shenzhong.net" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-gray-300 transition-colors block mb-2"
                >
                  深圳中学官网
                </a>
                <a 
                  href="#" 
                  className="text-xl hover:text-gray-300 transition-colors block mb-2"
                >
                  深圳中学公众号
                </a>
                <a 
                  href="https://www.un.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-gray-300 transition-colors block"
                >
                  联合国官网
                </a>
              </div>
            </div>
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