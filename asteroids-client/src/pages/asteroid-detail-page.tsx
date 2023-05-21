/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  if (!loading && asteroidId != null && asteroid?.orbitalData == null) {
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
  const { name, estimatedDiameter, isPotentiallyHazardousAsteroid, jplUrl, orbitalData } =
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
          <p>Orbit ID: {orbitalData?.orbitId}</p>
          <p>
            Orbit determination date:{' '}
            {orbitalData?.orbitDeterminationDate}
          </p>
          <p>
            First observation date: {orbitalData?.firstObservationDate}
          </p>
          <p>
            Last observation date: {orbitalData?.lastObservationDate}
          </p>
          <p>Data arc in days: {orbitalData?.dataArcInDays}</p>
          <p>Observations used: {orbitalData?.observationsUsed}</p>
          <p>Orbit uncertainty: {orbitalData?.orbitUncertainty}</p>
          <p>
            Minimum orbit intersection:{' '}
            {orbitalData?.minimumOrbitIntersection}
          </p>
          <p>
            Jupiter tisserand invariant:{' '}
            {orbitalData?.jupiterTisserandInvariant}
          </p>
          <p>Epoch osculation: {orbitalData?.epochOsculation}</p>
          <p>Eccentricity: {orbitalData?.eccentricity}</p>
          <p>Semi major axis: {orbitalData?.semiMajorAxis}</p>
          <p>Inclination: {orbitalData?.inclination}</p>
          <p>
            Ascending node longitude:{' '}
            {orbitalData?.ascendingNodeLongitude}
          </p>
          <p>Orbital period: {orbitalData?.orbitalPeriod}</p>
          <p>Perihelion distance: {orbitalData?.perihelionDistance}</p>
          <p>Perihelion argument: {orbitalData?.perihelionArgument}</p>
          <p>Aphelion distance: {orbitalData?.aphelionDistance}</p>
          <p>Perihelion time: {orbitalData?.perihelionTime}</p>
          <p>Mean anomaly: {orbitalData?.meanAnomaly}</p>
          <p>Mean motion: {orbitalData?.meanMotion}</p>
          <p>Equinox: {orbitalData?.equinox}</p>
        </>
          )}
    </div>
  )
}
