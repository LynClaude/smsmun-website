'use client'

import PageTransition from '@/components/PageTransition'

export default function DepartmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>
    </PageTransition>
  )
} 