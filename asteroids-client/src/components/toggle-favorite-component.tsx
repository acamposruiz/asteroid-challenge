/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useFavoritesContext } from '../providers/favorites-provider'

export function ToggleFavoriteComponent ({ asteroidId }: { asteroidId: string }) {
  const { favorites, toggleFavorite } = useFavoritesContext()
  const isFavorite = favorites?.includes(asteroidId)
  const handleClick = () => {
    toggleFavorite(asteroidId)
  }
  const heartPurple = (
    <span>
            💜
    </span>
  )

  const heartOff = (
    <span>
            🤍
    </span>
  )

  return (
    <button className='favorite-button' onClick={handleClick}>
      {isFavorite ? heartPurple : heartOff}
    </button>
  )
}
