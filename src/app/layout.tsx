import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '深圳中学模拟联合国协会',
  description: '深圳中学模拟联合国协会官方网站 - 培养具有国际视野的未来领袖',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" data-theme="szmun">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <footer className="footer p-10 bg-neutral text-neutral-content">
          <div>
            <span className="footer-title">关于我们</span>
            <a className="link link-hover">协会简介</a>
            <a className="link link-hover">联系方式</a>
            <a className="link link-hover">加入我们</a>
          </div>
          <div>
            <span className="footer-title">社交媒体</span>
            <a className="link link-hover">微信公众号</a>
            <a className="link link-hover">微博</a>
            <a className="link link-hover">Instagram</a>
          </div>
          <div>
            <span className="footer-title">友情链接</span>
            <a className="link link-hover">深圳中学官网</a>
            <a className="link link-hover">联合国网站</a>
            <a className="link link-hover">THIMUN</a>
          </div>
        </footer>
      </body>
    </html>
  )
} 