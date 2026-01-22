import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllKContents, 
  getKContentsByCategory, 
  getKContentsByPOIId, 
  getKContentsBySubName 
} from '@/lib/db/kcontents'

export const dynamic = 'force-dynamic'

/**
 * GET /api/kcontents
 * 모든 KContents 조회
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') as 'kpop' | 'kbeauty' | 'kfood' | 'kfestival' | null
    const poiId = searchParams.get('poiId')
    const subName = searchParams.get('subName')

    let contents

    if (subName) {
      contents = await getKContentsBySubName(subName)
    } else if (poiId) {
      contents = await getKContentsByPOIId(poiId)
    } else if (category) {
      contents = await getKContentsByCategory(category)
    } else {
      contents = await getAllKContents()
    }

    // MongoDB 형식을 기존 JSON 형식으로 변환
    const formattedContents = contents.map(content => ({
      subName: content.subName,
      poiId: { $oid: typeof content.poiId === 'string' ? content.poiId : content.poiId.toString() },
      spotName: content.spotName,
      description: content.description,
      tags: content.tags,
      popularity: content.popularity,
      category: content.category,
    }))

    return NextResponse.json(formattedContents)
  } catch (error) {
    console.error('Error fetching KContents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch KContents' },
      { status: 500 }
    )
  }
}

