"use client"

import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import PackageCarousel from '@/components/PackageCarousel'
import { getAllPackages } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function PackagePage() {
  const allPackages = getAllPackages()
  const { sidebarOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
      <Sidebar />
      <TopNav />

      <main className={`pt-16 pb-8 transition-all duration-300 ${
        sidebarOpen ? 'ml-[17%] w-[83%]' : 'ml-0 w-full'
      }`}>        
        <div className="w-full">
          {/* 패키지 추천 섹션 */}
          <PackageCarousel packages={allPackages} />
        </div>
      </main>
    </div>
  )
}

