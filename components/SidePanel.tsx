"use client"

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useState } from 'react'
import { getAllRoutes, getRouteById } from '@/lib/routes'
import { useSidebar } from './SidebarContext'
import { useRoute } from './RouteContext'

export default function SidePanel() {
  const pathname = usePathname()
  const params = useParams()
  const { sidebarOpen } = useSidebar()
  const { selectedRoute } = useRoute()
  const allRoutes = getAllRoutes()
  const [activeTab, setActiveTab] = useState<'home' | 'reviews' | 'photos' | 'info'>('home')
  
  // Check if we're on a route detail page
  const routeId = pathname?.startsWith('/maps/route/') ? params?.id as string : null
  const route = routeId ? getRouteById(routeId) : null
  
  // Priority: selectedRoute (from map click) > route (from URL)
  // No default route - panel only shows when marker is clicked or route page is visited
  const displayRoute = selectedRoute || route

  // Home page section list
  const homeSections = [
    { id: 'best-packages', name: 'B4K Best Packages', href: '#best-packages' },
    { id: 'editor-recommendations', name: 'Editor Recommendations', href: '#editor-recommendations' },
    { id: 'seoul-exploration', name: 'Explore Seoul', href: '#seoul-exploration' },
    { id: 'seasonal-recommendations', name: 'Seasonal Travel', href: '#seasonal-recommendations' },
  ]

  // Contents categories
  const contentCategories = [
    { id: 'kpop', name: 'K-Pop', href: '/contents?category=kpop' },
    { id: 'kbeauty', name: 'K-Beauty', href: '/contents?category=kbeauty' },
    { id: 'kfood', name: 'K-Food', href: '/contents?category=kfood' },
    { id: 'kfestival', name: 'K-Festival', href: '/contents?category=kfestival' },
  ]

  // Determine panel content based on current page
  const getPanelContent = () => {
    if (pathname === '/') {
      return {
        title: 'Sections',
        items: homeSections.map(section => ({
          ...section,
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )
        }))
      }
    // Routes list removed - map will be displayed instead
    } else if (pathname === '/contents' || pathname?.startsWith('/contents')) {
      return {
        title: 'Categories',
        items: contentCategories.map(category => ({
          ...category,
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          )
        }))
      }
    }
    return null
  }

  const panelContent = getPanelContent()

  // Determine if panel should be shown
  const isRoutesPage = pathname === '/maps' || pathname?.startsWith('/maps/route')
  
  // For routes page: show panel only if there's a route to display (from marker click or URL)
  // For other pages: show panel if sidebar is open and there's panel content
  const shouldShowRoutesPanel = isRoutesPage && displayRoute
  const shouldShowOtherPanel = !isRoutesPage && sidebarOpen && panelContent
  
  if (!shouldShowRoutesPanel && !shouldShowOtherPanel) {
    return null
  }

  const panelLeft = sidebarOpen ? 'calc(12.75% + 1px)' : 'calc(80px + 1px)'

  // If on route detail page or /maps page, show route details
  // Only show routes panel if we're actually on a routes page
  if (shouldShowRoutesPanel && displayRoute) {
    return (
      <div 
        className="w-96 bg-white border-r border-gray-200 h-screen fixed z-30 transition-all duration-300 lg:block hidden overflow-y-auto"
        style={{ left: panelLeft }}
      >
        <div className="flex flex-col h-full">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
            {routeId ? (
              <Link
                href="/maps"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            ) : (
              <div className="w-9" /> // Spacer when no back button
            )}
            <h1 className="text-base font-semibold text-gray-900 flex-1 text-center px-4 truncate">
              {displayRoute.name}
            </h1>
            {routeId ? (
              <Link
                href="/maps"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            ) : (
              <div className="w-9" /> // Spacer when no close button
            )}
          </div>

          {/* Map Preview */}
          <div className="relative h-48 bg-gray-200 flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500 text-sm">{displayRoute.startLocation.name}</p>
              </div>
            </div>
          </div>

          {/* Route Header */}
          <div className="px-4 py-4 bg-white flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{displayRoute.name}</h2>
            <p className="text-gray-600 text-sm mb-3">{displayRoute.description}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>Blog Reviews {displayRoute.blogReviews}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-4 flex gap-3 flex-shrink-0">
            <button className="flex-1 py-3 px-4 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
              Depart
            </button>
            <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Arrive
            </button>
          </div>

          {/* Functional Icons */}
          <div className="px-4 pb-4 flex gap-6 flex-shrink-0">
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-xs">Save</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">Street View</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-xs">Share</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-4 flex-shrink-0">
            <div className="flex gap-6">
              {(['home', 'reviews', 'photos', 'info'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === tab ? { borderBottomColor: '#62256e' } : {}}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-4 py-6 flex-1 overflow-y-auto">
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{displayRoute.startLocation.address}</p>
                    <button className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                      <span>More</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Directions/Transit */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">
                      From {displayRoute.startLocation.name}, take {displayRoute.transportation.join(', ')}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Distance: {displayRoute.distance} • Duration: {displayRoute.duration}
                    </p>
                    <button className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                      <span>More</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

              {/* Operating Hours */}
              {displayRoute.operatingHours && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{displayRoute.operatingHours}</p>
                      <button className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <span>More</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

              {/* Phone Number */}
              {displayRoute.phoneNumber && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 text-sm">{displayRoute.phoneNumber}</p>
                        <button className="text-primary text-xs font-medium" style={{ color: '#62256e' }}>Copy</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* More Information Button */}
                <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mt-4">
                  More Information &gt;
                </button>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-gray-500">Reviews coming soon</p>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="text-center py-12">
                <p className="text-gray-500">Photos coming soon</p>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Route Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Start:</span> {displayRoute.startLocation.name}</p>
                    <p><span className="font-medium">End:</span> {displayRoute.endLocation.name}</p>
                    <p><span className="font-medium">Distance:</span> {displayRoute.distance}</p>
                    <p><span className="font-medium">Duration:</span> {displayRoute.duration}</p>
                    <p><span className="font-medium">Difficulty:</span> {displayRoute.difficulty}</p>
                    <p><span className="font-medium">Transportation:</span> {displayRoute.transportation.join(', ')}</p>
                  </div>
                </div>
                {displayRoute.waypoints && displayRoute.waypoints.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Waypoints</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {displayRoute.waypoints.map((waypoint, idx) => (
                        <li key={idx}>{idx + 1}. {waypoint.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayRoute.category.map((cat, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default panel content (routes list, sections, categories)
  if (!panelContent) {
    return null
  }

  return (
    <div 
      className="w-64 bg-white border-r border-gray-200 h-screen fixed z-30 transition-all duration-300 lg:block hidden"
      style={{ left: panelLeft }}
    >
      <div className="p-6 h-full flex flex-col">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#62256e' }}>
          {panelContent.title}
        </h3>
        <nav className="flex-1 overflow-y-auto space-y-1">
          {panelContent.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                {item.icon}
              </span>
              <span className="text-sm font-medium flex-1">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

