"use client"

import AuthButton from '@/components/AuthButton'
import CategoryCarousel from '@/components/CategoryCarousel'
import { getKContentsByCategory } from '@/lib/data'

export default function Home() {
  const kpopContents = getKContentsByCategory('kpop')
  const kbeautyContents = getKContentsByCategory('kbeauty')
  const kfoodContents = getKContentsByCategory('kfood')
  const kfestivalContents = getKContentsByCategory('kfestival')

  return (
    <div className="min-h-screen bg-[#121212]">
      <header className="sticky top-0 z-50 bg-[#121212] bg-opacity-80 backdrop-blur-sm border-b border-transparent">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">B-4K</h1>
          <AuthButton />
        </div>
      </header>

      <main className="w-full py-8 bg-gradient-to-b from-[#121212] to-[#000000]">
        <div className="container mx-auto px-6 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">K-Culture 탐색</h2>
          <p className="text-gray-400">한국 문화 콘텐츠를 카테고리별로 탐색해보세요</p>
        </div>
        
        <div className="w-full">
          <CategoryCarousel title="K-Pop" items={kpopContents} />
          <CategoryCarousel title="K-Beauty" items={kbeautyContents} />
          <CategoryCarousel title="K-Food" items={kfoodContents} />
          <CategoryCarousel title="K-Festival" items={kfestivalContents} />
        </div>
      </main>
    </div>
  )
}
