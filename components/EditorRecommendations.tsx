"use client"

import Link from 'next/link'

interface RecommendationItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  href?: string
}

const editorRecommendations: RecommendationItem[] = [
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

export default function EditorRecommendations() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="px-6">
        {/* 제목 섹션 - 중앙 정렬 with border lines */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-cyan-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 px-8">
              B4K에서 추천하는 다양한 경험
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cyan-500 to-cyan-500"></div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl">에디터 추천 여행</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-cyan-50">
              모두 보기 →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorRecommendations.map((item) => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="group no-underline"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500 rounded-full text-white text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
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

