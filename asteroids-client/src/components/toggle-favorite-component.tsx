/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useFavoritesContext } from '../providers/favorites-provider'

export function ToggleFavoriteComponent ({ asteroidId }: { asteroidId: string }) {
  const { favorites, toggleFavorite } = useFavoritesContext()
  const isFavorite = favorites?.includes(asteroidId)
  const handleClick = () => {
    toggleFavorite(asteroidId)
  }
  return (
        <button onClick={handleClick}>
        {isFavorite ? '❤️' : '🤍'}
        </button>
  )
}
