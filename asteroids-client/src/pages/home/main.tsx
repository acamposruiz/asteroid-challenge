import { AsteroidComponent, LoadingComponent } from '../../components'
import styles from './styles.module.css'
import { useHome } from './hooks'

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
          <LoadingComponent />
        )
        : showContent
          ? (
            <ul>
              {content.map((asteroid) => (
                <li className={styles.item} key={asteroid.id}>
                  <AsteroidComponent
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
