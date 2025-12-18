"use client"

import { useRouter, useParams } from 'next/navigation'
import AuthButton from '@/components/AuthButton'
import { getPOIById, getKContentsByPOIId } from '@/lib/data'

export default function POIDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string || ''
  
  const poi = getPOIById(id)
  const kContents = poi ? getKContentsByPOIId(id) : []

  if (!poi) {
    return (
      <div className="min-h-screen bg-black">
        <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">B-4K</h1>
            <AuthButton />
          </div>
        </header>
        <main className="container mx-auto px-6 py-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">장소를 찾을 수 없습니다</h1>
            <button
              onClick={() => router.push('/')}
              className="text-green-500 hover:text-green-400"
            >
              홈으로 돌아가기
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-green-400 transition-colors"
          >
            ← 뒤로가기
          </button>
          <AuthButton />
        </div>
      </header>
      <main className="bg-gradient-to-b from-gray-900 via-black to-black min-h-screen">
        {/* 배너 이미지 */}
        <div className="relative h-80">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img
            src={`https://picsum.photos/seed/${poi._id.$oid}/1920/600`}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="container mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{poi.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-gray-300 text-sm md:text-base">
                <span>{poi.categoryTags.join(' · ')}</span>
                <span>·</span>
                <span>{kContents.length}개 스팟</span>
                <span>·</span>
                <span>{poi.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="container mx-auto px-6 pt-8 pb-16">
          {/* 재생 컨트롤 */}
          <div className="flex items-center gap-6 mb-8">
            <button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>

          {/* 스팟 리스트 헤더 */}
          {kContents.length > 0 && (
            <>
              <div className="border-b border-gray-700 pb-2 mb-2">
                <div className="grid grid-cols-[16px_1fr_1fr_100px] gap-4 text-gray-400 text-sm font-medium px-4">
                  <div>#</div>
                  <div>스팟 이름</div>
                  <div>설명</div>
                  <div className="text-right">태그</div>
                </div>
              </div>

              {/* 스팟 리스트 */}
              <div className="space-y-0 mb-8">
                {kContents.map((content, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[16px_1fr_1fr_100px] gap-4 items-center px-4 py-3 rounded hover:bg-gray-800 group cursor-pointer"
                  >
                    <div className="text-gray-400 text-sm group-hover:hidden">
                      {index + 1}
                    </div>
                    <div className="hidden group-hover:block">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate">{content.spotName}</div>
                      {content.subName && (
                        <div className="text-gray-400 text-sm truncate">{content.subName}</div>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm truncate">
                      {content.description}
                    </div>
                    <div className="text-gray-400 text-sm text-right">
                      {content.tags && content.tags.length > 0 ? (
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                          {content.tags[0]}
                        </span>
                      ) : (
                        '—'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 추가 정보 */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">장소 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-400 mb-1">주소</p>
                <p className="text-white">{poi.address}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">입장료</p>
                <p className="text-white">{poi.entryFee}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">운영 시간</p>
                <p className="text-white">{poi.openingHours}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">예약 필요</p>
                <p className="text-white">{poi.needsReservation ? '예' : '아니오'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

