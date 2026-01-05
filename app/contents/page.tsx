"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import SidePanel from '@/components/SidePanel'
import TopNav from '@/components/TopNav'
import POIGrid from '@/components/POIGrid'
import { getAllPOIs } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function ContentsPage() {
  const allPOIs = getAllPOIs()
  const { sidebarOpen } = useSidebar()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const isSearchMode = isSearchFocused || searchQuery

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      {!isSearchMode && <SidePanel />}
      <TopNav 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={handleSearchFocus}
        isSearchMode={isSearchMode}
      />

      <main className={`pt-16 pb-8 transition-all duration-300 ${
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
          /* Normal mode: Contents page content */
          <div className="px-6">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Contents</h1>
              <p className="text-purple-600">Contents page.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

