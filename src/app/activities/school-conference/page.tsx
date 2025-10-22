'use client'

import { motion } from 'framer-motion'
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
        {/* 页面标题 */}
        <div className="relative pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {messages.activities.school_conference.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                {messages.activities.school_conference.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* 会议列表 */}
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
              >
                {messages.activities.school_conference.yearly_conferences}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conferences.map((conference, index) => (
                  <motion.div
                    key={conference.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* 年份标识 */}
                    <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4 text-center">
                      <h3 className="text-2xl font-bold">{messages.activities.school_conference.conference_info.replace('{year}', conference.year.toString())}</h3>
                      <p className="text-sm opacity-90 mt-1">
                        {conference.date} · {conference.venue} · {conference.format}
                      </p>
                    </div>

                    {/* 会议描述 */}
                    <div className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-6">
                        {conference.description}
                      </p>

                      {/* 微信公众号链接 */}
                      <a
                        href={conference.wechatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-sm"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.162 4.203 2.969 5.543-.396-.847-.729-1.804-.729-2.812 0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.008-.333 1.965-.729 2.812 1.807-1.34 2.969-3.331 2.969-5.543 0-4.054-3.891-7.342-8.691-7.342zM12 15.53c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"/>
                        </svg>
                        {messages.activities.school_conference.view_wechat}
                      </a>
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
