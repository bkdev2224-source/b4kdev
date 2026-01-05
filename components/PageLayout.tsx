"use client"

import { ReactNode, useMemo } from 'react'
import { usePathname, useParams } from 'next/navigation'
import Sidebar from './Sidebar'
import SidePanel from './SidePanel'
import TopNav from './TopNav'
import POIGrid from './POIGrid'
import { useSearch } from './hooks/useSearch'
import { useLayout } from './hooks/useLayout'
import { useRoute } from './RouteContext'
import { getAllPOIs } from '@/lib/data'
import { getRouteById } from '@/lib/routes'

interface PageLayoutProps {
  children: ReactNode
  showSidePanel?: boolean
  sidePanelWidth?: 'default' | 'routes' | 'none'
  searchModeContent?: ReactNode
  className?: string
}

export default function PageLayout({
  children,
  showSidePanel = true,
  sidePanelWidth = 'default',
  searchModeContent,
  className = '',
}: PageLayoutProps) {
  const search = useSearch()
  const pathname = usePathname()
  const params = useParams()
  const { selectedRoute } = useRoute()
  
  // Determine route for side panel
  const routeId = pathname?.startsWith('/maps/route/') ? params?.id as string : null
  const routeFromUrl = routeId ? getRouteById(routeId) : null
  const displayRoute = selectedRoute || routeFromUrl
  
  // For routes pages, dynamically adjust sidePanelWidth based on route availability
  const effectiveSidePanelWidth = useMemo(() => {
    if (!showSidePanel) return 'none'
    
    // For routes pages, only reserve space if route is available
    const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
    if (isRoutesPage && sidePanelWidth === 'routes') {
      return displayRoute ? 'routes' : 'none'
    }
    
    return sidePanelWidth
  }, [showSidePanel, sidePanelWidth, pathname, displayRoute])
  
  const layout = useLayout({
    isSearchMode: search.isSearchMode,
    sidePanelWidth: effectiveSidePanelWidth,
  })

  // Default search content (POIGrid)
  const defaultSearchContent = (
    <div className="w-full pb-8">
      <POIGrid
        pois={getAllPOIs()}
        searchQuery={search.searchQuery}
        isSearchFocused={search.isSearchFocused}
        onSearchChange={search.handleSearchChange}
        onBack={search.handleSearchBack}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <SidePanel
        type={layout.sidePanelType}
        route={displayRoute || undefined}
        routeId={routeId || undefined}
        visible={layout.showSidePanel && !search.isSearchMode}
        sidebarOpen={layout.sidebarOpen}
      />
      <TopNav
        searchQuery={search.searchQuery}
        onSearchChange={search.handleSearchChange}
        onSearchFocus={search.handleSearchFocus}
        isSearchMode={search.isSearchMode}
        topNavClasses={layout.topNavClasses}
      />

      <main className={`pt-16 transition-all duration-300 ${layout.mainClasses} ${className}`}>
        {search.isSearchMode ? (
          searchModeContent || defaultSearchContent
        ) : (
          children
        )}
      </main>
    </div>
  )
}

