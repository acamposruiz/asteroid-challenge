import { useCallback } from 'react'
import './App.css'
import { AsteroidComponent } from './components/asteroid-component'
import { IntervalRangeComponent } from './components/interval-range-component'
import { SortComponent } from './components/sort-component'
import { useDatesContext } from './providers/dates-provide'
import { useSortContext } from './providers/sort-provide'
import { sortAsteroids } from './utils/sort-asteroids'
import { useAsteroidsContext } from './providers/asteroids-provider'

function App () {
  const { initDate, endDate, setInitDate, setEndDate } = useDatesContext()
  const { asteroids, loading, error } = useAsteroidsContext()
  const { sort } = useSortContext()
  const sortContent = useCallback(sortAsteroids(sort), [sort])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <h1>Asteroids</h1>
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
      {(asteroids != null) && asteroids.length > 0 && <ul>
        {[...asteroids].sort(sortContent).map((asteroid) => (
          <li key={asteroid.id}>
            <AsteroidComponent {...asteroid} />
          </li>
        ))}
      </ul>}

    </div>
  )
}

export default App
