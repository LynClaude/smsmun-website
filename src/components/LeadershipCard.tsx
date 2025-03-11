'use client'

import React from 'react'

interface LeadershipCardProps {
  position: string
  name: string
  contact: string
}

export function LeadershipCard({ position, name, contact }: LeadershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{position}</h4>
      <p className="text-gray-600 mb-1">{name}</p>
      <p className="text-gray-500 text-sm">{contact}</p>
    </div>
  )
} 