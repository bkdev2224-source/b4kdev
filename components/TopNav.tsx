"use client"

import AuthButton from './AuthButton'
import { useSidebar } from './SidebarContext'
import { usePathname } from 'next/navigation'
import { useRoute } from './RouteContext'

interface TopNavProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onSearchFocus?: () => void
  onBackToHome?: () => void
  isSearchMode?: boolean
}

export default function TopNav({ searchQuery = '', onSearchChange, onSearchFocus, onBackToHome, isSearchMode = false }: TopNavProps) {
  const { sidebarOpen } = useSidebar()
  const pathname = usePathname()
  const { selectedRoute } = useRoute()
  
  // Check if side panel should be displayed on current page
  // Hide side panel when in search mode
  const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
  // For routes page, only show panel if there's a selected route or we're on a route detail page
  const hasRoutePanel = !isSearchMode && isRoutesPage && (selectedRoute || pathname?.startsWith('/maps/route'))
  const showSidePanel = !isSearchMode && ((sidebarOpen && (pathname === '/' || pathname === '/contents' || pathname?.startsWith('/contents'))) || hasRoutePanel)

  return (
    <>
      <div className={`h-16 fixed top-0 z-40 flex items-center gap-4 px-6 transition-all duration-300 ${
        showSidePanel 
          ? hasRoutePanel
            ? sidebarOpen
              ? 'lg:left-[calc(12.75%+24rem)] lg:right-0'
              : 'lg:left-[calc(80px+24rem)] lg:right-0'
            : 'lg:left-[calc(12.75%+16rem)] lg:right-0'
          : sidebarOpen 
            ? 'lg:left-[12.75%] lg:right-0' 
            : 'lg:left-[80px] lg:right-0'
      }`}>
        {/* Favorites button and AuthButton - fixed to the right */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Favorites button */}
          <button
            onClick={() => {
              // TODO: Navigate to favorites page or open modal
              console.log('Favorites clicked')
            }}
            className="p-2 rounded-full transition-colors hover-primary"
            style={{ color: '#62256e' }}
            aria-label="Favorites"
            title="Favorites"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
          
          <AuthButton />
        </div>
      </div>
      
      {/* Search box - fixed to center of screen (not affected by sidebar) - always visible */}
      <div className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-full max-w-[470px] pointer-events-none">
        <div className="relative pointer-events-auto">
          <input
            type="text"
            placeholder="FIND YOUR KOREA"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange?.(e.target.value)
            }}
            onFocus={() => {
              onSearchFocus?.()
            }}
            className="w-full px-6 py-2 pl-12 rounded-full text-white text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300/50 transition-all"
            style={{ backgroundColor: '#62256e' }}
          />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
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
    </>
  )
}

