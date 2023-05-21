import { type AsteroidModel } from '../models/search-models-app'
import { Link, useParams } from 'react-router-dom'
import { useAsteroidsContext } from '../providers/asteroids-provider'

export function AsteroidDetailPage () {
  const { asteroidId } = useParams()
  const { asteroids, fetchAsteroidDetail, loading, error } =
    useAsteroidsContext()
  const asteroid = asteroids?.find(
    (asteroid: AsteroidModel) => asteroid.id === asteroidId
  )
  if (asteroidId != null && asteroid?.orbitalData == null) {
    fetchAsteroidDetail(asteroidId)
  }

  if (asteroid == null) {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <p>Asteroid not found</p>
      </div>
    )
  }
  const { name, estimatedDiameter, isPotentiallyHazardousAsteroid, jplUrl } =
    asteroid

  return (
    <div>
      <Link to="/">Back to home</Link>
      {error != null && <h3 className="error-message">{error.message}</h3>}
      <h1>{name}</h1>
      <p>Estimated diameter: {estimatedDiameter} meters</p>
      <p>
        {isPotentiallyHazardousAsteroid
          ? 'This asteroid is potentially hazardous'
          : 'This asteroid is not potentially hazardous'}
      </p>
      <p>Link: {jplUrl}</p>
      {loading
        ? (
        <div>Loading...</div>
          )
        : (
        <>
          <h3> Orbital data </h3>
          <p>Orbit ID: {asteroid.orbitalData?.orbitId}</p>
          <p>
            Orbit determination date:{' '}
            {asteroid.orbitalData?.orbitDeterminationDate}
          </p>
          <p>
            First observation date: {asteroid.orbitalData?.firstObservationDate}
          </p>
          <p>
            Last observation date: {asteroid.orbitalData?.lastObservationDate}
          </p>
          <p>Data arc in days: {asteroid.orbitalData?.dataArcInDays}</p>
          <p>Observations used: {asteroid.orbitalData?.observationsUsed}</p>
          <p>Orbit uncertainty: {asteroid.orbitalData?.orbitUncertainty}</p>
          <p>
            Minimum orbit intersection:{' '}
            {asteroid.orbitalData?.minimumOrbitIntersection}
          </p>
          <p>
            Jupiter tisserand invariant:{' '}
            {asteroid.orbitalData?.jupiterTisserandInvariant}
          </p>
          <p>Epoch osculation: {asteroid.orbitalData?.epochOsculation}</p>
          <p>Eccentricity: {asteroid.orbitalData?.eccentricity}</p>
          <p>Semi major axis: {asteroid.orbitalData?.semiMajorAxis}</p>
          <p>Inclination: {asteroid.orbitalData?.inclination}</p>
          <p>
            Ascending node longitude:{' '}
            {asteroid.orbitalData?.ascendingNodeLongitude}
          </p>
          <p>Orbital period: {asteroid.orbitalData?.orbitalPeriod}</p>
          <p>Perihelion distance: {asteroid.orbitalData?.perihelionDistance}</p>
          <p>Perihelion argument: {asteroid.orbitalData?.perihelionArgument}</p>
          <p>Aphelion distance: {asteroid.orbitalData?.aphelionDistance}</p>
          <p>Perihelion time: {asteroid.orbitalData?.perihelionTime}</p>
          <p>Mean anomaly: {asteroid.orbitalData?.meanAnomaly}</p>
          <p>Mean motion: {asteroid.orbitalData?.meanMotion}</p>
          <p>Equinox: {asteroid.orbitalData?.equinox}</p>
        </>
          )}
    </div>
  )
}
