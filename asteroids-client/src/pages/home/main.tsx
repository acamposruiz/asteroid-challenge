import { AsteroidItemList, Loading } from '@/components'

import { useHome } from './hooks'
import styles from './styles.module.css'

export function Main () {
  const {
    loading,
    favorites,
    toggleFavorite,
    showFavorites,
    viewMore,
    showViewMoreButton,
    content
  } = useHome()

  const showContent = content != null && content.length > 0

  return (
    <main>
      {loading
        ? (
          <Loading />
        )
        : showContent
          ? (
            <ul>
              {content.map((asteroid) => (
                <li className={styles.item} key={asteroid.id}>
                  <AsteroidItemList
                    {...asteroid}
                    isFavorite={favorites?.includes(asteroid.id)}
                    onFavoriteClick={() => {
                      toggleFavorite(asteroid.id)
                    }}
                  />
                </li>
              ))}
            </ul>
          )
          : showFavorites
            ? (
              <p>No favorites</p>
            )
            : (
              <p>No asteroids</p>
            )}
      {showViewMoreButton && (
        <button
          className="retro-button"
          onClick={() => {
            viewMore()
          }}
        >
          View more
        </button>
      )}
    </main>
  )
}
