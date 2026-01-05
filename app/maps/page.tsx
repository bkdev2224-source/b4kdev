"use client"

import PageLayout from '@/components/PageLayout'
import { getAllRoutes } from '@/lib/routes'
import { useRoute } from '@/components/RouteContext'

export default function MapsPage() {
  const allRoutes = getAllRoutes()
  const { selectedRoute, setSelectedRoute } = useRoute()

  const handleMarkerClick = (routeId: string) => {
    const route = allRoutes.find(r => r._id.$oid === routeId)
    if (route) {
      // Toggle: if clicking the same route, close the panel; otherwise, open it
      if (selectedRoute && selectedRoute._id.$oid === routeId) {
        setSelectedRoute(null)
      } else {
        setSelectedRoute(route)
      }
    }
  }

  return (
    <PageLayout showSidePanel={true} sidePanelWidth="routes">
      {/* Normal mode: Map will be displayed here */}
      <div className="h-[calc(100vh-4rem)] w-full bg-gray-100 relative">
        {/* Map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg">Map will be displayed here</p>
          </div>
        </div>
        
        {/* Clickable marker icons for testing */}
        {allRoutes.map((route) => {
          if (!route.mapData?.markers) return null
          
          return route.mapData.markers.map((marker, idx) => {
            // Convert coordinates to relative position (mock positioning)
            // In real implementation, this would use actual map coordinates
            const x = 30 + (idx * 20) + '%'
            const y = 40 + (idx * 15) + '%'
            
            return (
              <button
                key={`${route._id.$oid}-${marker.id}`}
                onClick={() => handleMarkerClick(route._id.$oid)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                style={{ left: x, top: y }}
                aria-label={`Click to view ${route.name}`}
                title={marker.title}
              >
                <div className="relative">
                  {marker.type === 'start' ? (
                    <svg className="w-10 h-10 text-green-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  ) : marker.type === 'end' ? (
                    <svg className="w-10 h-10 text-red-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 text-blue-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  )}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-lg">
                    {marker.title}
                  </div>
                </div>
              </button>
            )
          })
        })}
      </div>
    </PageLayout>
  )
}

