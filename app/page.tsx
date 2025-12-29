"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import MainCarousel from '@/components/MainCarousel'
import BestPackages from '@/components/BestPackages'
import EditorRecommendations from '@/components/EditorRecommendations'
import SeoulExploration from '@/components/SeoulExploration'
import SeasonalRecommendations from '@/components/SeasonalRecommendations'
import { useSidebar } from '@/components/SidebarContext'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const { sidebarOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
      <Sidebar />
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'ml-[17%] w-[83%]' : 'ml-0 w-full'
      }`}>        
        {/* 메인 캐러셀 */}
        <MainCarousel />
        
        {/* B4K Best 패키지 추천 */}
        <BestPackages />
        
        {/* 에디터 추천 여행 */}
        <EditorRecommendations />
        
        {/* 서울 탐방하기 */}
        <SeoulExploration />
        
        {/* 시즌별 여행 추천 */}
        <SeasonalRecommendations />
      </main>
    </div>
  )
}
