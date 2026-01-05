/**
 * Layout calculation utilities
 * Centralized functions for calculating layout dimensions and classes
 */

// Layout constants
export const LAYOUT_CONSTANTS = {
  SIDEBAR_OPEN_WIDTH: '12.75%',
  SIDEBAR_CLOSED_WIDTH: '80px',
  SIDE_PANEL_DEFAULT_WIDTH: '16rem',
  SIDE_PANEL_ROUTES_WIDTH: '24rem',
} as const

export type SidePanelWidth = 'default' | 'routes' | 'none'

export interface LayoutConfig {
  sidebarOpen: boolean
  sidePanelWidth: SidePanelWidth
}

/**
 * Calculate main content margin-left and width classes
 */
export function getMainContentClasses(config: LayoutConfig): string {
  const { sidebarOpen, sidePanelWidth } = config
  const sidebarWidth = sidebarOpen 
    ? LAYOUT_CONSTANTS.SIDEBAR_OPEN_WIDTH 
    : LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH

  if (sidePanelWidth === 'none') {
    return sidebarOpen
      ? `lg:ml-[${sidebarWidth}] lg:w-[calc(100%-${sidebarWidth})]`
      : `lg:ml-[${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH}] lg:w-[calc(100%-${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH})]`
  }

  const panelWidth = sidePanelWidth === 'routes' 
    ? LAYOUT_CONSTANTS.SIDE_PANEL_ROUTES_WIDTH 
    : LAYOUT_CONSTANTS.SIDE_PANEL_DEFAULT_WIDTH

  return sidebarOpen
    ? `lg:ml-[calc(${sidebarWidth}+${panelWidth})] lg:w-[calc(100%-${sidebarWidth}-${panelWidth})]`
    : `lg:ml-[calc(${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH}+${panelWidth})] lg:w-[calc(100%-${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH}-${panelWidth})]`
}

/**
 * Calculate TopNav position classes
 */
export function getTopNavClasses(config: LayoutConfig): string {
  const { sidebarOpen, sidePanelWidth } = config
  const sidebarWidth = sidebarOpen 
    ? LAYOUT_CONSTANTS.SIDEBAR_OPEN_WIDTH 
    : LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH

  if (sidePanelWidth === 'none') {
    return sidebarOpen
      ? `lg:left-[${sidebarWidth}] lg:right-0`
      : `lg:left-[${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH}] lg:right-0`
  }

  const panelWidth = sidePanelWidth === 'routes' 
    ? LAYOUT_CONSTANTS.SIDE_PANEL_ROUTES_WIDTH 
    : LAYOUT_CONSTANTS.SIDE_PANEL_DEFAULT_WIDTH

  return sidebarOpen
    ? `lg:left-[calc(${sidebarWidth}+${panelWidth})] lg:right-0`
    : `lg:left-[calc(${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH}+${panelWidth})] lg:right-0`
}

/**
 * Calculate SidePanel position (left offset)
 */
export function getSidePanelLeft(sidebarOpen: boolean): string {
  return sidebarOpen 
    ? `calc(${LAYOUT_CONSTANTS.SIDEBAR_OPEN_WIDTH} + 1px)` 
    : `calc(${LAYOUT_CONSTANTS.SIDEBAR_CLOSED_WIDTH} + 1px)`
}

/**
 * Get SidePanel width class based on type
 */
export function getSidePanelWidthClass(type: 'home' | 'contents' | 'route' | null): string {
  return type === 'route' ? 'w-96' : 'w-64'
}

