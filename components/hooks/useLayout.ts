"use client"

import { useMemo } from 'react'
import { useSidebar } from '../SidebarContext'
import { useRoute } from '../RouteContext'
import { useSearchResult } from '../SearchContext'
import { useCart } from '../CartContext'
import { usePathname, useParams } from 'next/navigation'
import { 
  getMainContentClasses, 
  getTopNavClasses, 
  getSidePanelLeft,
  getSidePanelWidthClass,
  type SidePanelWidth 
} from '@/lib/utils/layout'
import { getRouteById } from '@/lib/routes'

interface UseLayoutOptions {
  isSearchMode?: boolean
  showSidePanel?: boolean
  sidePanelWidth?: SidePanelWidth
}

export function useLayout(options: UseLayoutOptions = {}) {
  const { sidebarOpen } = useSidebar()
  const { selectedRoute } = useRoute()
  const { searchResult } = useSearchResult()
  const { cartItems } = useCart()
  const pathname = usePathname()
  const params = useParams()
  const { 
    isSearchMode = false, 
    showSidePanel = true,
    sidePanelWidth = 'default' 
  } = options

  // Determine route for side panel
  const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
  const routeId = pathname?.startsWith('/maps/route/') ? params?.id as string : null
  const routeFromUrl = routeId ? getRouteById(routeId) : null
  const hasRoute = !!(selectedRoute || routeFromUrl)

  // Calculate effective side panel width
  const effectiveSidePanelWidth = useMemo((): SidePanelWidth => {
    // If panel is disabled, return none
    if (!showSidePanel) return 'none'
    
    // For search results on Maps page, use routes width
    if (isRoutesPage && searchResult) {
      return 'routes'
    }
    
    // For cart on Maps page, use routes width
    if (isRoutesPage && !searchResult) {
      const poiCartItems = cartItems.filter(item => item.type === 'poi')
      if (poiCartItems.length > 0) {
        return 'routes'
      }
    }
    
    // For routes pages with 'routes' width
    if (isRoutesPage && sidePanelWidth === 'routes') {
      // Maps page exception: show route panel as an overlay (do NOT shrink map/main)
      return 'none'
    }
    
    // For fixed panels (default), always show on pages that actually have a panel (regardless of sidebar state)
    if (sidePanelWidth === 'default') {
      const supportsDefaultPanel =
        pathname === '/' || pathname === '/contents' || pathname?.startsWith('/contents')
      return supportsDefaultPanel ? 'default' : 'none'
    }
    
    return sidePanelWidth
  }, [showSidePanel, sidePanelWidth, isRoutesPage, hasRoute, sidebarOpen, pathname, searchResult, cartItems])

  // Determine side panel type
  const sidePanelType = useMemo(() => {
    // For search results on Maps page
    if (isRoutesPage && searchResult) {
      return 'search'
    }
    
    // For cart on Maps page (if cart has items and no search result)
    if (isRoutesPage && !searchResult) {
      const poiCartItems = cartItems.filter(item => item.type === 'poi')
      if (poiCartItems.length > 0) {
        return 'cart'
      }
    }
    
    // For routes pages
    if (isRoutesPage && sidePanelWidth === 'routes' && hasRoute) {
      return 'route'
    }
    
    // For fixed panels (always show regardless of sidebar state)
    if (sidePanelWidth === 'default') {
      if (pathname === '/') return 'home'
      if (pathname === '/contents' || pathname?.startsWith('/contents')) return 'contents'
    }
    
    return null
  }, [isRoutesPage, sidePanelWidth, hasRoute, sidebarOpen, pathname, searchResult, cartItems])

  // Calculate main content classes
  const mainClasses = useMemo(() => {
    return getMainContentClasses({
      sidebarOpen,
      sidePanelWidth: effectiveSidePanelWidth,
    })
  }, [sidebarOpen, effectiveSidePanelWidth])

  // Calculate TopNav classes
  const topNavClasses = useMemo(() => {
    return getTopNavClasses({
      sidebarOpen,
      sidePanelWidth: effectiveSidePanelWidth,
    })
  }, [sidebarOpen, effectiveSidePanelWidth])

  // Side panel visibility (routes panel overlays on maps page even when effective width is 'none')
  const showSidePanelVisible =
    !!showSidePanel &&
    sidePanelType !== null &&
    (sidePanelType === 'route' || sidePanelType === 'search' || sidePanelType === 'cart' ? true : effectiveSidePanelWidth !== 'none')

  // Get display route for side panel
  const displayRoute = selectedRoute || routeFromUrl || null

  return {
    sidebarOpen,
    effectiveSidePanelWidth,
    mainClasses,
    topNavClasses,
    showSidePanel: showSidePanelVisible,
    sidePanelType,
    sidePanelLeft: getSidePanelLeft(sidebarOpen),
    sidePanelWidthClass: getSidePanelWidthClass(sidePanelType),
    displayRoute,
    routeId,
  }
}
