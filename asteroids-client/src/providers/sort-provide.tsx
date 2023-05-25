import { type ReactNode, createContext, useState, useContext } from 'react'
import { type AsteroidModel } from '@/models'

export interface SortContext {
  sort: [keyof AsteroidModel, boolean] | null
  setSort: (sort: [keyof AsteroidModel, boolean] | null) => void
}

const sortContext = createContext<SortContext | null>(null)

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState<[keyof AsteroidModel, boolean] | null>(null)
  return (
    <sortContext.Provider value={{ sort, setSort }}>
      {children}
    </sortContext.Provider>
  )
}

export const useSortContext = () => {
  const context = useContext(sortContext)
  if (context == null) {
    throw new Error('useSortContext must be used within a SortProvider')
  }
  return context
}
