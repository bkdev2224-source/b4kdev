"use client"

import { useEffect, useRef, useState } from 'react'
import { POI } from '@/lib/data'
import { useSearchResult } from './SearchContext'

interface TMapProps {
  center: number[] // [longitude, latitude]
  zoom?: number
  pois?: POI[]
}

declare global {
  interface Window {
    Tmapv3: {
      Map: new (element: HTMLElement | string, options: {
        center: any
        width: string
        height: string
        zoom: number
      }) => any
      LatLng: new (lat: number, lng: number) => any
      Marker: new (options: {
        position: any
        map: any
        icon?: string
        iconSize?: any
        title?: string
      }) => any
      Size: new (width: number, height: number) => any
    }
  }
}

export default function TMap({ center, zoom = 16, pois = [] }: TMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const { setSearchResult } = useSearchResult()
  const [isReady, setIsReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Wait until Tmapv3 is ready.
  // The Vector SDK script is loaded in `app/layout.tsx` <head> during initial HTML parse
  // to avoid `document.write` async-load errors.
  useEffect(() => {
    if (!isMounted) return
    setLoadError(null)

    let cancelled = false
    let attempts = 0
    const maxAttempts = 200 // 20s

    const tick = () => {
      if (cancelled) return

      if (window.Tmapv3?.Map && window.Tmapv3?.LatLng) {
        setIsReady(true)
        return
      }

      attempts += 1
      if (attempts >= maxAttempts) {
        setLoadError(
          'TMAP Vector SDK가 준비되지 않았습니다. `app/layout.tsx`에서 Vector SDK <script>가 head에 로드되는지(키 포함) 확인하세요.'
        )
        return
      }

      setTimeout(tick, 100)
    }

    tick()
    return () => {
      cancelled = true
    }
  }, [isMounted])

  // Initialize map - equivalent to initTmap() function
  // Only runs after script is fully loaded and Tmapv3 is ready
  useEffect(() => {
    if (!isReady || !isMounted || !mapRef.current) return

    // Double check Tmapv3 is available
    if (!window.Tmapv3 || !window.Tmapv3.Map || !window.Tmapv3.LatLng) {
      console.error('Tmapv3 is not available when trying to initialize map')
      return
    }

    // Clean up existing map instance
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.destroy()
      } catch (error) {
        // Ignore errors during cleanup
      }
      mapInstanceRef.current = null
    }

    try {
      // Create map instance - following the HTML sample exactly
      // center prop is [longitude, latitude], but Tmapv3.LatLng expects (latitude, longitude)
      const [lng, lat] = center
      const map = new window.Tmapv3.Map(mapRef.current, {
        center: new window.Tmapv3.LatLng(lat, lng),
        width: "100%",
        height: "100%",
        zoom: zoom
      })

      mapInstanceRef.current = map
      console.log('TMAP map initialized successfully')
    } catch (error) {
      console.error('Error initializing TMAP Vector Map:', error)
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => {
        try {
          marker.setMap(null)
        } catch (error) {
          // Ignore errors
        }
      })
      markersRef.current = []

      // Cleanup on unmount
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy()
        } catch (error) {
          // Ignore errors
        }
        mapInstanceRef.current = null
      }
    }
  }, [isReady, isMounted, center, zoom])

  // Add POI markers to map
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current || !window.Tmapv3 || pois.length === 0) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      try {
        marker.setMap(null)
      } catch (error) {
        // Ignore errors
      }
    })
    markersRef.current = []

    try {
      // Check if Marker is available
      if (!window.Tmapv3.Marker) {
        console.error('Tmapv3.Marker is not available')
        return
      }

      // Helper function to calculate distance between two coordinates
      const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const R = 6371e3 // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180
        const φ2 = lat2 * Math.PI / 180
        const Δφ = (lat2 - lat1) * Math.PI / 180
        const Δλ = (lng2 - lng1) * Math.PI / 180

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        return R * c
      }

      // Store POI data for click handlers
      const poiDataMap = new Map<string, { name: string; poiId: string }>()

      // Add markers for each POI
      pois.forEach(poi => {
        if (!poi.location?.coordinates || poi.location.coordinates.length < 2) return

        // POI coordinates are [longitude, latitude] (GeoJSON format)
        // TMapv3.LatLng expects (latitude, longitude)
        const [lng, lat] = poi.location.coordinates

        try {
          // Store POI data
          const poiData = {
            name: poi.name,
            poiId: poi._id.$oid
          }
          poiDataMap.set(poi._id.$oid, poiData)

          // Create marker with minimal options - use default marker icon
          // Don't set title to prevent tooltip from appearing
          const marker = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(lat, lng),
            map: mapInstanceRef.current
            // title is not set - tooltip will not appear
          })
          
          // Store POI name in marker object for identification
          ;(marker as any).poiName = poi.name

          // Store marker with POI data
          ;(marker as any).poiData = poiData
          markersRef.current.push(marker)
        } catch (markerError) {
          console.error(`Error creating marker for ${poi.name}:`, markerError)
        }
      })


      // Function to attach click events to marker DOM elements
      const attachMarkerClickEvents = () => {
        if (!mapRef.current) return

        // Instead of finding by title, attach click handlers directly to marker objects
        // and then find their DOM elements
        markersRef.current.forEach((marker: any) => {
          const poiName = (marker as any).poiName
          if (!poiName) return
          
          // Skip if already has click handler
          if ((marker as any).__domClickHandlerAdded) return
          
          // Try to find DOM element for this marker
          // TMapv3 markers are typically rendered as images or divs
          setTimeout(() => {
            if (!mapRef.current) return
            
            // Find all potential marker elements
            const allElements = mapRef.current.querySelectorAll('img, div')
            allElements.forEach((element: Element) => {
              // Skip if already processed
              if ((element as any).__poiClickHandler) return
              
              // Check if this element is near the marker's position
              // We'll use a simpler approach: attach click to marker object directly
            })
          }, 100)
        })

        // Alternative approach: attach click to map and find nearest marker
        // But we already tried that... Let's use marker objects directly
        markersRef.current.forEach((marker: any, index: number) => {
          if ((marker as any).__clickHandlerAdded) return
          
          const poiData = (marker as any).poiData
          if (!poiData) return

          // Try to add click listener to marker object
          if (marker && typeof marker.addListener === 'function') {
            try {
              marker.addListener('click', () => {
                console.log('Marker clicked:', poiData.name)
                setSearchResult({
                  name: poiData.name,
                  type: 'poi',
                  poiId: poiData.poiId
                })
              })
              ;(marker as any).__clickHandlerAdded = true
            } catch (e) {
              console.warn('Could not add listener to marker:', e)
            }
          } else if (marker && typeof marker.on === 'function') {
            try {
              marker.on('click', () => {
                console.log('Marker clicked:', poiData.name)
                setSearchResult({
                  name: poiData.name,
                  type: 'poi',
                  poiId: poiData.poiId
                })
              })
              ;(marker as any).__clickHandlerAdded = true
            } catch (e) {
              console.warn('Could not add on handler to marker:', e)
            }
          }
        })

        // Also try DOM-based approach for elements that might be markers
        setTimeout(() => {
          if (!mapRef.current) return
          
          // Find elements that might be marker images or containers
          const markerElements = mapRef.current.querySelectorAll('img[src*="marker"], img[src*="pin"], div[style*="position: absolute"]')
          
          markerElements.forEach((element: Element) => {
            if ((element as any).__poiClickHandler) return

            // Try to match by position - find nearest POI
            const rect = element.getBoundingClientRect()
            const mapRect = mapRef.current!.getBoundingClientRect()
            
            // Add click handler that removes title
            const title = element.getAttribute('title')
            if (title) {
              const matchingPoi = pois.find(p => p.name === title)
              if (matchingPoi) {
                const poiData = poiDataMap.get(matchingPoi._id.$oid)
                if (poiData) {
                  const clickHandler = (e: Event) => {
                    e.stopPropagation()
                    e.preventDefault()
                    console.log('Marker clicked (DOM):', poiData.name)
                    setSearchResult({
                      name: poiData.name,
                      type: 'poi',
                      poiId: poiData.poiId
                    })
                  }
                  
                  element.addEventListener('click', clickHandler, true)
                  ;(element as any).__poiClickHandler = true
                }
              }
            }
          })
        }, 500)
      }

      // Try to attach events immediately and after delays
      attachMarkerClickEvents()
      setTimeout(attachMarkerClickEvents, 300)
      setTimeout(attachMarkerClickEvents, 1000)

      // Add map click handler (optional - for future use)
      const handleMapClick = () => {
        // Can be used for other purposes if needed
      }

      let mapClickListener: any = null
      if (mapInstanceRef.current) {
        if (typeof mapInstanceRef.current.addListener === 'function') {
          mapClickListener = mapInstanceRef.current.addListener('click', handleMapClick)
        } else if (typeof mapInstanceRef.current.on === 'function') {
          mapInstanceRef.current.on('click', handleMapClick)
          mapClickListener = true
        }
      }

      // Use MutationObserver to catch dynamically added markers
      const observer = new MutationObserver(() => {
        attachMarkerClickEvents()
      })

      if (mapRef.current) {
        observer.observe(mapRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['title']
        })
      }

      // Cleanup function
      return () => {
        observer.disconnect()
        if (mapClickListener && mapInstanceRef.current) {
          if (typeof mapInstanceRef.current.removeListener === 'function') {
            mapInstanceRef.current.removeListener(mapClickListener)
          } else if (typeof mapInstanceRef.current.off === 'function') {
            mapInstanceRef.current.off('click', handleMapClick)
          }
        }
      }

      console.log(`Added ${markersRef.current.length} POI markers to map`)
    } catch (error) {
      console.error('Error adding POI markers:', error)
    }

    return () => {
      // Cleanup markers when POIs change
      markersRef.current.forEach(marker => {
        try {
          marker.setMap(null)
        } catch (error) {
          // Ignore errors
        }
      })
      markersRef.current = []
    }
  }, [isReady, pois, setSearchResult])

  // Update map center when center prop changes
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current || !window.Tmapv3) return

    try {
      const [lng, lat] = center
      mapInstanceRef.current.setCenter(new window.Tmapv3.LatLng(lat, lng))
    } catch (error) {
      console.error('Error updating map center:', error)
    }
  }, [center, isReady])

  // Update zoom when zoom prop changes
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current) return

    try {
      mapInstanceRef.current.setZoom(zoom)
    } catch (error) {
      console.error('Error updating map zoom:', error)
    }
  }, [zoom, isReady])

  // Don't render until mounted (prevents hydration mismatch)
  if (!isMounted || (!isReady && !loadError)) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">지도를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-600 px-6">
          <p className="font-semibold">TMAP 스크립트 로드 실패</p>
          <p className="text-sm mt-2">{loadError}</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      id="map_div"
      style={{ width: '100%', height: '100%', minHeight: '400px' }} 
    />
  )
}
