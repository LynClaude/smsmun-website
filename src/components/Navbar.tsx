'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import PPRDYearSelector from './PPRDYearSelector'
import ActivitiesSelector from './ActivitiesSelector'
import { useI18n } from '@/lib/i18n-context'
import { useAuth } from '@/lib/auth-context'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { messages } = useI18n()
  const { user, logout } = useAuth()

  const navigation = [
    { name: messages.nav.home, href: '/' },
    { name: messages.nav.about, href: '/about' },
    { name: messages.nav.alumni_leadership, href: '/alumni-leadership' },
    { name: 'pprdmun', href: '/pprdmun', isDropdown: true }, // 特殊标记为下拉菜单
    { name: 'activities', href: '/activities', isActivitiesDropdown: true }, // 活动与项目下拉菜单
    { name: messages.nav.events, href: '/events' },
    { name: messages.nav.alumni_network, href: '/alumni-network' },
    { name: 'alumni-forum', href: '/alumni-forum', isAlumniOnly: true }, // 仅校友可访问
    { name: messages.nav.resources, href: '/resources' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.png"
                alt="SZMUN Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold text-primary hidden md:inline whitespace-nowrap">
              {messages.site.name_full}
            </span>
            <span className="text-lg font-bold text-primary md:hidden">
              {messages.site.name_short}
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{messages.nav.open_menu}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-4 xl:gap-x-6 lg:ml-8 xl:ml-16">
          {navigation.map((item) => (
            item.isDropdown ? (
              <PPRDYearSelector key={item.name} />
            ) : item.isActivitiesDropdown ? (
              <ActivitiesSelector key={item.name} />
            ) : item.isAlumniOnly && (!user || !user.isAlumni) ? null : (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs xl:text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.name === 'alumni-forum' ? '校友交流' : item.name}
              </Link>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <LanguageSwitcher />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.username}
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {user.isAdmin ? '管理员' : user.isAlumni ? '深中模联校友' : '访客用户'}
                    </p>
                  </div>
                  {user.isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      管理员面板
                    </Link>
                  )}
                  {user.isAlumni && (
                    <Link
                      href="/alumni-forum"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      校友交流
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setUserMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
              登录 <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="SZMUN Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-lg font-bold text-primary">{messages.site.name_short}</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">{messages.nav.close_menu}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    item.isDropdown ? (
                      <div key={item.name} className="-mx-3 px-3 py-2">
                        <div className="text-base font-semibold text-gray-900 mb-2">{messages.nav.pprdmun}</div>
                        <div className="ml-4 space-y-1">
                          {Array.from({ length: 11 }, (_, i) => 2025 - i).map((year) => (
                            <Link
                              key={year}
                              href={year === 2025 ? '/pprdmun' : `/pprdmun/${year}`}
                              className="block text-sm text-gray-600 hover:text-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              PPRDMUN {year}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : item.isActivitiesDropdown ? (
            <div key={item.name} className="-mx-3 px-3 py-2">
              <div className="text-base font-semibold text-gray-900 mb-2">活动与项目</div>
              <div className="ml-4 space-y-1">
                <Link
                  href="/activities/leadership-summit"
                  className="block text-sm text-gray-600 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  领袖峰会
                </Link>
              </div>
            </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <div className="px-3">
                    <LanguageSwitcher />
                  </div>
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {messages.nav.login}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 