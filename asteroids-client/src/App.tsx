import { useCallback, useState } from 'react'
import './App.css'
import { AsteroidComponent } from './components/asteroid-component'
import { IntervalRangeComponent } from './components/interval-range-component'
import { SortComponent } from './components/sort-component'
import { useDatesContext } from './providers/dates-provide'
import { useSortContext } from './providers/sort-provide'
import { sortAsteroids } from './utils/sort-asteroids'
import { useAsteroidsContext } from './providers/asteroids-provider'
import { useFavoritesContext } from './providers/favorites-provider'

function App () {
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const { favorites } = useFavoritesContext()
  const { initDate, endDate, setInitDate, setEndDate } = useDatesContext()
  const { asteroids, loading, error } = useAsteroidsContext()
  const { sort } = useSortContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])

  if (loading) {
    return <div>Loading...</div>
  }

  const filteredAsteroids =
    favorites != null && showFavorites
      ? asteroids?.filter((asteroid) => favorites.includes(asteroid.id))
      : asteroids

  const sortedFavorites = filteredAsteroids?.sort(sortContent)

  return (
    <div className="App">
      <h1>
        Asteroids{' '}
        <small>
          <button
            onClick={() => {
              setShowFavorites(!showFavorites)
            }}
          >
            {showFavorites ? '❤️' : '🤍'}
          </button>
        </small>
      </h1>
      {error != null && <h3 className="error-message">{error.message}</h3>}
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
      {sortedFavorites != null && sortedFavorites.length > 0
        ? (
        <ul>
          {sortedFavorites.map((asteroid) => (
            <li key={asteroid.id}>
              <AsteroidComponent {...asteroid} />
            </li>
          ))}
        </ul>
          )
        : showFavorites ? <p>No favorites</p> : <p>No asteroids</p> }
    </div>
  )
}

export default App
