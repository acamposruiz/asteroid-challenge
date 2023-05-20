import './App.css'
import { AsteroidComponent } from './components/asteroid-component'
import { IntervalRangeComponent } from './components/interval-range-component'
import { SortComponent } from './components/sort-component'
import { useAsteroids } from './hooks/useAsteroids'
import { type AsteroidModel } from './models/models-app'
import { useDatesContext } from './providers/dates-provide'
import { useSortContext } from './providers/sort-provide'

const API_KEY = 'ejeG5zIpLfN7belXBAlZx6vElO0ch5CdlKhldP4h'

function App () {
  const { initDate, endDate, setInitDate, setEndDate } = useDatesContext()
  const { asteroids, loading, error } = useAsteroids(API_KEY, initDate, endDate)
  const { sort } = useSortContext()

  const sortAsteroids = (a: AsteroidModel, b: AsteroidModel) => {
    if (sort == null) {
      return 0
    }
    const [sortKey, sortAsc] = sort
    if (a[sortKey] < b[sortKey]) {
      return sortAsc ? -1 : 1
    }
    if (a[sortKey] > b[sortKey]) {
      return sortAsc ? 1 : -1
    }
    return 0
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <h1>Asteroids</h1>
      {error != null && <h3 className='error-message'>{error.message}</h3>}
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
      <ul>
        {asteroids?.sort(sortAsteroids).map((asteroid) => (
          <li key={asteroid.id}>
            <AsteroidComponent {...asteroid} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
