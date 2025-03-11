'use client'

import PageTransition from './PageTransition'

export default function ComingSoon() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1a237e] flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">敬请期待</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            我们正在努力建设这个页面，很快就能与您见面
          </p>
        </div>
      </div>
    </PageTransition>
  )
} 