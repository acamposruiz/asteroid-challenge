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
    // calculate favorites asteroids
    const favoritesAsteroids =
      favorites != null
        ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
        : []

    // control enabling of favorites button based on existence of favorites
    setFavoritesButtonEnabled(
      favoritesAsteroids != null && favoritesAsteroids.length > 0
    )

    // get current asteroids based on showFavorites
    const currentAsteroids = showFavorites ? favoritesAsteroids : asteroids

    // slice asteroids based on viewCount
    const slicedAsteroids = currentAsteroids?.slice(0, viewCount)

    // control enabling of viewMore button
    setViewMoreButtonEnabled(
      currentAsteroids != null && currentAsteroids.length > viewCount
    )

    // sort asteroids based on sortContent
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
