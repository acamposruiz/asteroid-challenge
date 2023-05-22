import { useCallback, useState } from 'react'
import { AsteroidComponent } from '../../components/asteroid-component'
import { IntervalRangeComponent } from '../../components/interval-range-component'
import { SortComponent } from '../../components/sort'
import { useDatesContext } from '../../providers/dates-provide'
import { useSortContext } from '../../providers/sort-provide'
import { sortAsteroids } from '../../utils/sort-asteroids'
import { useAsteroidsContext } from '../../providers/asteroids-provider'
import { useFavoritesContext } from '../../providers/favorites-provider'
import { LoadingComponent } from '../../components/loading'
import styles from './styles.module.css'

export function HomePage () {
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const { favorites } = useFavoritesContext()
  const { initDate, endDate, setInitDate, setEndDate } = useDatesContext()
  const {
    asteroids,
    loadingSearch: loading,
    errorSearch: error
  } = useAsteroidsContext()
  const { sort } = useSortContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])

  const filteredAsteroids =
    favorites != null && showFavorites
      ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
      : asteroids

  const sortedFavorites = filteredAsteroids?.sort(sortContent)

  return (
    <div>
      <header>
        <h1>
        Asteroids{' '}
          <small>
            <button
              className='favorite-button'
              onClick={() => {
                setShowFavorites(!showFavorites)
              }}
            >
              <span>{showFavorites ? '💜' : '🤍'}</span>
            </button>
          </small>
        </h1>
      </header>
      {error != null && <h3 className="error-message">{error.message}</h3>}
      <section>
        <IntervalRangeComponent
          initDate={initDate}
          endDate={endDate}
          onInitDateChange={(date) => {
            setInitDate(date)
          }}
          onEndDateChange={(date) => {
            setEndDate(date)
          }}
        />
        <SortComponent />
      </section>
      <main>
        {loading
          ? (
            <LoadingComponent/>
          )
          : sortedFavorites != null && sortedFavorites.length > 0
            ? (
              <ul>
                {sortedFavorites.map((asteroid) => (
                  <li className={styles.item} key={asteroid.id}>
                    <AsteroidComponent {...asteroid} />
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
