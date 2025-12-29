"use client"

import Link from 'next/link'
import AuthButton from './AuthButton'
import { useSidebar } from './SidebarContext'

interface TopNavProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export default function TopNav({ searchQuery = '', onSearchChange }: TopNavProps) {
  const { sidebarOpen, toggleSidebar } = useSidebar()

  return (
    <>
      <div className={`bg-black bg-opacity-30 backdrop-blur-sm h-16 fixed top-0 z-40 flex items-center gap-4 px-6 border-b border-purple-500/20 transition-all duration-300 ${
        sidebarOpen ? 'left-[17%] right-0' : 'left-0 right-0'
      }`}>
        {/* 햄버거 버튼과 B-4K 홈 버튼 - 항상 표시 (사이드바가 열려있을 때는 투명하게 처리, 닫힐 때는 즉시 나타남) */}
        <div className={`flex items-center gap-4 transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          {/* 햄버거 버튼 - YouTube 스타일 (항상 세 개의 수평선) */}
          <button
            onClick={toggleSidebar}
            className="p-2 text-white hover:bg-purple-900/30 rounded-full transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* B-4K 홈 버튼 */}
          <Link
            href="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-colors cursor-pointer"
          >
            B-4K
          </Link>
        </div>

        {/* AuthButton - 맨 오른쪽 고정 */}
        <div className="flex items-center ml-auto">
          <AuthButton />
        </div>
      </div>
      
      {/* 검색창 - 화면 전체 기준으로 중앙에 고정 (사이드바 영향 없음) */}
      {onSearchChange && (
        <div className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-full max-w-2xl pointer-events-none">
          <div className="relative pointer-events-auto">
            <input
              type="text"
              placeholder="FIND YOUR KOREA"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-6 py-2 pl-12 bg-purple-900/60 border-2 border-purple-500/40 rounded-xl text-white text-sm placeholder-purple-300/60 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/40 transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  )
}

