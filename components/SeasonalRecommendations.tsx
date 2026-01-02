"use client"

import Link from 'next/link'

interface SeasonalItem {
  id: string
  title: string
  description: string
  imageUrl: string
  season: '봄' | '여름' | '가을' | '겨울'
  href?: string
}

const seasonalRecommendations: SeasonalItem[] = [
  {
    id: '1',
    title: '벚꽃 축제',
    description: '봄의 대표적인 축제, 아름다운 벚꽃을 감상하며 즐기는 서울의 봄',
    imageUrl: 'https://picsum.photos/seed/spring-cherry/800/600',
    season: '봄',
    href: '/seasons/spring'
  },
  {
    id: '2',
    title: '여름 한강 피크닉',
    description: '시원한 한강에서 즐기는 여름밤 피크닉과 야외 콘서트',
    imageUrl: 'https://picsum.photos/seed/summer-hangang/800/600',
    season: '여름',
    href: '/seasons/summer'
  },
  {
    id: '3',
    title: '가을 단풍 여행',
    description: '화려한 단풍으로 물든 서울의 공원과 산을 탐방하세요',
    imageUrl: 'https://picsum.photos/seed/autumn-leaves/800/600',
    season: '가을',
    href: '/seasons/autumn'
  },
  {
    id: '4',
    title: '겨울 눈 축제',
    description: '눈 덮인 서울에서 즐기는 겨울 축제와 따뜻한 온천',
    imageUrl: 'https://picsum.photos/seed/winter-snow/800/600',
    season: '겨울',
    href: '/seasons/winter'
  },
  {
    id: '5',
    title: '봄 꽃 축제',
    description: '다양한 봄꽃으로 가득한 서울의 공원과 정원',
    imageUrl: 'https://picsum.photos/seed/spring-flowers/800/600',
    season: '봄',
    href: '/seasons/spring-flowers'
  },
  {
    id: '6',
    title: '여름 물 축제',
    description: '시원한 물놀이와 함께 즐기는 서울의 여름 축제',
    imageUrl: 'https://picsum.photos/seed/summer-water/800/600',
    season: '여름',
    href: '/seasons/summer-festival'
  }
]

export default function SeasonalRecommendations() {
  const seasonColors = {
    '봄': 'from-green-500/80 to-pink-500/80',
    '여름': 'from-blue-500/80 to-cyan-500/80',
    '가을': 'from-orange-500/80 to-red-500/80',
    '겨울': 'from-blue-400/80 to-purple-500/80'
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="px-6">
        {/* 제목 섹션 - 중앙 정렬 with border lines */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500 to-emerald-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 px-8">
              시즌별 여행 추천
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-emerald-500 to-emerald-500"></div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl">계절에 맞는 서울의 매력을 발견하세요</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-emerald-50">
              모두 보기 →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalRecommendations.map((item) => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="group no-underline"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${seasonColors[item.season]} rounded-full text-white text-xs font-semibold`}>
                      {item.season}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

