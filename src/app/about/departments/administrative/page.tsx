'use client'

import { motion } from 'framer-motion'

export default function AdministrativePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">行政管理事务部</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">部门简介</h2>
          <p className="text-gray-700 leading-relaxed">
            深中模联行政部主要负责日常活动的组织、财政管理和社团资源的筹划。无论是日常的社团活动、游园会，还是每年的PPRD，行政部都有着举足轻重的地位。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">工作阶段</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">培训期</h3>
              <p className="text-gray-700">
                熟悉各种文件写作规范，处理基础行政事务，如预约会议场地、采购物资等。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">游园会筹备</h3>
              <p className="text-gray-700">
                负责摊位申请、活动策划、物资准备，培养策划能力和应变能力。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">赞助寻求</h3>
              <p className="text-gray-700">
                与赞助商进行沟通和谈判，学习商务谈判技巧。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">PPRD筹备</h3>
              <p className="text-gray-700">
                负责大会场地预订、物资管理、财务规划等重要工作。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">你将获得</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>项目管理经验</li>
            <li>财务管理能力</li>
            <li>商务谈判技巧</li>
            <li>团队协作能力</li>
            <li>活动策划经验</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">加入要求</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>具备基本的组织协调能力</li>
            <li>有责任心和时间观念</li>
            <li>善于沟通和团队合作</li>
            <li>对活动策划和管理感兴趣</li>
          </ul>
        </section>
      </div>
    </motion.div>
  )
} 