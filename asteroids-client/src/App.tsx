import './App.css'
import { AsteroidComponent } from './components/asteroid-component'
import { IntervalRangeComponent } from './components/interval-range-component'
import { useAsteroids } from './hooks/useAsteroids'
import useDates from './hooks/useDates'

const API_KEY = 'ejeG5zIpLfN7belXBAlZx6vElO0ch5CdlKhldP4h'

function App () {
  const { initDate, endDate, setInitDate, setEndDate } = useDates()
  const { asteroids, loading, error } = useAsteroids(API_KEY, initDate, endDate)

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
      <ul>
        {asteroids.map((asteroid) => (
          <li key={asteroid.id}>
            <AsteroidComponent {...asteroid} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
