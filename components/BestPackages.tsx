"use client"

import PackageCarousel from './PackageCarousel'
import { getAllPackages } from '@/lib/data'

export default function BestPackages() {
  const allPackages = getAllPackages()

  return (
    <div className="w-full px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            B4K Best 패키지 추천
          </h2>
          <p className="text-purple-300 text-lg">최고의 K-컬처 여행 패키지</p>
        </div>
        <button className="text-sm text-purple-300 hover:text-purple-200 font-medium transition-colors">
          모두 보기 →
        </button>
      </div>

      <PackageCarousel packages={allPackages} />
    </div>
  )
}

