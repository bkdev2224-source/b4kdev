"use client"

import Link from 'next/link'

interface RecommendedItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  href?: string
}

const recommendedItems: RecommendedItem[] = [
  {
    id: '1',
    title: '숲속 쉼터',
    description: '도심 속 고요한 겨울숲에서 잠시 멈춰가는 시간',
    imageUrl: 'https://picsum.photos/seed/forest/800/600',
    category: '휴식',
    href: '/themes/forest'
  },
  {
    id: '2',
    title: '별마당도서관',
    description: '대형 트리 아래 반짝이는 크리스마스 감성',
    imageUrl: 'https://picsum.photos/seed/library/800/600',
    category: '문화',
    href: '/themes/library'
  },
  {
    id: '3',
    title: '빛초롱 축제',
    description: '겨울밤에 펼쳐지는 서울의 야간 빛 축제',
    imageUrl: 'https://picsum.photos/seed/festival/800/600',
    category: '축제',
    href: '/themes/festival'
  },
  {
    id: '4',
    title: '케이팝 데몬 헌터스 따라 떠나는 서울의 1박2일 골든 투어',
    description: '케이팝 데몬 헌터스의 주요 배경지 따라 떠나는 서울의 매력적인 1박 2일 여행 코스',
    imageUrl: 'https://picsum.photos/seed/kpop-tour/800/600',
    category: 'K-Pop',
    href: '/themes/kpop-tour'
  },
  {
    id: '5',
    title: '서울의 계절 디저트로 만나는 가을의 맛',
    description: '서울의 계절 디저트로 만나는 가을의 맛',
    imageUrl: 'https://picsum.photos/seed/dessert/800/600',
    category: 'K-Food',
    href: '/themes/dessert'
  },
  {
    id: '6',
    title: '서울 실내에서 즐기는 연말 분위기 가득 트리 공간',
    description: '서울 실내에서 즐기는 연말 분위기 가득 트리 공간',
    imageUrl: 'https://picsum.photos/seed/winter/800/600',
    category: '이벤트',
    href: '/themes/winter'
  }
]

export default function RecommendedThemes() {
  return (
    <div className="w-full px-6 py-12">
      {/* 섹션 제목 */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          B4K에서 추천하는 다양한 경험
        </h2>
        <p className="text-purple-300 text-lg">에디터 추천 여행</p>
      </div>

      {/* 추천 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedItems.map((item) => (
          <Link
            key={item.id}
            href={item.href || '#'}
            className="group no-underline"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              {/* 이미지 */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* 카테고리 태그 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* 텍스트 정보 */}
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

