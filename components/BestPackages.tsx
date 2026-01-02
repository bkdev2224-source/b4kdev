"use client"

import PackageCarousel from './PackageCarousel'
import { getAllPackages } from '@/lib/data'

export default function BestPackages() {
  const allPackages = getAllPackages()

  return (
    <section className="w-full py-16 bg-white">
      <div className="px-6">
        {/* 제목 섹션 - 중앙 정렬 with border lines */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-purple-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 px-8">
              B4K Best 패키지 추천
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500 to-purple-500"></div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl">최고의 K-컬처 여행 패키지</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-purple-50">
              모두 보기 →
            </button>
          </div>
        </div>

        <PackageCarousel packages={allPackages} />
      </div>
    </section>
  )
}

