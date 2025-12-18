"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { POI, getKContentsByPOIId } from '@/lib/data'

interface POICarouselProps {
  pois: POI[]
}

export default function POICarousel({ pois }: POICarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pois])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 flex items-center justify-center text-white transition-all shadow-lg"
          aria-label="이전"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex flex-row gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
      >
        {pois.map((poi) => (
          <Link
            key={poi._id.$oid}
            href={`/poi/${poi._id.$oid}`}
            className="flex-shrink-0 w-64 cursor-pointer group block"
            style={{ minWidth: '256px', maxWidth: '256px' }}
          >
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-200 h-full">
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${poi._id.$oid}/400/300`}
                  alt={poi.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white font-medium">
                  {getKContentsByPOIId(poi._id.$oid).length}개
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-green-400 transition-colors">
                  {poi.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                  {poi.address}
                </p>
                <div className="flex flex-wrap gap-1">
                  {poi.categoryTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 flex items-center justify-center text-white transition-all shadow-lg"
          aria-label="다음"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

