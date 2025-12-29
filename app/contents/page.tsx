"use client"

import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import { useSidebar } from '@/components/SidebarContext'

export default function ContentsPage() {
  const { sidebarOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
      <Sidebar />
      <TopNav />

      <main className={`pt-16 pb-8 px-6 transition-all duration-300 ${
        sidebarOpen ? 'ml-[17%] w-[83%]' : 'ml-0 w-full'
      }`}>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Contents</h1>
          <p className="text-purple-300">콘텐츠 페이지입니다.</p>
        </div>
      </main>
    </div>
  )
}

