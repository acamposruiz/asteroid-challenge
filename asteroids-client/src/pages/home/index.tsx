import { useCallback, useMemo } from 'react'
import { AsteroidComponent } from '../../components/asteroid-component'
import { IntervalRangeComponent } from '../../components/interval-range'
import { SortComponent } from '../../components/sort'
import { useDatesContext } from '../../providers/dates-provide'
import { useSortContext } from '../../providers/sort-provide'
import { sortAsteroids } from '../../utils/sort-asteroids'
import { useAsteroidsContext } from '../../providers/asteroids-provider'
import { useFavoritesContext } from '../../providers/favorites-provider'
import { LoadingComponent } from '../../components/loading'
import { FavoriteButtonComponent } from '../../components/favorite-button'
import styles from './styles.module.css'

export function HomePage () {
  const { favorites, toggleFavorite, showFavorites, setShowFavorites } =
    useFavoritesContext()
  const { date, setDate } = useDatesContext()
  const { sort, setSort } = useSortContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])
  const {
    asteroids,
    loadingSearch: loading,
    errorSearch: error
  } = useAsteroidsContext()

  const content = useMemo(() => {
    const filteredAsteroids =
      favorites != null && showFavorites
        ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
        : asteroids

    const sortedFavorites = filteredAsteroids?.sort(sortContent)

    return sortedFavorites
  }, [favorites, showFavorites, asteroids, sortContent])

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
      </main>
    </div>
  )
}
