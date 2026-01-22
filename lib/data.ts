import poisData from '@/mockupdata/pois.json'
import packagesData from '@/mockupdata/packages.json'

export interface POI {
  _id: { $oid: string }
  name: string
  address: string
  location: {
    type: string
    coordinates: number[]
  }
  categoryTags: string[]
  openingHours: string
  entryFee: string
  needsReservation: boolean
}

export interface KContent {
  subName: string
  poiId: { $oid: string }
  spotName: string
  description: string
  tags: string[]
  popularity?: number
  [key: string]: any
}

export function getAllPOIs(): POI[] {
  return poisData as POI[]
}

export function getPOIById(poiId: string): POI | undefined {
  return (poisData as POI[]).find((poi) => poi._id.$oid === poiId)
}

// K-Content가 어떤 카테고리에 속하는지 확인
export function getContentCategory(content: KContent): 'kpop' | 'kbeauty' | 'kfood' | 'kfestival' | null {
  // content 객체에 category 필드가 있으면 사용
  if ('category' in content && content.category) {
    return content.category as 'kpop' | 'kbeauty' | 'kfood' | 'kfestival'
  }
  return null
}

export interface TravelPackage {
  _id: { $oid: string }
  name: string
  duration: number
  concept: string
  cities: string[]
  highlights: string[]
  includedServices: string[]
  itinerary: Array<{
    day: number
    city: string
    activities: string[]
  }>
  category: 'kpop' | 'kdrama' | 'all'
  imageUrl: string
}

export function getAllPackages(): TravelPackage[] {
  return packagesData as TravelPackage[]
}

export function getPackageById(packageId: string): TravelPackage | undefined {
  return (packagesData as TravelPackage[]).find((pkg) => pkg._id.$oid === packageId)
}