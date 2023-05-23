import { AsteroidComponent } from '../../components/asteroid-component'
import { IntervalRangeComponent } from '../../components/interval-range'
import { SortComponent } from '../../components/sort'
import { LoadingComponent } from '../../components/loading'
import { FavoriteButtonComponent } from '../../components/favorite-button'
import styles from './styles.module.css'
import { useContent } from './hooks'

export function HomePage () {
  const {
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
    viewMore,
    content
  } = useContent()

  return (
    <div>
      <header>
        <h1>
          Asteroids{' '}
          <small>
            <FavoriteButtonComponent
              isFavorite={showFavorites}
              isBig={true}
              onClick={() => {
                setShowFavorites(!showFavorites)
              }}
            />
          </small>
        </h1>
      </header>
      {error != null && <h3 className="error-message">{error.message}</h3>}
      <section>
        <IntervalRangeComponent
          startDateInit={date.startDate}
          endDateInit={date.endDate}
          onSubmit={({ startDate, endDate }) => {
            setDate({ startDate, endDate })
          }}
        />
        <SortComponent
          {...{
            sort,
            setSort
          }}
        />
      </section>
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
        {content != null && content.length > 0 && (
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
    </div>
  )
}
