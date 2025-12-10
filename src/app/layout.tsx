import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/lib/i18n-context'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '深圳中学模拟联合国协会',
  description: '深圳中学模拟联合国协会官方网站 - 用户认证系统已完善',
  verification: {
    google: 'yWRJ16PBx23x4cCp1eY5R85JtgDp-mP9seDtbUHBKfE',
  },
  other: {
    'baidu-site-verification': 'codeva-dEZ6qyjTdt',
  },
  metadataBase: new URL('https://www.smsmun.cn'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Script
          id="baidu-verification"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){if(document.head){var e=document.createElement("meta");e.name="baidu-site-verification",e.content="codeva-dEZ6qyjTdt",document.head.querySelector('meta[name="baidu-site-verification"]')||document.head.insertBefore(e,document.head.firstChild)}}();
            `,
          }}
        />
        <I18nProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
} 