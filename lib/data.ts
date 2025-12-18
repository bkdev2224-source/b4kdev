import poisData from '@/mockupdata/pois.json'
import kpopData from '@/mockupdata/kcontens/kpop.json'
import kbeautyData from '@/mockupdata/kcontens/kbeauty.json'
import kfoodData from '@/mockupdata/kcontens/kfood.json'
import kfestivalData from '@/mockupdata/kcontens/kfestival.json'

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

export function getKContentsByPOIId(poiId: string): KContent[] {
  const allKContents = [
    ...kpopData,
    ...kbeautyData,
    ...kfoodData,
    ...kfestivalData,
  ] as KContent[]
  
  return allKContents.filter(
    (content) => content.poiId.$oid === poiId
  )
}

export function getPOIById(poiId: string): POI | undefined {
  return (poisData as POI[]).find((poi) => poi._id.$oid === poiId)
}

