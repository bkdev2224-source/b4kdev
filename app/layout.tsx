import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import { SidebarProvider } from '@/components/SidebarContext'

export const metadata: Metadata = {
  title: 'B4K',
  description: 'B4K Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

