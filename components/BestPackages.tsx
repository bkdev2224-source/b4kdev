"use client"

import PackageCarousel from './PackageCarousel'
import { getAllPackages } from '@/lib/data'

export default function BestPackages() {
  const allPackages = getAllPackages()

  return (
    <section className="w-full py-16 bg-gradient-to-br from-purple-800/40 via-purple-700/30 to-pink-800/40 relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-6">
        {/* 제목 섹션 - 중앙 정렬 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            B4K Best 패키지 추천
          </h2>
          <p className="text-purple-200 text-lg md:text-xl">최고의 K-컬처 여행 패키지</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-purple-300 hover:text-purple-200 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/20">
              모두 보기 →
            </button>
          </div>
        </div>

        <PackageCarousel packages={allPackages} />
      </div>
    </section>
  )
}

