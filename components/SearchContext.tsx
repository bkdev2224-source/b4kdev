"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface SearchResult {
  name: string
  type: 'poi' | 'content'
  poiId?: string
  subName?: string
}

interface SearchContextType {
  searchResult: SearchResult | null
  setSearchResult: (result: SearchResult | null) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)

  return (
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchResult() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearchResult must be used within a SearchProvider')
  }
  return context
}

