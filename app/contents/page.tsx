"use client"

import PageLayout from '@/components/PageLayout'

export default function ContentsPage() {
  return (
    <PageLayout showSidePanel={true} sidePanelWidth="default" className="pb-8">
      {/* Normal mode: Contents page content */}
      <div className="px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contents</h1>
          <p className="text-purple-600">Contents page.</p>
        </div>
      </div>
    </PageLayout>
  )
}

