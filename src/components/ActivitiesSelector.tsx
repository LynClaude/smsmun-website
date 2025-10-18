'use client'

import Link from 'next/link'

export default function ActivitiesSelector() {
  return (
    <Link
      href="/activities/leadership-summit"
      className="text-xs xl:text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors whitespace-nowrap"
    >
      活动与项目
    </Link>
  )
}
