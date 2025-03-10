'use client'

import { motion } from 'framer-motion'

export default function AcademicPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">学术事务部</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">部门简介</h2>
          <p className="text-gray-700 leading-relaxed">
            学术事务部是由三位学术事务副秘书长负责分管，旨在为社团成员定期提供学术培训、为参加会议的代表提供相关学术培训和会前准备建议并在会中和会后提供学术指导的深中模联四大部门之一。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">工作职责</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>为社团成员提供定期学术培训</li>
            <li>组织模拟联合国会议的学术准备工作</li>
            <li>为代表提供会前准备指导</li>
            <li>在会议期间提供学术支持</li>
            <li>负责会后的学术总结和反馈</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">你将获得</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>深入了解国际事务的机会</li>
            <li>提升学术研究能力</li>
            <li>培养批判性思维</li>
            <li>锻炼公共演讲技巧</li>
            <li>结识志同道合的模联人</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">加入要求</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>对国际事务有浓厚兴趣</li>
            <li>具备良好的研究和分析能力</li>
            <li>能够承担学术培训和指导工作</li>
            <li>有团队协作精神</li>
          </ul>
        </section>
      </div>
    </motion.div>
  )
} 