import Image from 'next/image'
import PageTransition from '@/components/PageTransition'

export default function AlumniNetworkPage() {
  return (
    <PageTransition>
      <div className="min-h-screen relative flex items-center justify-center">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center max-w-2xl mx-4">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">校友交流</h1>
          <p className="text-xl text-gray-600">暂未开放</p>
        </div>
      </div>
    </PageTransition>
  )
} 