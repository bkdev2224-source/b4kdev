"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { KContent, getPOIById } from '@/lib/data'

interface CategoryCarouselProps {
  title: string
  items: KContent[]
}

export default function CategoryCarousel({ title, items }: CategoryCarouselProps) {
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
  }, [items])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 300)
  }

  if (items.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 px-6">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
          {title}
        </h2>
        <button className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
          모두 표시
        </button>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-14 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent hover:from-black/90 transition-all"
            aria-label="이전"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto overflow-y-hidden px-6 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item) => {
            const poi = getPOIById(item.poiId.$oid)
            return (
              <Link
                key={`${item.poiId.$oid}-${item.spotName}`}
                href={`/poi/${item.poiId.$oid}`}
                className="flex-shrink-0 w-[180px] group cursor-pointer no-underline"
              >
                <div className="bg-[#181818] hover:bg-[#282828] rounded-lg p-4 transition-all duration-200 h-full">
                  <div className="relative mb-4">
                    <div className="aspect-square rounded-md overflow-hidden bg-[#333] shadow-lg">
                      <img
                        src={`https://picsum.photos/seed/${item.poiId.$oid}-${item.spotName}/300/300`}
                        alt={item.spotName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:underline truncate">
                    {item.spotName}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {poi?.name || item.subName}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-14 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent hover:from-black/90 transition-all"
            aria-label="다음"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
