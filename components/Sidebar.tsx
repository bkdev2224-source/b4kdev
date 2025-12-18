"use client"

export default function Sidebar() {
  return (
    <div className="w-64 bg-black h-screen fixed left-0 top-0 overflow-y-auto pb-20">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-white font-bold text-base mb-4 flex items-center justify-between">
            내 라이브러리
            <button className="text-gray-400 hover:text-white text-xl">+</button>
          </h2>
        </div>

        <div className="mb-8 bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-2">
            첫 번째 플레이리스트를 만드세요.
          </h3>
          <p className="text-gray-400 text-xs mb-4">
            어렵지 않아요. 저희가 도와드릴게요.
          </p>
          <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
            플레이리스트 만들기
          </button>
        </div>

        <div className="mb-8 bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-2">
            팔로우할 팟캐스트를 찾아보세요
          </h3>
          <p className="text-gray-400 text-xs mb-4">
            새로운 에피소드에 대한 소식을 알려드릴게요.
          </p>
          <button className="bg-transparent border border-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:border-white transition-colors">
            팟캐스트 둘러보기
          </button>
        </div>

        <div className="mt-auto pt-8 space-y-2 text-xs text-gray-400">
          <a href="#" className="hover:underline block">법률 정보</a>
          <a href="#" className="hover:underline block">안전 및 개인정보 보호 센터</a>
          <a href="#" className="hover:underline block">개인정보 처리방침</a>
          <a href="#" className="hover:underline block">광고 상세정보</a>
          <a href="#" className="hover:underline block">접근성</a>
          <a href="#" className="hover:underline block">쿠키</a>
        </div>

        <div className="mt-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            한국어
          </button>
        </div>
      </div>
    </div>
  )
}

