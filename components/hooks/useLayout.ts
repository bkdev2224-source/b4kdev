"use client"

import { useMemo } from 'react'
import { useSidebar } from '../SidebarContext'
import { useRoute } from '../RouteContext'
import { usePathname } from 'next/navigation'
import { 
  getMainContentClasses, 
  getTopNavClasses, 
  getSidePanelLeft,
  getSidePanelWidthClass,
  type SidePanelWidth 
} from '@/lib/utils/layout'

interface UseLayoutOptions {
  isSearchMode?: boolean
  sidePanelWidth?: SidePanelWidth
}

export function useLayout(options: UseLayoutOptions = {}) {
  const { sidebarOpen } = useSidebar()
  const { selectedRoute } = useRoute()
  const pathname = usePathname()
  const { isSearchMode = false, sidePanelWidth = 'default' } = options

  // Determine side panel width based on page type
  const effectiveSidePanelWidth = useMemo((): SidePanelWidth => {
    if (isSearchMode) return 'none'
    
    // Check if we're on routes page
    const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
    
    // For routes pages with 'routes' sidePanelWidth
    // Only use routes width if there's actually a route to display (dynamic panel)
    if (isRoutesPage && sidePanelWidth === 'routes') {
      // Check if we have a route from URL (route detail page) or selected route (marker click)
      const hasRouteFromUrl = pathname?.startsWith('/maps/route')
      if (selectedRoute || hasRouteFromUrl) {
        return 'routes' // 24rem - only when route is available
      }
      return 'none' // No space reserved until route is selected
    }
    
    if (sidePanelWidth === 'none') return 'none'
    
    // Default: check if side panel should be shown (fixed panel)
    const shouldShowPanel = sidebarOpen && (
      pathname === '/' || 
      pathname === '/contents' || 
      pathname?.startsWith('/contents')
    )
    
    return shouldShowPanel ? 'default' : 'none' // 16rem or none
  }, [isSearchMode, sidePanelWidth, pathname, selectedRoute, sidebarOpen])

  // Calculate main content margin and width using utility function
  const mainClasses = useMemo(() => {
    return getMainContentClasses({
      sidebarOpen,
      sidePanelWidth: effectiveSidePanelWidth,
    })
  }, [sidebarOpen, effectiveSidePanelWidth])

  // Calculate TopNav position using utility function
  const topNavClasses = useMemo(() => {
    return getTopNavClasses({
      sidebarOpen,
      sidePanelWidth: effectiveSidePanelWidth,
    })
  }, [sidebarOpen, effectiveSidePanelWidth])

  // Determine side panel type
  const sidePanelType = useMemo(() => {
    if (isSearchMode) return null
    
    const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
    
    // For routes pages with 'routes' sidePanelWidth
    if (isRoutesPage && sidePanelWidth === 'routes') {
      // Show route panel if:
      // 1. There's a selected route (from marker click), OR
      // 2. We're on a route detail page (from URL - PageLayout will pass the route)
      if (selectedRoute || pathname?.startsWith('/maps/route')) {
        return 'route'
      }
      return null
    }
    
    if (sidePanelWidth === 'none') return null
    
    // Default: check if side panel should be shown
    const shouldShowPanel = sidebarOpen && (
      pathname === '/' || 
      pathname === '/contents' || 
      pathname?.startsWith('/contents')
    )
    
    if (!shouldShowPanel) return null
    
    if (pathname === '/') return 'home'
    if (pathname === '/contents' || pathname?.startsWith('/contents')) return 'contents'
    
    return null
  }, [isSearchMode, sidePanelWidth, pathname, selectedRoute, sidebarOpen])

  // Calculate side panel left position
  const sidePanelLeft = useMemo(() => {
    return getSidePanelLeft(sidebarOpen)
  }, [sidebarOpen])

  // Get side panel width class
  const sidePanelWidthClass = useMemo(() => {
    return getSidePanelWidthClass(sidePanelType)
  }, [sidePanelType])

  // Determine if side panel should be visible
  // For fixed panels: based on sidebar state and pathname
  // For dynamic panels (routes): only when route is available
  const showSidePanel = useMemo(() => {
    if (effectiveSidePanelWidth === 'none') return false
    
    // For routes pages, only show if there's a route
    const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
    if (isRoutesPage && sidePanelWidth === 'routes') {
      const hasRouteFromUrl = pathname?.startsWith('/maps/route')
      return !!(selectedRoute || hasRouteFromUrl)
    }
    
    // For fixed panels, show based on sidebar state
    return true
  }, [effectiveSidePanelWidth, pathname, sidePanelWidth, selectedRoute])

  return {
    sidebarOpen,
    effectiveSidePanelWidth,
    mainClasses,
    topNavClasses,
    showSidePanel,
    sidePanelType,
    sidePanelLeft,
    sidePanelWidthClass,
  }
}

