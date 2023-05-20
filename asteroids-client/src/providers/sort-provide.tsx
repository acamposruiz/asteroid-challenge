import { type ReactNode, createContext, useState, useContext } from 'react'
import { type AsteroidModel } from '../models/models-app'

const sortContext = createContext<{
  sort: keyof AsteroidModel | null
  setSort: (sort: keyof AsteroidModel | null) => void
} | null>(null)

export const SortProvider = ({ children }: {
  children: ReactNode
}) => {
  const [sort, setSort] = useState<keyof AsteroidModel | null>(null)
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
