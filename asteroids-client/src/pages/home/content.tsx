import { AsteroidComponent } from '../../components/asteroid-component'
import { LoadingComponent } from '../../components/loading'
import styles from './styles.module.css'
import { useHome } from './hooks'

export function Content () {
  const {
    loading,
    favorites,
    toggleFavorite,
    showFavorites,
    viewMore,
    viewMoreButtonEnabled,
    content
  } = useHome()

  return (
    <main>
      {loading
        ? (
          <LoadingComponent />
        )
        : content != null && content.length > 0
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
      {content != null && content.length > 0 && viewMoreButtonEnabled && (
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
