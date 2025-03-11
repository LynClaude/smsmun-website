'use client'

import { useState } from 'react'
import PageTransition from '@/components/PageTransition'
import { LeadershipCard } from '@/components/LeadershipCard'

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

export default function AlumniLeadershipPage() {
  const [selectedYear, setSelectedYear] = useState('2024-2025')

  const years = [
    '2024-2025',
    '2023-2024',
    '2022-2023',
    '2021-2022',
    '2020-2021',
    '2019-2020',
    '2018-2019',
    '2017-2018',
    '2016-2017',
    '2015-2016',
    '2014-2015',
    '2013-2014',
    '2012-2013',
    '2011-2012',
    '2010-2011',
    '2009-2010',
    '2008-2009',
    '2007-2008',
    '2006-2007',
    '2005-2006',
  ]

  const leadershipData: LeadershipData = {
    '2024-2025': {
      secretariat: [
        { position: '协会秘书长', name: '甘楚涵', contact: '13631563505' },
        { position: '常务秘书长', name: '伍宣静', contact: '13829900066' },
        { position: '学术事务部副秘书长', name: '张亦驰', contact: '19925474242' },
        { position: '学术事务部副秘书长', name: '周张晗', contact: '13691916656' },
        { position: '学术事务部副秘书长', name: '黎启诚', contact: '14739916283' },
        { position: '公共关系事务部副秘书长', name: '庞棕雨', contact: '13411868050' },
        { position: '公共关系事务部副秘书长', name: '汤峤', contact: '13760284223' },
        { position: '行政关系事务部副秘书长', name: '李艺涵', contact: '13538278700' },
        { position: '技术关系事务部副秘书长', name: '王钰淇', contact: '15118021935' },
      ],
      advisors: [
        { position: '学术事务部高级顾问', name: '柳知好', contact: '19926542029' },
        { position: '学术事务部高级顾问', name: '林梓烨', contact: '13480661529' },
        { position: '学术事务部高级顾问', name: '刘楷姸', contact: '14774933963' },
        { position: '学术事务部高级顾问', name: '乔秋宸', contact: '18620390907' },
        { position: '公共关系事务部高级顾问', name: '林卓烨', contact: '13316832860' },
        { position: '行政关系事务部高级顾问', name: '姚羽宸', contact: '15013890406' },
      ],
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧年份导航 */}
            <div className="md:w-64 space-y-2">
              <h2 className="text-xl font-bold mb-4">历届高层</h2>
              <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedYear === year
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8">{selectedYear} 高层成员</h2>
                
                {leadershipData[selectedYear] ? (
                  <>
                    {/* 秘书处 */}
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold mb-6">秘书处</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leadershipData[selectedYear].secretariat.map((member, index) => (
                          <LeadershipCard
                            key={index}
                            position={member.position}
                            name={member.name}
                            contact={member.contact}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 高级顾问 */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6">高级顾问</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leadershipData[selectedYear].advisors.map((member, index) => (
                          <LeadershipCard
                            key={index}
                            position={member.position}
                            name={member.name}
                            contact={member.contact}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    该年份的数据暂未收录
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 