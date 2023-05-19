import { type AsteroidModel } from '../models/models-app'
import {
  Link
} from 'react-router-dom'

export function AsteroidComponent ({
  id: asteroidId,
  name,
  estimatedDiameter,
  isPotentiallyHazardousAsteroid,
  jplUrl
}: AsteroidModel) {
  const asteroidPath = `/asteroid/${asteroidId}`
  return (
    <div>
      <h2><Link to={asteroidPath}>{name}</Link></h2>
      <p>Estimated diameter: {estimatedDiameter} meters</p>
      <p>
        Potentially hazardous: {isPotentiallyHazardousAsteroid ? 'yes' : 'no'}
      </p>
      <p>Link: {jplUrl}</p>
    </div>
  )
}
