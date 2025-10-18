'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { useI18n } from '@/lib/i18n-context'

export default function LeadershipSummitPage() {
  const { messages } = useI18n()
  const [selectedYear, setSelectedYear] = useState('2024')

  const years = [
    '2024'
    // 未来可以添加更多年份
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧年份导航 */}
            <div className="md:w-64 space-y-2">
              <h2 className="text-xl font-bold mb-4">领袖峰会</h2>
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
                <h2 className="text-2xl font-bold mb-8">领袖峰会 {selectedYear}</h2>
                
                {selectedYear === '2024' ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">会议简介</h3>
                      <p className="text-gray-700 leading-relaxed">
                        深圳市模拟联合国领袖峰会是由深圳中学模拟联合国协会秘书处主办，面向全市各高中模联组织负责人及管理层成员的大会，旨在推动深圳市高中生模联活动的合作与发展。峰会通过深入友好的交流，加强区域内各模联协会的团结，建立合作互助平台，讨论深圳模联的发展和前景，为深圳市高中生模联活动的独立、专业、创新型发展探索良策。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">会议信息</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li><span className="font-semibold">会议时间：</span>2024年12月7日（周六）14：30 -17：00</li>
                        <li><span className="font-semibold">会议地点：</span>深圳中学（泥岗校区）</li>
                        <li><span className="font-semibold">会议主题：</span>深圳地区线下模联活动的重振与发展&模联社团创新与传承</li>
                        <li><span className="font-semibold">英文全称：</span>Shenzhen Summit for Chief Leaders in Model United Nations</li>
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link
                        href="/activities/leadership-summit/2024"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        查看详细信息 →
                      </Link>
                    </div>
                  </div>
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
