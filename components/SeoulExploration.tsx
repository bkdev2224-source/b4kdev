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
    title: 'Gangnam District',
    description: 'Explore the modern and vibrant attractions of Gangnam',
    imageUrl: 'https://picsum.photos/seed/gangnam/800/600',
    area: 'Gangnam-gu',
    href: '/explore/gangnam'
  },
  {
    id: '2',
    title: 'Hongdae Street Culture',
    description: 'Experience the unique culture of Hongdae, overflowing with youth and creativity',
    imageUrl: 'https://picsum.photos/seed/hongdae/800/600',
    area: 'Mapo-gu',
    href: '/explore/hongdae'
  },
  {
    id: '3',
    title: 'Gyeongbokgung Palace & Hanok Village',
    description: 'Explore the palace and hanok of the Joseon Dynasty, where tradition and history come alive',
    imageUrl: 'https://picsum.photos/seed/palace/800/600',
    area: 'Jongno-gu',
    href: '/explore/palace'
  },
  {
    id: '4',
    title: 'Myeongdong Shopping Street',
    description: 'Seoul\'s representative center for shopping and entertainment',
    imageUrl: 'https://picsum.photos/seed/myeongdong/800/600',
    area: 'Jung-gu',
    href: '/explore/myeongdong'
  },
  {
    id: '5',
    title: 'Hangang Park',
    description: 'Various leisure activities along the Hangang River, the heart of Seoul',
    imageUrl: 'https://picsum.photos/seed/hangang/800/600',
    area: 'Yongsan-gu',
    href: '/explore/hangang'
  },
  {
    id: '6',
    title: 'Bukchon Hanok Village',
    description: 'A beautiful village where traditional hanok and modern cafes coexist',
    imageUrl: 'https://picsum.photos/seed/bukchon/800/600',
    area: 'Jongno-gu',
    href: '/explore/bukchon'
  }
]

export default function SeoulExploration() {
  return (
    <section id="seoul-exploration" className="w-full py-16 bg-white">
      <div className="px-6">
        {/* Title section - centered with border lines */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500 to-pink-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 px-8">
              Explore Seoul
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-pink-500 to-pink-500"></div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl">Discover the diverse areas of Seoul</p>
          <div className="flex justify-center mt-6">
            <button className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-pink-50">
              View All →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoulExplorations.map((item) => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="group no-underline"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-pink-500 rounded-full text-white text-xs font-semibold">
                      {item.area}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
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

