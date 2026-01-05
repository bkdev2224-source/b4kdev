"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import PackageCarousel from '@/components/PackageCarousel'
import POIGrid from '@/components/POIGrid'
import { getAllPackages, getAllPOIs } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function PackagePage() {
  const allPackages = getAllPackages()
  const allPOIs = getAllPOIs()
  const { sidebarOpen } = useSidebar()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <TopNav 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
      />

      <main className={`pt-16 pb-8 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-[12.75%] lg:w-[calc(100%-12.75%)]' : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'
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
          /* Normal mode: Package page content */
          <div className="w-full">
            {/* Recommended packages section */}
            <PackageCarousel packages={allPackages} />
          </div>
        )}
      </main>
    </div>
  )
}

