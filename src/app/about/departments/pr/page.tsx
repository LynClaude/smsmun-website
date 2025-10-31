'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PRPage() {
  return (
    <div>
      {/* 返回按钮 */}
      <Link 
        href="/about#departments"
        className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors shadow-md mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回关于我们
      </Link>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">公共关系事务部</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">部门简介</h2>
          <p className="text-gray-700 leading-relaxed">
            深中模联公关部主要负责对外公共关系事务工作的管理、协调和统筹工作。作为公关干事，需要整理并发布深中模联内部活动信息和文件资料，承担校内活动成员的报名面试、运营深中模联公众号等。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">工作职责</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>管理和运营深中模联公众号</li>
            <li>处理会场突发事件</li>
            <li>接待校外模联同仁</li>
            <li>收集和整理代表信息</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">你将获得</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>公众号运营经验</li>
            <li>办公软件使用技能</li>
            <li>外交思维培养</li>
            <li>沟通技巧提升</li>
            <li>危机处理能力</li>
            <li>商务谈判经验</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">加入要求</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>良好的沟通表达能力</li>
            <li>责任心强，工作细致</li>
            <li>具备基本的文案写作能力</li>
            <li>有团队协作精神</li>
          </ul>
        </section>
      </div>
      </motion.div>
    </div>
  )
} 