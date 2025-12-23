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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">B-4K</h1>
          <AuthButton />
        </div>
      </header>

      <main className="w-full py-8">
        <div className="container mx-auto px-6 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">K-Culture 탐색</h2>
          <p className="text-purple-200">한국 문화 콘텐츠를 카테고리별로 탐색해보세요</p>
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
