"use client"

import { useMemo } from 'react'
import PageLayout from '@/components/PageLayout'
import { getAllRoutes } from '@/lib/routes'
import { useRoute } from '@/components/RouteContext'
import { useSearchResult } from '@/components/SearchContext'
import TMap from '@/components/TMap'
import { getAllPOIs, getPOIById, getKContentsBySubName } from '@/lib/data'

export default function MapsPage() {
  const allRoutes = getAllRoutes()
  const { selectedRoute, setSelectedRoute } = useRoute()
  const { searchResult } = useSearchResult()
  const allPOIs = getAllPOIs()

  // Get POIs to display based on search result
  const displayPOIs = useMemo(() => {
    if (!searchResult) {
      // No search: show all POIs
      return allPOIs
    }

    if (searchResult.type === 'poi' && searchResult.poiId) {
      // POI search: show only the searched POI
      const poi = getPOIById(searchResult.poiId)
      return poi ? [poi] : []
    }

    if (searchResult.type === 'content' && searchResult.subName) {
      // Content search: show POIs related to the content
      const contents = getKContentsBySubName(searchResult.subName)
      const poiIds = new Set(contents.map(c => c.poiId.$oid))
      return allPOIs.filter(poi => poiIds.has(poi._id.$oid))
    }

    return allPOIs
  }, [searchResult, allPOIs])

  // Calculate map center: prioritize search result POI, then selected route, then default
  const mapCenter = useMemo(() => {
    // If searching for a POI, center on that POI
    if (searchResult?.type === 'poi' && searchResult.poiId) {
      const poi = getPOIById(searchResult.poiId)
      if (poi?.location?.coordinates && poi.location.coordinates.length >= 2) {
        return poi.location.coordinates as [number, number]
      }
    }

    // If searching for content, center on first related POI
    if (searchResult?.type === 'content' && searchResult.subName) {
      const contents = getKContentsBySubName(searchResult.subName)
      if (contents.length > 0) {
        const firstPoi = getPOIById(contents[0].poiId.$oid)
        if (firstPoi?.location?.coordinates && firstPoi.location.coordinates.length >= 2) {
          return firstPoi.location.coordinates as [number, number]
        }
      }
    }

    // Use selected route center if available
    if (selectedRoute?.mapData?.center) {
      return selectedRoute.mapData.center
    }
    if (allRoutes.length > 0 && allRoutes[0].mapData?.center) {
      return allRoutes[0].mapData.center
    }
    // Default to Seoul center
    return [127.0276, 37.4980]
  }, [searchResult, selectedRoute, allRoutes])

  // Calculate map zoom: use higher zoom for search results
  const mapZoom = useMemo(() => {
    // If searching, use higher zoom level
    if (searchResult) {
      return 16
    }
    // Use selected route zoom if available
    if (selectedRoute?.mapData?.zoom) {
      return selectedRoute.mapData.zoom
    }
    return 13
  }, [searchResult, selectedRoute])

  return (
    <PageLayout showSidePanel={true} sidePanelWidth="routes">
      {/* Map-only exception: map is a fixed background layer; sidebar/sidepanel overlay on top. */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <TMap center={mapCenter} zoom={mapZoom} pois={displayPOIs} />

        {/* Map-only: Side panel overlay toggle button for testing */}
      </div>
    </PageLayout>
  )
}

