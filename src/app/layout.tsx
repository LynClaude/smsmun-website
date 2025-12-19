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
  openGraph: {
    title: '深圳中学模拟联合国协会',
    description: '深圳中学模拟联合国协会官方网站 - 用户认证系统已完善',
    url: 'https://www.smsmun.cn',
    siteName: '深圳中学模拟联合国协会',
    images: [
      {
        url: '/logo.png',
        width: 640,
        height: 640,
        alt: '深圳中学模拟联合国协会 Logo',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '深圳中学模拟联合国协会',
    description: '深圳中学模拟联合国协会官方网站 - 用户认证系统已完善',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '深圳中学模拟联合国协会',
    url: 'https://www.smsmun.cn',
    logo: 'https://www.smsmun.cn/logo.png',
    description: '深圳中学模拟联合国协会官方网站',
  }

  return (
    <html lang="zh">
      <body className={inter.className}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <I18nProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen pt-16 sm:pt-20">{children}</main>
            <Footer />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
} 