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
    <section className="w-full py-16 bg-gradient-to-br from-green-800/40 via-yellow-700/30 to-emerald-800/40 relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-6">
        {/* 제목 섹션 - 중앙 정렬 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            시즌별 여행 추천
          </h2>
          <p className="text-green-200 text-lg md:text-xl">계절에 맞는 서울의 매력을 발견하세요</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-green-300 hover:text-green-200 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-500/20">
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
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${seasonColors[item.season]} backdrop-blur-sm rounded-full text-white text-xs font-semibold`}>
                      {item.season}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-green-200 text-sm line-clamp-2">
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

