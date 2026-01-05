"use client"

import PageLayout from '@/components/PageLayout'
import MainCarousel from '@/components/MainCarousel'
import BestPackages from '@/components/BestPackages'
import EditorRecommendations from '@/components/EditorRecommendations'
import SeoulExploration from '@/components/SeoulExploration'
import SeasonalRecommendations from '@/components/SeasonalRecommendations'

export default function Home() {
  return (
    <PageLayout showSidePanel={true} sidePanelWidth="default">
      {/* Main carousel */}
      <MainCarousel />
      
      {/* B4K Best packages */}
      <BestPackages />
      
      {/* Editor recommendations */}
      <EditorRecommendations />
      
      {/* Explore Seoul */}
      <SeoulExploration />
      
      {/* Seasonal travel recommendations */}
      <SeasonalRecommendations />
    </PageLayout>
  )
}
