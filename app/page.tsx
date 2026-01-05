"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import SidePanel from '@/components/SidePanel'
import TopNav from '@/components/TopNav'
import MainCarousel from '@/components/MainCarousel'
import BestPackages from '@/components/BestPackages'
import EditorRecommendations from '@/components/EditorRecommendations'
import SeoulExploration from '@/components/SeoulExploration'
import SeasonalRecommendations from '@/components/SeasonalRecommendations'
import POIGrid from '@/components/POIGrid'
import { getAllPOIs } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { sidebarOpen } = useSidebar()
  const allPOIs = getAllPOIs()

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  // Removed blur event - must explicitly click home button or back button to go home
  // const handleSearchBlur = () => {
  //   // Only remove focus when there's no search query
  //   if (!searchQuery) {
  //     setIsSearchFocused(false)
  //   }
  // }

  const isSearchMode = isSearchFocused || searchQuery

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      {!isSearchMode && <SidePanel />}
      <TopNav 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
        onBackToHome={() => {
          setIsSearchFocused(false)
          setSearchQuery('')
        }}
        isSearchMode={isSearchMode}
      />

      <main className={`pt-16 transition-all duration-300 ${
        isSearchMode
          ? sidebarOpen 
            ? 'lg:ml-[12.75%] lg:w-[calc(100%-12.75%)]' 
            : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'
          : sidebarOpen 
            ? 'lg:ml-[calc(12.75%+16rem)] lg:w-[calc(100%-12.75%-16rem)]' 
            : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'
      }`}>
        {isSearchFocused || searchQuery ? (
          /* Search mode: Display POI grid */
          <div className="w-full pb-8">
            <POIGrid 
              pois={allPOIs} 
              searchQuery={searchQuery} 
              isSearchFocused={isSearchFocused}
              onSearchChange={setSearchQuery}
              onBack={() => {
                setIsSearchFocused(false)
                setSearchQuery('')
              }}
            />
          </div>
        ) : (
          /* Normal mode: Main page content */
          <>
            {/* Main carousel */}
            <MainCarousel />
            
            {/* B4K Best packages */}
            <BestPackages />
            
            {/* Editor recommendations */}
            <EditorRecommendations />
            
            {/* Explore Seoul */}
            <SeoulExploration />
            
            {/* Seasonal travel recommendations */}
            <SeasonalRecommendations />
          </>
        )}
      </main>
    </div>
  )
}
