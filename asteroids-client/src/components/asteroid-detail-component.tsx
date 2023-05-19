import { type AsteroidModel } from '../models/models-app'
import {
  Link, useParams
} from 'react-router-dom'
import { useAsteroidsContext } from '../providers/asteroids-provider'

export function AsteroidDetailComponent () {
  const params = useParams()
  const { asteroids } = useAsteroidsContext()
  const asteroid = asteroids?.find((asteroid: AsteroidModel) => asteroid.id === params.asteroidId)
  if (asteroid == null) {
    return (
      <div>
        <Link to='/'>Back to home</Link>
        <p>Asteroid not found</p>
      </div>
    )
  }
  const { name, estimatedDiameter, isPotentiallyHazardousAsteroid, jplUrl } = asteroid
  return (
    <div>
    <Link to='/'>Back to home</Link>
      <h2>{name}</h2>
      <p>Estimated diameter: {estimatedDiameter} meters</p>
      <p>
        Potentially hazardous: {isPotentiallyHazardousAsteroid ? 'yes' : 'no'}
      </p>
      <p>Link: {jplUrl}</p>
    </div>
  )
}
