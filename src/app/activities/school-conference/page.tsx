'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function SchoolConferencePage() {
  const { messages } = useI18n()

  const conferences = [
    {
      year: 2024,
      date: "10月19日至20日",
      venue: "深圳中学",
      format: "线下",
      description: "由深圳中学模拟联合国协会主办的2024年深圳中学模拟联合国协会校内会于10月19日至20日成功举办。本次参会各国代表由2024届深圳中学模拟联合国协会高一新社员组成。校内会共分为两个会场，分别为中文会场的1982马岛危机协调机制联合国安理会会场、英文会场的 2020 Egypt, Sudan, and Ethiopia Trilateral Negotiation Special Committee，另设有MPC，为各位代表奉上了一场精彩的学术盛宴。",
      wechatUrl: "https://mp.weixin.qq.com/s/6sZY-ouFCq8PbD4ehvDPDw"
    },
    {
      year: 2023,
      date: "10月21日至22日",
      venue: "深圳中学",
      format: "线下",
      description: "由深圳中学模拟联合国协会主办的2023年深圳中学模拟联合国协会校内会于10月21日至22日成功举办。本次参会各国代表由2023届深圳中学模拟联合国协会高一高二新社员组成。校内会共分为两个会场，分别为中文会场的1995 波斯尼亚-黑塞哥维纳战争第 3601次安理会、英文会场的 Development and The Potential Threats of Cybersecurity，另设有MPC，为各位代表奉上了一场精彩的学术盛宴。",
      wechatUrl: "https://mp.weixin.qq.com/s/_tTj2LdlcGXQ7K6eUshWHA"
    },
    {
      year: 2022,
      date: "10月22日至23日",
      venue: "线上",
      format: "线上",
      description: "由深圳中学模拟联合国协会主办的2022年深圳中学模拟联合国协会校内会于10月22日至23日在线上成功举办。本次参会各国代表由2022届深圳中学模拟联合国协会高一新社员组成。校内会共分为两个会场，分别为中文会场的2012叙利亚危机协调安理会、英文会场的Combating Proliferation and Illicit Trafficking of Small Arms and Light Weapons，中文会另设有MPC，为各位代表奉上了一场精彩的学术盛宴。",
      wechatUrl: "https://mp.weixin.qq.com/s/2zek3Rui7am0euT6rpRpGA"
    },
    {
      year: 2021,
      date: "10月23日至24日",
      venue: "晒布校区",
      format: "线下",
      description: "由深圳中学模拟联合国主办的2021年深圳中学模拟联合国协会校内会于10月23日至24日在晒布校区成功举办。本次参会各国代表由2021届深圳中学模拟联合国协会高一新社员组成。校内会分为两个会场，分别为2012叙利亚危机协调安理会（中文会场）、The Economic and Social Commission for Asia and the Pacific on Combatting Drug Trafficking（英文会场），另设置有MPC，为各位代表奉上了一场精彩的学术盛宴。",
      wechatUrl: "https://mp.weixin.qq.com/s/RiaPwDaCS7tVfBGaVP3CSA"
    },
    {
      year: 2020,
      date: "10月24日至25日",
      venue: "深圳中学",
      format: "线下",
      description: "由深圳中学模拟联合国主办的2020年深圳中学校内会于10月24日至25日成功举办。本次会议成员由本届深圳中学模拟联合国协会高一新社员组成，共分为两个会场——巴以冲突谈判协调国际会议(中文会），United Nations Climate Change Conference in Copenhagen（英文会），另设置有MPC，为各位代表奉上了一场精彩的学术盛宴。",
      wechatUrl: "https://mp.weixin.qq.com/s/68HDoTb0iBHuAB-gZt-_3Q"
    },
    {
      year: 2018,
      date: "12月2日",
      venue: "深圳中学",
      format: "线下",
      description: "2018年12月2日，深圳中学模拟联合国协会校内会顺利召开。进入深中模联的干事们，在首次接触模联会议的过程中认真准备，积极参与，对国际问题进行了深入讨论，在体验外交博弈的同时熟悉了学术标准和规则准则。",
      wechatUrl: "https://mp.weixin.qq.com/s/8k8NWUAFa3X1PrVbd8CC8Q"
    }
  ]

  return (
    <PageTransition>
      <div>
        {/* 页面标题 - 艺术化设计 */}
        <div className="relative pt-40 pb-32 overflow-hidden">
          {/* 背景渐变层 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
          
          {/* 装饰性几何图案 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 rounded-full opacity-5 blur-3xl"></div>
          </div>
          
          {/* 网格装饰 */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* 内容区域 */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              {/* 装饰性前置元素 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                style={{ 
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                  fontWeight: '700',
                  letterSpacing: '0.03em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                {messages.activities.school_conference.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                style={{
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                {messages.activities.school_conference.subtitle}
              </motion.p>
              
              {/* 装饰性后置元素 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </motion.div>
            </div>
          </div>
          
          {/* 底部渐变遮罩 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* 会议列表 */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                  {messages.activities.school_conference.yearly_conferences}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conferences.map((conference, index) => (
                  <motion.div
                    key={conference.year}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0.0, 0.2, 1] }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* 装饰性背景元素 */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                      {/* 年份标识 - 渐变色设计 */}
                      <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-3xl font-bold">
                              {conference.year}
                            </h3>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-xs font-semibold uppercase tracking-wide">
                                {messages.activities.school_conference.title.replace('深圳中学', '').replace('校内会', '').trim()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm opacity-90">
                            {conference.date}
                          </p>
                        </div>
                      </div>

                      {/* 会议描述 */}
                      <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-5">
                          {conference.description}
                        </p>

                        {/* 微信公众号链接 - 优化按钮设计 */}
                        <a
                          href={conference.wechatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg overflow-hidden"
                        >
                          <span className="absolute inset-0 w-3 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                          <svg className="w-5 h-5 mr-2 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.162 4.203 2.969 5.543-.396-.847-.729-1.804-.729-2.812 0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.008-.333 1.965-.729 2.812 1.807-1.34 2.969-3.331 2.969-5.543 0-4.054-3.891-7.342-8.691-7.342zM12 15.53c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"/>
                          </svg>
                          <span className="relative z-10">{messages.activities.school_conference.view_wechat}</span>
                        </a>
                      </div>
                      
                      {/* 底部装饰条 */}
                      <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  )
}
