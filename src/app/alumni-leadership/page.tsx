'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import LeadershipCard from '@/components/LeadershipCard'

const years = Array.from({ length: 20 }, (_, i) => 2024 - i)

interface Member {
  position: string
  name: string
  contact: string
}

interface YearData {
  secretariat: Member[]
  advisors: Member[]
}

interface LeadershipData {
  [key: string]: YearData
}

const leadershipData: LeadershipData = {
  '2024-2025': {
    secretariat: [
      {
        position: '协会秘书长',
        name: '甘楚涵',
        contact: '13631563505'
      },
      {
        position: '常务秘书长',
        name: '伍宣静',
        contact: '13829900066'
      },
      {
        position: '学术事务部副秘书长',
        name: '张亦驰 周张晗 黎启诚',
        contact: '19925474242 13691916656 14739916283'
      },
      {
        position: '公共关系事务部副秘书长',
        name: '庞棕雨 汤峤',
        contact: '13411868050 13760284223'
      },
      {
        position: '行政关系事务部副秘书长',
        name: '李艺涵',
        contact: '13538278700'
      },
      {
        position: '技术关系事务部副秘书长',
        name: '王钰淇',
        contact: '15118021935'
      }
    ],
    advisors: [
      {
        position: '学术事务部高级顾问',
        name: '柳知好 林梓烨',
        contact: '19926542029 13480661529'
      },
      {
        position: '公共关系事务部高级顾问',
        name: '刘楷姸 乔秋宸',
        contact: '14774933963 18620390907'
      },
      {
        position: '行政关系事务部高级顾问',
        name: '林卓烨 姚羽宸',
        contact: '13316832860 15013890406'
      }
    ]
  }
}

export default function AlumniLeadershipPage() {
  const [selectedYear, setSelectedYear] = useState('2024-2025')

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">历届高层</h1>
          
          <div className="flex gap-8">
            {/* 左侧年份导航 */}
            <div className="hidden lg:block w-48 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-lg font-semibold mb-4">年份</h2>
                <div className="space-y-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(`${year}-${year + 1}`)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedYear === `${year}-${year + 1}`
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {year}-{year + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="flex-1">
              {leadershipData[selectedYear] && (
                <div className="space-y-12">
                  {/* 秘书处成员 */}
                  <section>
                    <h2 className="text-2xl font-bold mb-6">第二十届秘书处成员</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {leadershipData[selectedYear].secretariat.map((member: Member, index: number) => (
                        <LeadershipCard
                          key={index}
                          position={member.position}
                          name={member.name}
                          contact={member.contact}
                        />
                      ))}
                    </div>
                  </section>

                  {/* 高级顾问成员 */}
                  <section>
                    <h2 className="text-2xl font-bold mb-6">第二十届高级顾问成员</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {leadershipData[selectedYear].advisors.map((member: Member, index: number) => (
                        <LeadershipCard
                          key={index}
                          position={member.position}
                          name={member.name}
                          contact={member.contact}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 