import { type ResponseDetailAPI, type AsteroidAPI, type AsteroidModel } from '@/models'

export const asteroidsSearchMapper = (asteroids: AsteroidAPI[]): AsteroidModel[] => {
  return asteroids.map((asteroid) => ({
    id: asteroid.id,
    name: asteroid.name,
    date: asteroid.close_approach_data[0].close_approach_date,
    estimatedDiameter: asteroid.estimated_diameter.meters.estimated_diameter_min,
    isPotentiallyHazardousAsteroid: asteroid.is_potentially_hazardous_asteroid,
    jplUrl: asteroid.nasa_jpl_url
  }))
}

export const asteroidDetailMapper = (asteroid: ResponseDetailAPI): AsteroidModel => {
  return {
    id: asteroid.id,
    name: asteroid.name,
    date: asteroid.close_approach_data[0].close_approach_date,
    estimatedDiameter: asteroid.estimated_diameter.meters.estimated_diameter_min,
    isPotentiallyHazardousAsteroid: asteroid.is_potentially_hazardous_asteroid,
    jplUrl: asteroid.nasa_jpl_url,
    orbitalData: {
      orbitId: asteroid.orbital_data.orbit_id,
      orbitDeterminationDate: asteroid.orbital_data.orbit_determination_date,
      firstObservationDate: asteroid.orbital_data.first_observation_date,
      lastObservationDate: asteroid.orbital_data.last_observation_date,
      dataArcInDays: asteroid.orbital_data.data_arc_in_days,
      observationsUsed: asteroid.orbital_data.observations_used,
      orbitUncertainty: asteroid.orbital_data.orbit_uncertainty,
      minimumOrbitIntersection: asteroid.orbital_data.minimum_orbit_intersection,
      jupiterTisserandInvariant: asteroid.orbital_data.jupiter_tisserand_invariant,
      epochOsculation: asteroid.orbital_data.epoch_osculation,
      eccentricity: asteroid.orbital_data.eccentricity,
      semiMajorAxis: asteroid.orbital_data.semi_major_axis,
      inclination: asteroid.orbital_data.inclination,
      ascendingNodeLongitude: asteroid.orbital_data.ascending_node_longitude,
      orbitalPeriod: asteroid.orbital_data.orbital_period,
      perihelionDistance: asteroid.orbital_data.perihelion_distance,
      perihelionArgument: asteroid.orbital_data.perihelion_argument,
      aphelionDistance: asteroid.orbital_data.aphelion_distance,
      perihelionTime: asteroid.orbital_data.perihelion_time,
      meanAnomaly: asteroid.orbital_data.mean_anomaly,
      meanMotion: asteroid.orbital_data.mean_motion,
      equinox: asteroid.orbital_data.equinox
    }
  }
}
