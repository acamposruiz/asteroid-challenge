
import { useEffect, useState } from 'react'
import './App.css'
import { type Asteroid, type Response } from './models'

const API_KEY = 'ejeG5zIpLfN7belXBAlZx6vElO0ch5CdlKhldP4h'
function App () {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    setLoading(true)
    const fetchAsteroids = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=' + API_KEY)
        const data: Response = await response.json()
        setAsteroids(Object.values(data.near_earth_objects)[0])
        setError(null)
      } catch (error: Error | any) {
        setAsteroids([])
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    void fetchAsteroids()
  }, [])

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
