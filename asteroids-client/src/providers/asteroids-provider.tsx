import { type ReactNode, createContext, useState, useContext } from 'react'
import { type AsteroidModel } from '../models/models-app'

const asteroidsContext = createContext<{
  asteroids: AsteroidModel[] | null
  setAsteroids: (asteroids: AsteroidModel[] | null) => void
} | null>(null)

export const AsteroidsProvider = ({ children }: {
  children: ReactNode
}) => {
  const [asteroids, setAsteroids] = useState<AsteroidModel[] | null>([])
  return (
        <asteroidsContext.Provider value={{ asteroids, setAsteroids }}>
            {children}
        </asteroidsContext.Provider>
  )
}

export const useAsteroidsContext = () => {
  const context = useContext(asteroidsContext)
  if (context == null) {
    throw new Error('useAsteroidsContext must be used within a asteroidsProvider')
  }
  return context
}
