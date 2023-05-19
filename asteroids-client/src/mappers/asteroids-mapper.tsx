
import { type AsteroidAPI } from '../models/models-api'
import { type AsteroidModel } from '../models/models-app'

export const asteroidsMapper = (asteroids: AsteroidAPI[]): AsteroidModel[] => {
  return asteroids.map((asteroid) => ({
    id: asteroid.id,
    name: asteroid.name,
    estimatedDiameter: asteroid.estimated_diameter.meters.estimated_diameter_min,
    isPotentiallyHazardousAsteroid: asteroid.is_potentially_hazardous_asteroid,
    jplUrl: asteroid.nasa_jpl_url
  }))
}
