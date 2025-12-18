"use client"

import { useSession, signOut } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>로딩 중...</div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform font-semibold text-sm"
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <a
      href="/auth/signin"
      className="px-6 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform font-semibold text-sm"
    >
      로그인하기
    </a>
  )
}

