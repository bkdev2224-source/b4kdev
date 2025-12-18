"use client"

import AuthButton from '@/components/AuthButton'
import POICarousel from '@/components/POICarousel'
import { getAllPOIs } from '@/lib/data'

export default function Home() {
  const allPOIs = getAllPOIs()

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">B-4K</h1>
          <AuthButton />
        </div>
      </header>

      <main className="w-full py-8">
        <div className="container mx-auto px-6 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">추천 장소</h2>
          <p className="text-gray-400">아래 카테고리를 탐색하여 원하는 K-Culture 여행지를 찾아보세요</p>
        </div>
        
        <div className="w-full px-6">
          <POICarousel pois={allPOIs} />
        </div>
      </main>
    </div>
  )
}

