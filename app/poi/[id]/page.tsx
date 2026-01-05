"use client"

import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import SidePanel from '@/components/SidePanel'
import TopNav from '@/components/TopNav'
import { getPOIById, getKContentsByPOIId } from '@/lib/data'
import { useSidebar } from '@/components/SidebarContext'

export default function POIDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string || ''
  const { sidebarOpen } = useSidebar()
  
  const poi = getPOIById(id)
  const kContents = poi ? getKContentsByPOIId(id) : []

  if (!poi) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <SidePanel />
        <TopNav />
        <main className={`pt-16 pb-8 flex items-center justify-center min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-[calc(12.75%+16rem)] lg:w-[calc(100%-12.75%-16rem)]' : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'
        }`}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
            <button
              onClick={() => router.push('/')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <SidePanel />
      <TopNav />
      <main className={`min-h-screen pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-[calc(12.75%+16rem)] lg:w-[calc(100%-12.75%-16rem)]' : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'
      }`}>
        {/* Banner image */}
        <div className="relative h-96">
          <img
            src={`https://picsum.photos/seed/${poi._id.$oid}/1920/600`}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <div className="container mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">{poi.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm md:text-base">
                <div className="flex gap-2 flex-wrap">
                  {poi.categoryTags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-white/70">·</span>
                <span>{kContents.length} spots</span>
                <span className="text-white/70">·</span>
                <span>{poi.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="container mx-auto px-6 pt-8 pb-16">
          {/* K-Contents section */}
          {kContents.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-purple-500"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 px-8 flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Spots to Visit
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500 to-purple-500"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kContents.map((content, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-400 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Use spotName as title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{content.spotName}</h3>
                        {/* Use subName as hashtag */}
                        {content.subName && (
                          <span className="inline-block px-3 py-1 bg-purple-100 border border-purple-300 rounded-full text-purple-700 text-sm font-medium mb-3">
                            #{content.subName}
                          </span>
                        )}
                      </div>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={`https://picsum.photos/seed/${poi._id.$oid}-${content.spotName}/100/100`}
                          alt={content.spotName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {content.description}
                    </p>
                    {content.tags && content.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {content.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2 py-1 bg-purple-50 border border-purple-200 rounded-md text-purple-700 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location information card */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-purple-500"></div>
                <h3 className="text-2xl font-bold text-gray-900 px-8 flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Location Information
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500 to-purple-500"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-purple-600 text-sm font-medium mb-2">📍 Address</p>
                <p className="text-gray-900">{poi.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-purple-600 text-sm font-medium mb-2">💰 Entry Fee</p>
                <p className="text-gray-900">{poi.entryFee}</p>
              </div>
              <div className="space-y-1">
                <p className="text-purple-600 text-sm font-medium mb-2">🕐 Opening Hours</p>
                <p className="text-gray-900">{poi.openingHours}</p>
              </div>
              <div className="space-y-1">
                <p className="text-purple-600 text-sm font-medium mb-2">📞 Reservation Required</p>
                <p className="text-gray-900">{poi.needsReservation ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
