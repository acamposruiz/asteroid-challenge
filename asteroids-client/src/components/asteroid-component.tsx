import { type AsteroidModel } from '../models/models-app'

export function AsteroidComponent ({
  name,
  estimatedDiameter,
  isPotentiallyHazardousAsteroid,
  jplUrl
}: AsteroidModel) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Estimated diameter: {estimatedDiameter} meters</p>
      <p>
        Potentially hazardous: {isPotentiallyHazardousAsteroid ? 'yes' : 'no'}
      </p>
      <p>Link: {jplUrl}</p>
    </div>
  )
}
