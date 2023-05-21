import { type AsteroidModel } from '../models/search-models-app'
import {
  Link
} from 'react-router-dom'
import { ToggleFavoriteComponent } from './toggle-favorite-component'

export function AsteroidComponent ({
  id: asteroidId,
  name,
  date,
  estimatedDiameter,
  isPotentiallyHazardousAsteroid,
  jplUrl
}: AsteroidModel) {
  const asteroidPath = `/asteroid/${asteroidId}`
  return (
    <div>
      <h2><Link to={asteroidPath}>{name}</Link> <small><ToggleFavoriteComponent asteroidId={asteroidId} /></small></h2>
      <p>Date: {date}</p>
      <p>Estimated diameter: {estimatedDiameter} meters</p>
      <p>
        Potentially hazardous: {isPotentiallyHazardousAsteroid ? 'yes' : 'no'}
      </p>
      <p>Link: {jplUrl}</p>
    </div>
  )
}
