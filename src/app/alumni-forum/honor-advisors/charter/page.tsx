'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { useEffect } from 'react'

export default function HonorAdvisorsCharterPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 检查用户权限
    if (!user) {
      router.push('/auth/login')
      return
    }
    if (!user.is_alumni) {
      router.push('/')
      return
    }
  }, [user, router])

  if (!user || !user.is_alumni) {
    return null
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/alumni-forum/honor-advisors"
                className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回荣誉顾问页面
              </Link>
            </div>

            {/* 章程内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* 章程头部 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">深圳中学模拟联合国协会顾问委员会章程</h1>
                <p className="text-lg opacity-90">（草案）</p>
              </div>

              {/* 章程正文 */}
              <div className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none leading-relaxed"
                  style={{ 
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', serif",
                    fontSize: '16px',
                    lineHeight: '1.8'
                  }}
                >
                  {/* 第一章 总则 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第一章 总则</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第一条【设立目的】</h3>
                      <p className="text-gray-700 mb-4">
                        为加强深圳中学模拟联合国协会（以下简称"协会"）与往届优秀成员之间的联系，充分发挥毕业成员的经验优势，提升协会活动质量，建立长期发展支持体系，特设立顾问委员会。
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第二条【性质定位】</h3>
                      <p className="text-gray-700 mb-4">
                        顾问委员会为协会下设之咨询型、非执行性机构，其成员具有指导资格但不直接参与协会日常行政管理及具体事务执行。
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第三条【设立依据】</h3>
                      <p className="text-gray-700 mb-4">
                        本章程依据《深圳中学模拟联合国协会宪章》第二十三条相关内容制定：
                      </p>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
                        "成员毕业、肄业或转学，视为自动退出协会。经当届秘书处认定有杰出贡献之成员可保留荣誉顾问或等价身份，但不可继续参与协会具体事务，亦不计入协会成员。"
                      </blockquote>
                    </div>
                  </div>

                  {/* 第二章 顾问产生与任期 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第二章 顾问产生与任期</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第四条【任职条件】</h3>
                      <p className="text-gray-700 mb-2">荣誉顾问应满足以下条件之一：</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>为本协会往届成员，且在协会任职期间有突出贡献或表现优异；</li>
                        <li>在模拟联合国或相关领域具有经验积累，能够为协会提供建设性意见；</li>
                        <li>具备良好品行，认同协会价值观。</li>
                      </ol>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第五条【产生方式】</h3>
                      <p className="text-gray-700 mb-2">顾问产生采取"邀请制+申请制"并行方式：</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>邀请制：主席团可主动邀请符合条件的毕业成员担任顾问；受邀者有权接受或婉拒；</li>
                        <li>申请制：符合条件之毕业成员可于规定时间内向秘书处提出申请；</li>
                        <li>所有候选人须经主席团集体确认后方可正式成为顾问。</li>
                      </ol>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第六条【任期与续任】</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>顾问任期为一学年，自确认之日起生效；</li>
                        <li>顾问可于任期届满前申请续任，是否续聘由主席团评估其参与度与贡献后决定；</li>
                        <li>顾问人数不设上限。</li>
                      </ol>
                    </div>
                  </div>

                  {/* 第三章 顾问权利与荣誉待遇 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第三章 顾问权利与荣誉待遇</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第七条【顾问权利】</h3>
                      <p className="text-gray-700 mb-2">顾问享有以下权利：</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>在协会筹办重要活动或大型会议时，被主席团或秘书处咨询意见的权利；</li>
                        <li>可在自愿基础上参与线上指导会议、经验分享或培训活动；</li>
                        <li>协会成员可通过指定渠道就活动筹划、技能提升或个人发展向顾问咨询；</li>
                        <li>有权优先受邀参加协会举办的重大活动（如年会、开幕式、成果展示等）；</li>
                        <li>可向现任主席团就协会发展提出建议。</li>
                      </ol>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第八条【荣誉与纪念】</h3>
                      <p className="text-gray-700 mb-2">顾问可享有以下荣誉与纪念形式：</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>姓名及"荣誉顾问"身份可在协会重大会议组委名单、公众号推文及官方文件中适当标注；</li>
                        <li>可获协会当年度纪念周边或礼品；</li>
                        <li>履职积极者之姓名及荣誉身份可于深圳中学模拟联合国协会官方网站或相关官方平台展示。</li>
                      </ol>
                    </div>
                  </div>

                  {/* 第四章 顾问义务与行为规范 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第四章 顾问义务与行为规范</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第九条【顾问义务】</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>秉持尊重与支持原则，协助协会发展；</li>
                        <li>不干预协会主席团及现任部门的决策与日常事务执行；</li>
                        <li>不代表协会对外开展活动或发表具有官方性质言论；</li>
                        <li>不得泄露协会内部未公开信息；</li>
                        <li>维护协会形象与声誉。</li>
                      </ol>
                    </div>
                  </div>

                  {/* 第五章 工作机制 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第五章 工作机制</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第十条【沟通方式】</h3>
                      <p className="text-gray-700">
                        协会应建立顾问委员会线上联络渠道（如微信群、邮件列表或其他平台），供主席团与顾问联系与咨询之用。
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第十一条【咨询机制】</h3>
                      <p className="text-gray-700">
                        主席团可在会议筹备、发展规划、成员培养等事项中寻求顾问意见。顾问提出意见为建议性内容，不具约束力。
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第十二条【活动参与】</h3>
                      <p className="text-gray-700">
                        顾问可根据自身时间参与协会举办的分享会、经验交流会或成员培养项目。
                      </p>
                    </div>
                  </div>

                  {/* 第六章 解聘与退出机制 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">第六章 解聘与退出机制</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第十三条【主动退出】</h3>
                      <p className="text-gray-700">
                        顾问可向秘书处提出退出申请，经主席团确认后终止其顾问身份。
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">第十四条【解聘情形】</h3>
                      <p className="text-gray-700 mb-2">若顾问存在以下情形之一，经主席团决议可解除顾问身份：</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>长期无联系且未参与任何指导活动；</li>
                        <li>明确表明不希望继续履职；</li>
                        <li>有损协会信誉之行为；</li>
                        <li>违反协会宪章精神或本章程规定。</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Link
                    href="/alumni-forum/honor-advisors/apply"
                    className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    申请成为荣誉顾问
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
