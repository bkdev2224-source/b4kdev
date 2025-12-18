"use client"

export default function BottomBanner() {
  return (
    <div className="fixed bottom-0 left-64 right-0 bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 flex items-center justify-between z-30">
      <div>
        <p className="text-white font-semibold mb-1">Spotify 미리 듣기</p>
        <p className="text-white text-sm">
          가끔 표시되는 광고와 함께 무제한 곡 및 팟캐스트를 이용하려면 가입하세요. 신용카드는 필요 없습니다.
        </p>
      </div>
      <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
        무료로 가입하기
      </button>
    </div>
  )
}

