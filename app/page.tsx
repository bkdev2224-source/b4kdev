"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import MainCarousel from '@/components/MainCarousel'
import POIGrid from '@/components/POIGrid'
import { getAllPOIs } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function Home() {
  const allPOIs = getAllPOIs()
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
        
        <div className="w-full pb-8">
          {/* POI 그리드 */}
          <POIGrid pois={allPOIs} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  )
}
