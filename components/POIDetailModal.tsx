"use client"

import { POI, getKContentsByPOIId } from '@/lib/data'

interface POIDetailModalProps {
  poi: POI
  onClose: () => void
}

export default function POIDetailModal({
  poi,
  onClose,
}: POIDetailModalProps) {
  const kContents = getKContentsByPOIId(poi._id.$oid)

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="w-full h-64 overflow-hidden">
            <img
              src={`https://picsum.photos/seed/${poi._id.$oid}/800/400`}
              alt={poi.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 flex items-center justify-center text-white transition-colors"
            aria-label="닫기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{poi.name}</h2>
          <p className="text-gray-400 mb-4">{poi.address}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">운영 시간</p>
              <p className="text-white">{poi.openingHours}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">입장료</p>
              <p className="text-white">{poi.entryFee}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">예약 필요</p>
              <p className="text-white">
                {poi.needsReservation ? '예' : '아니오'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">카테고리</p>
              <div className="flex flex-wrap gap-1">
                {poi.categoryTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-purple-700 text-white px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {kContents.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                관련 스팟 ({kContents.length}개)
              </h3>
              <div className="space-y-3">
                {kContents.map((content, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold">
                        {content.spotName}
                      </h4>
                      {content.subName && (
                        <span className="text-purple-300 text-sm">
                          {content.subName}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {content.description}
                    </p>
                    {content.tags && content.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {content.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-purple-700 text-white px-2 py-1 rounded"
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
        </div>
      </div>
    </div>
  )
}

