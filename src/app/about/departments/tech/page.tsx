'use client'

import { motion } from 'framer-motion'

export default function TechPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">技术宣传事务部</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">部门简介</h2>
          <p className="text-gray-700 leading-relaxed">
            技术宣传事务部主要负责深中模联宣传资料和模联周边产品的制作，公共信息与文件资料的管理、制作与发布，是决定深中模联对外形象的重要部门。技术部的日常事务主要是围绕设计二字进行的，从宣传海报、宣传视频，到会场上的国家牌与意向条，都需要技术部的精心设计。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">工作职责</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>设计制作宣传海报</li>
            <li>制作宣传视频</li>
            <li>设计会议周边产品</li>
            <li>制作会场物料（如国家牌、意向条等）</li>
            <li>管理和维护社团视觉形象</li>
            <li>记录活动精彩瞬间</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">你将获得</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>平面设计技能</li>
            <li>视频制作经验</li>
            <li>摄影摄像技巧</li>
            <li>设计软件使用能力</li>
            <li>创意思维培养</li>
            <li>项目管理经验</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary">加入要求</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>具备基本的审美能力</li>
            <li>对设计创作有热情</li>
            <li>愿意学习设计软件</li>
            <li>有责任心和团队精神</li>
            <li>能够按时完成设计任务</li>
          </ul>
        </section>
      </div>
    </motion.div>
  )
} 