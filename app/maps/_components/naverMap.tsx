"use client"

import { useEffect, useRef, useState } from 'react'
import type { POIJson as POI } from '@/types'
import { useSearchResult } from '@/components/providers/SearchContext'

interface NaverMapProps {
  center: number[] // [longitude, latitude]
  zoom?: number
  pois?: POI[]
  cartOrderMap?: Map<string, number> // POI ID -> cart order number
  hasSearchResult?: boolean // Whether there's an active search result
  showMapRoute?: boolean // Whether to show map route lines connecting cart items
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement | string, options?: {
          center?: any
          zoom?: number
        }) => any
        LatLng: new (lat: number, lng: number) => any
        Marker: new (options: {
          position: any
          map: any
          icon?: {
            url: string
            size?: any
            scaledSize?: any
            anchor?: any
          }
          title?: string
        }) => any
        Polyline: new (options: {
          path: any[]
          map: any
          strokeColor?: string
          strokeWeight?: number
          strokeOpacity?: number
        }) => any
        Size: new (width: number, height: number) => any
        Point: new (x: number, y: number) => any
        Event: {
          addListener: (target: any, event: string, handler: () => void) => void
          clearInstanceListeners: (target: any) => void
        }
      }
    }
  }
}

export default function NaverMap({ center, zoom = 16, pois = [], cartOrderMap = new Map(), hasSearchResult = false, showMapRoute = false }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const polylineRef = useRef<any>(null)
  const { setSearchResult } = useSearchResult()
  const [isReady, setIsReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Create numbered marker icon SVG data URL
  const createNumberedMarkerIcon = (number: number): string => {
    const svg = `
      <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 30 20 30s20-18.954 20-30C40 8.954 31.046 0 20 0z" fill="#62256e"/>
        <circle cx="20" cy="20" r="14" fill="white"/>
        <text x="20" y="26" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#62256e" text-anchor="middle">${number}</text>
      </svg>
    `
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
  }

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Wait until Naver Maps API is ready
  useEffect(() => {
    if (!isMounted) return
    setLoadError(null)

    let cancelled = false
    let attempts = 0
    const maxAttempts = 200 // 20s

    const checkNaverMaps = () => {
      if (cancelled) return

      if (window.naver?.maps?.Map && window.naver?.maps?.LatLng) {
        setIsReady(true)
        return
      }

      attempts += 1
      if (attempts >= maxAttempts) {
        setLoadError(
          'Naver Maps API가 준비되지 않았습니다. `app/layout.tsx`에서 Naver Maps SDK가 로드되는지 확인하세요.'
        )
        return
      }

      setTimeout(checkNaverMaps, 100)
    }

    checkNaverMaps()
    return () => {
      cancelled = true
    }
  }, [isMounted])

  // Initialize map - 공식 문서 예제 방식
  useEffect(() => {
    if (!isReady || !isMounted || !mapRef.current) return

    if (!window.naver || !window.naver.maps || !window.naver.maps.Map || !window.naver.maps.LatLng) {
      console.error('Naver Maps API is not available')
      return
    }

    // Clean up existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null
    }

    try {
      // 공식 문서 예제: var map = new naver.maps.Map(mapDiv, mapOptions)
      // center prop is [longitude, latitude], but Naver Maps LatLng expects (latitude, longitude)
      const [lng, lat] = center
      const mapOptions = {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: zoom
      }

      // 지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정
      const mapDiv = mapRef.current
      const map = new window.naver.maps.Map(mapDiv, mapOptions)

      mapInstanceRef.current = map
      console.log('Naver Maps initialized successfully')
    } catch (error) {
      console.error('Error initializing Naver Maps:', error)
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => {
        try {
          marker.setMap(null)
          if (window.naver?.maps?.Event) {
            window.naver.maps.Event.clearInstanceListeners(marker)
          }
        } catch (error) {
          // Ignore errors
        }
      })
      markersRef.current = []

      // Cleanup polyline
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null)
        } catch (error) {
          // Ignore errors
        }
        polylineRef.current = null
      }

      mapInstanceRef.current = null
    }
  }, [isReady, isMounted, center, zoom])

  // Draw map route line connecting cart items in order
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current || !window.naver?.maps || !showMapRoute) {
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null)
        } catch (error) {
          // Ignore errors
        }
        polylineRef.current = null
      }
      return
    }

    if (!cartOrderMap || cartOrderMap.size === 0 || !pois || pois.length === 0) {
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null)
        } catch (error) {
          // Ignore errors
        }
        polylineRef.current = null
      }
      return
    }

    try {
      // Get POIs in cart order
      const orderedPois: POI[] = []
      const orderToPoi = new Map<number, POI>()
      
      pois.forEach(poi => {
        if (!poi.location?.coordinates || poi.location.coordinates.length < 2) {
          return
        }
        
        const order = cartOrderMap.get(poi._id.$oid)
        if (order !== undefined) {
          orderToPoi.set(order, poi)
        }
      })

      const sortedOrders = Array.from(orderToPoi.keys()).sort((a, b) => a - b)
      sortedOrders.forEach(order => {
        const poi = orderToPoi.get(order)
        if (poi) orderedPois.push(poi)
      })

      if (orderedPois.length < 2) {
        if (polylineRef.current) {
          try {
            polylineRef.current.setMap(null)
          } catch (error) {
            // Ignore errors
          }
          polylineRef.current = null
        }
        return
      }

      // Create path array for polyline
      const path = orderedPois
        .filter(poi => poi.location?.coordinates && poi.location.coordinates.length >= 2)
        .map(poi => {
          const [lng, lat] = poi.location!.coordinates
          return new window.naver.maps.LatLng(lat, lng)
        })

      if (path.length < 2) {
        if (polylineRef.current) {
          try {
            polylineRef.current.setMap(null)
          } catch (error) {
            // Ignore errors
          }
          polylineRef.current = null
        }
        return
      }

      // Remove existing polyline
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null)
        } catch (error) {
          // Ignore errors
        }
      }

      // Create new polyline
      if (window.naver.maps.Polyline) {
        polylineRef.current = new window.naver.maps.Polyline({
          path: path,
          map: mapInstanceRef.current,
          strokeColor: '#62256e',
          strokeWeight: 4,
          strokeOpacity: 0.7
        })
      }
    } catch (error) {
      console.error('Error drawing map route:', error)
    }

    return () => {
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null)
        } catch (error) {
          // Ignore errors
        }
        polylineRef.current = null
      }
    }
  }, [isReady, showMapRoute, pois, cartOrderMap])

  // Add POI markers to map
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current || !window.naver?.maps || pois.length === 0) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      try {
        marker.setMap(null)
        if (window.naver?.maps?.Event) {
          window.naver.maps.Event.clearInstanceListeners(marker)
        }
      } catch (error) {
        // Ignore errors
      }
    })
    markersRef.current = []

    try {
      if (!window.naver.maps.Marker) {
        console.error('Naver Maps Marker is not available')
        return
      }

      // Add markers for each POI
      pois.forEach(poi => {
        if (!poi.location?.coordinates || poi.location.coordinates.length < 2) return

        // POI coordinates are [longitude, latitude] (GeoJSON format)
        // Naver Maps LatLng expects (latitude, longitude)
        const [lng, lat] = poi.location.coordinates

        try {
          const poiData = {
            name: poi.name,
            poiId: poi._id.$oid
          }

          // Determine marker icon: use numbered marker if in cart and no search result
          const cartOrder = !hasSearchResult ? cartOrderMap.get(poi._id.$oid) : undefined
          const markerOptions: any = {
            position: new window.naver.maps.LatLng(lat, lng),
            map: mapInstanceRef.current,
            title: poi.name
          }

          // If POI is in cart and no search result, use numbered marker
          if (cartOrder !== undefined) {
            const numberedIconUrl = createNumberedMarkerIcon(cartOrder)
            markerOptions.icon = {
              url: numberedIconUrl,
              size: new window.naver.maps.Size(40, 50),
              scaledSize: new window.naver.maps.Size(40, 50),
              anchor: new window.naver.maps.Point(20, 50)
            }
          }

          // Create marker
          const marker = new window.naver.maps.Marker(markerOptions)
          markersRef.current.push(marker)

          // Add click event listener
          window.naver.maps.Event.addListener(marker, 'click', () => {
            setSearchResult({
              name: poiData.name,
              type: 'poi',
              poiId: poiData.poiId
            })
          })
        } catch (markerError) {
          console.error(`Error creating marker for ${poi.name}:`, markerError)
        }
      })
    } catch (error) {
      console.error('Error adding POI markers:', error)
    }

    return () => {
      markersRef.current.forEach(marker => {
        try {
          marker.setMap(null)
          if (window.naver?.maps?.Event) {
            window.naver.maps.Event.clearInstanceListeners(marker)
          }
        } catch (error) {
          // Ignore errors
        }
      })
      markersRef.current = []
    }
  }, [isReady, pois, setSearchResult, cartOrderMap, hasSearchResult])

  // Update map center when center prop changes
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current || !window.naver?.maps) return

    try {
      const [lng, lat] = center
      mapInstanceRef.current.setCenter(new window.naver.maps.LatLng(lat, lng))
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

  // Loading state
  if (!isMounted || (!isReady && !loadError)) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-600 px-6">
          <p className="font-semibold">Naver Maps API Load Failed</p>
          <p className="text-sm mt-2">{loadError}</p>
        </div>
      </div>
    )
  }

  // Map container - 공식 문서 예제: <div id="map" style="width:100%;height:400px;"></div>
  return (
    <div 
      ref={mapRef} 
      id="map"
      style={{ width: '100%', height: '100%', minHeight: '400px' }} 
    />
  )
}
