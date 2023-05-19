
import './App.css'
import { useAsteroids } from './hooks/useAsteroids'

const API_KEY = 'ejeG5zIpLfN7belXBAlZx6vElO0ch5CdlKhldP4h'
function App () {
  const { asteroids, loading, error } = useAsteroids(API_KEY, '2021-08-01', '2021-08-08')

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <h1>Asteroids</h1>
      {(error != null) && <div>{error.message}</div>}
      <ul>
        {asteroids.map((asteroid) => (
          <li key={asteroid.id}>
            <h2>{asteroid.name}</h2>
            <p>Estimated diameter: {asteroid.estimated_diameter.meters.estimated_diameter_min} meters</p>
            <p>Potentially hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'yes' : 'no'}</p>
            <p>Link: {asteroid.nasa_jpl_url}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
