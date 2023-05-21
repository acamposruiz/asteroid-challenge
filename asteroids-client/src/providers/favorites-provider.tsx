import { type ReactNode, createContext, useState, useContext, useEffect } from 'react'
import { endpoints, urlConstructor } from '../utils/endpoints'

const favoritesContext = createContext<{
  favorites: string[] | null
  setFavorites: (favorites: string[]) => void
} | null>(null)

export const FavoritesProvider = ({ children }: {
  children: ReactNode
}) => {
  const [favorites, setFavorites] = useState<string[] | null>([])
  const url = urlConstructor({
    endpoint: endpoints.FAVORITES
  })
  const fetchFavorites = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      setFavorites(data)
    } catch (error: Error | any) {
      setFavorites([])
    }
  }
  useEffect(() => {
    void fetchFavorites()
  }, [])
  return (
        <favoritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </favoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const context = useContext(favoritesContext)

  if (context == null) {
    throw new Error('useFavoritesContext must be used within a favoritesProvider')
  }

  const { favorites, setFavorites } = context

  const toggleFavorite = (id: string) => {
    if (favorites == null) {
      return
    }
    const isFavorite = favorites.includes(id)
    const method = isFavorite ? 'DELETE' : 'POST'
    const url = urlConstructor({
      endpoint: endpoints.FAVORITES,
      params: [id]
    })
    const fetchFavorite = async () => {
      try {
        const response = await fetch(url, { method })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error_message)
        }
        setFavorites(data)
      } catch (error: Error | any) {
        setFavorites([])
      }
    }
    void fetchFavorite()
  }

  return { favorites, toggleFavorite }
}
