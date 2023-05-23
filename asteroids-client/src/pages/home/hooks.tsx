/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useMemo, useState } from 'react'
import { useDatesContext } from '../../providers/dates-provide'
import { useSortContext } from '../../providers/sort-provide'
import { sortAsteroids } from '../../utils/sort-asteroids'
import { useAsteroidsContext } from '../../providers/asteroids-provider'
import { useFavoritesContext } from '../../providers/favorites-provider'

export function useHome () {
  const [viewCount, setViewCount] = useState(7)
  const [viewMoreButtonEnabled, setViewMoreButtonEnabled] = useState(false)
  const [favoritesButtonEnabled, setFavoritesButtonEnabled] = useState(false)
  const { date, setDate } = useDatesContext()
  const {
    asteroids,
    loading,
    error
  } = useAsteroidsContext()
  const { sort, setSort } = useSortContext()
  const { favorites, toggleFavorite, showFavorites, setShowFavorites } =
    useFavoritesContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])

  const viewMore = () => {
    setViewCount((prev) => prev + 7)
  }

  const content = useMemo(() => {
    const favoritesAsteroids =
      favorites != null
        ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
        : []

    setFavoritesButtonEnabled(
      favoritesAsteroids != null && favoritesAsteroids.length > 0
    )

    const currentAsteroids = showFavorites ? favoritesAsteroids : asteroids

    const slicedAsteroids = currentAsteroids?.slice(0, viewCount)

    setViewMoreButtonEnabled(
      currentAsteroids != null && currentAsteroids.length > viewCount
    )

    const sortedFavorites = slicedAsteroids?.sort(sortContent)

    return sortedFavorites
  }, [favorites, showFavorites, asteroids, sortContent, viewCount])

  return {
    date,
    setDate,
    loading,
    error,
    sort,
    setSort,
    favorites,
    toggleFavorite,
    showFavorites,
    setShowFavorites,
    favoritesButtonEnabled,
    sortContent,
    viewMore,
    viewMoreButtonEnabled,
    content
  }
}
