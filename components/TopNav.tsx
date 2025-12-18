"use client"

import AuthButton from './AuthButton'

export default function TopNav() {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-sm h-16 fixed top-0 left-64 right-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="text-white hover:underline text-sm">Premium 지원</a>
        <a href="#" className="text-white hover:underline text-sm">다운로드하기</a>
        <span className="text-gray-400">|</span>
        <a href="#" className="text-white hover:underline text-sm">앱 설치하기</a>
        <a href="#" className="text-white hover:underline text-sm">가입하기</a>
        <AuthButton />
      </div>
    </div>
  )
}

