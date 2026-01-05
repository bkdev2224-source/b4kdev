"use client"

import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import SidePanel from '@/components/SidePanel'
import TopNav from '@/components/TopNav'
import { getRouteById } from '@/lib/routes'
import { useSidebar } from '@/components/SidebarContext'

export default function RouteDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string || ''
  const { sidebarOpen } = useSidebar()
  
  const route = getRouteById(id)

  if (!route) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <SidePanel />
        <TopNav />
        <main className={`pt-16 pb-8 flex items-center justify-center min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-[calc(12.75%+24rem)] lg:w-[calc(100%-12.75%-24rem)]' : 'lg:ml-[calc(80px+24rem)] lg:w-[calc(100%-80px-24rem)]'
        }`}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Route Not Found</h1>
            <button
              onClick={() => router.push('/maps')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              Return to Routes
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
      {/* Main content area - reserved for map */}
      <main className={`min-h-screen pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-[calc(12.75%+24rem)] lg:w-[calc(100%-12.75%-24rem)]' : 'lg:ml-[calc(80px+24rem)] lg:w-[calc(100%-80px-24rem)]'
      }`}>
        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg">Map will be displayed here</p>
            <p className="text-sm mt-2">{route.name}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

