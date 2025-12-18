'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n-context'

export default function Footer() {
  const { messages } = useI18n()
  
  return (
    <footer className="bg-black text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 社交媒体 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">{messages.footer.social_media}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
              <li>{messages.footer.szmun_wechat}</li>
              <li>{messages.footer.pprdmun_wechat}</li>
            </ul>
          </div>
          
          {/* 关于我们 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">{messages.footer.about_us}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {messages.footer.club_intro}
                </Link>
              </li>
              <li>
                <Link href="/alumni-leadership" className="hover:text-primary transition-colors">
                  {messages.footer.contact}
                </Link>
              </li>
              <li>
                <span className="text-gray-400">{messages.footer.join_us}</span>
              </li>
            </ul>
          </div>
          
          {/* 相关链接 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">{messages.footer.related_links}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
              <li>
                <a 
                  href="https://www.shenzhong.net/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  {messages.footer.sms_website}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 