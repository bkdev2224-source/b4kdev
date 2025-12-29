"use client"

import Link from 'next/link'

interface ExplorationItem {
  id: string
  title: string
  description: string
  imageUrl: string
  area: string
  href?: string
}

const seoulExplorations: ExplorationItem[] = [
  {
    id: '1',
    title: '강남구 탐방',
    description: '현대적이고 활기찬 강남의 명소들을 둘러보세요',
    imageUrl: 'https://picsum.photos/seed/gangnam/800/600',
    area: '강남구',
    href: '/explore/gangnam'
  },
  {
    id: '2',
    title: '홍대 거리 문화',
    description: '젊음과 창의성이 넘치는 홍대의 독특한 문화를 경험하세요',
    imageUrl: 'https://picsum.photos/seed/hongdae/800/600',
    area: '마포구',
    href: '/explore/hongdae'
  },
  {
    id: '3',
    title: '경복궁과 한옥마을',
    description: '전통과 역사가 살아있는 조선왕조의 궁궐과 한옥을 탐방하세요',
    imageUrl: 'https://picsum.photos/seed/palace/800/600',
    area: '종로구',
    href: '/explore/palace'
  },
  {
    id: '4',
    title: '명동 쇼핑 거리',
    description: '서울의 대표적인 쇼핑과 엔터테인먼트의 중심지',
    imageUrl: 'https://picsum.photos/seed/myeongdong/800/600',
    area: '중구',
    href: '/explore/myeongdong'
  },
  {
    id: '5',
    title: '한강 공원',
    description: '서울의 심장 한강을 따라 즐기는 다양한 레저 활동',
    imageUrl: 'https://picsum.photos/seed/hangang/800/600',
    area: '용산구',
    href: '/explore/hangang'
  },
  {
    id: '6',
    title: '북촌 한옥마을',
    description: '전통 한옥과 현대적 카페가 공존하는 아름다운 마을',
    imageUrl: 'https://picsum.photos/seed/bukchon/800/600',
    area: '종로구',
    href: '/explore/bukchon'
  }
]

export default function SeoulExploration() {
  return (
    <div className="w-full px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            서울 탐방하기
          </h2>
          <p className="text-purple-300 text-lg">서울의 다양한 지역을 탐험하세요</p>
        </div>
        <button className="text-sm text-purple-300 hover:text-purple-200 font-medium transition-colors">
          모두 보기 →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seoulExplorations.map((item) => (
          <Link
            key={item.id}
            href={item.href || '#'}
            className="group no-underline"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-pink-500/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    {item.area}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-purple-200 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

