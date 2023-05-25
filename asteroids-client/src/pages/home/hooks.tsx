/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useDatesContext,
  useAsteroidsContext,
  useFavoritesContext,
  useSortContext
} from '../../providers'
import { sortAsteroids } from '../../utils'

const VIEW_COUNT_INCREMENT = 7
export function useHome () {
  const [viewCount, setViewCount] = useState(VIEW_COUNT_INCREMENT)
  const [viewMoreButtonEnabled, setViewMoreButtonEnabled] = useState(false)
  const [favoritesButtonEnabled, setFavoritesButtonEnabled] = useState(false)
  const { date, setDate } = useDatesContext()
  const { asteroids, loading, error } = useAsteroidsContext()
  const { sort, setSort } = useSortContext()
  const { favorites, toggleFavorite, showFavorites, setShowFavorites } = useFavoritesContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])

  const viewMore = () => {
    setViewCount((prev) => prev + VIEW_COUNT_INCREMENT)
  }

  const content = useMemo(() => {
    // calculate favorites asteroids
    const favoritesAsteroids =
      favorites != null ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id)) : []

    // control enabling of favorites button based on existence of favorites
    setFavoritesButtonEnabled(favoritesAsteroids != null && favoritesAsteroids.length > 0)

    // get current asteroids based on showFavorites
    const currentAsteroids = showFavorites ? favoritesAsteroids : asteroids

    // slice asteroids based on viewCount
    const slicedAsteroids = currentAsteroids?.slice(0, viewCount)

    // control enabling of viewMore button
    setViewMoreButtonEnabled(currentAsteroids != null && currentAsteroids.length > viewCount)

    // sort asteroids based on sortContent
    const sortedFavorites = slicedAsteroids?.sort(sortContent)

    return sortedFavorites
  }, [favorites, showFavorites, asteroids, sortContent, viewCount])

  // Reset viewCount when a new search is made
  useEffect(() => {
    if (!loading) {
      setViewCount(VIEW_COUNT_INCREMENT)
    }
  }, [loading])

  const showViewMoreButton = viewMoreButtonEnabled && !loading
  const favoritesButtonDisabled = !favoritesButtonEnabled || loading

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
    favoritesButtonDisabled,
    sortContent,
    viewMore,
    showViewMoreButton,
    content
  }
}
