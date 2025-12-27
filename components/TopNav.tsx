"use client"

import AuthButton from './AuthButton'

export default function TopNav() {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-sm h-16 fixed top-0 left-[20%] right-0 z-40 flex items-center justify-end px-6 border-b border-purple-500/20">
      <AuthButton />
    </div>
  )
}

