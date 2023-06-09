import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

import { endpoints, httpService } from '@/core'
import { urlConstructor } from '@/utils'

import { useAsteroidsContext } from './asteroids-provider'

const favoritesContext = createContext<{
  favorites: string[]
  setFavorites: (favorites: string[]) => void
  showFavorites: boolean
  setShowFavorites: (showFavorites: boolean | any) => void
} | null>(null)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const {
    asteroids
  } = useAsteroidsContext()

  const url = urlConstructor({
    endpoint: endpoints.FAVORITES
  })

  const fetchFavorites = async () => {
    try {
      const { data } = await httpService.get(url)
      setFavorites(data)
    } catch (error: Error | any) {
      setFavorites([])
    }
  }

  useEffect(() => {
    void fetchFavorites()
  }, [])

  // getting current favorites asteroids
  const favoritesAsteroids =
  favorites != null
    ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
    : []

  // setting showFavorites to false if there are no favorites
  if (showFavorites && favoritesAsteroids?.length === 0) {
    setShowFavorites(() => false)
  }

  return (
    <favoritesContext.Provider value={{ favorites, showFavorites, setFavorites, setShowFavorites }}>
      {children}
    </favoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const context = useContext(favoritesContext)

  if (context == null) {
    throw new Error('useFavoritesContext must be used within a favoritesProvider')
  }

  const { favorites, setFavorites, showFavorites, setShowFavorites } = context

  const toggleFavorite = (id: string) => {
    const isFavorite = favorites.includes(id)
    const method = isFavorite ? 'delete' : 'post'
    const url = urlConstructor({
      endpoint: endpoints.FAVORITES,
      params: [id]
    })
    const fetchFavorite = async () => {
      try {
        const { response } = await httpService[method](url)
        if (response.status !== 200) {
          throw new Error('Error')
        }
        const data = favorites.filter((favorite) => favorite !== id)
        if (!isFavorite) {
          data.push(id)
        }
        setFavorites(data)
      } catch (error: Error | any) {
        setFavorites([])
      }
    }
    void fetchFavorite()
  }

  return { favorites, toggleFavorite, showFavorites, setShowFavorites }
}
