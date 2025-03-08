'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-sm">
              深圳中学模拟联合国协会致力于培养具有国际视野和领导能力的青年人才。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pprdmun" className="text-sm hover:text-gray-300">
                  PPRDMUN
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm hover:text-gray-300">
                  活动日历
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm hover:text-gray-300">
                  资源下载
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li>地址：深圳市福田区红荔路深圳中学</li>
              <li>邮箱：contact@szmun.org</li>
              <li>电话：+86 755-XXXX-XXXX</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <span className="sr-only">微博</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 深圳中学模拟联合国协会. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
} 