/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type AsteroidModel } from '../../models/search-models-app'
import { Link, useParams } from 'react-router-dom'
import { useAsteroidsContext } from '../../providers/asteroids-provider'
import { FavoriteButtonComponent } from '../../components/favorite-button'
import { LoadingComponent } from '../../components/loading'
import { RowData } from '../../components/row-data'
import { useFavoritesContext } from '../../providers/favorites-provider'
import styles from './styles.module.css'

export function AsteroidDetailPage () {
  const { asteroidId } = useParams()
  const { favorites, toggleFavorite } = useFavoritesContext()
  const { asteroids, fetchAsteroidDetail, loadingDetail, errorDetail } =
    useAsteroidsContext()
  const asteroid = asteroids?.find(
    (asteroid: AsteroidModel) => asteroid.id === asteroidId
  )
  if (asteroidId != null && asteroid?.orbitalData == null) {
    fetchAsteroidDetail(asteroidId)
  }

  if (asteroid == null || asteroidId === undefined) {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <p>Asteroid not found</p>
      </div>
    )
  }
  const {
    name,
    estimatedDiameter,
    isPotentiallyHazardousAsteroid,
    orbitalData,
    date
  } = asteroid

  return (
    <div>
      <header>
        <Link to="/">Back to home</Link>
        {errorDetail != null && (
          <h3 className="error-message">{errorDetail.message}</h3>
        )}

        <h1>
          {name}{' '}
          <small>
            <FavoriteButtonComponent
              isFavorite={favorites?.includes(asteroidId)}
              onClick={() => {
                toggleFavorite(asteroidId)
              }}
              isBig={true}
            />
          </small>
        </h1>
      </header>
      <main>
        <section>
          <h3>General data</h3>
          <RowData title="Date" value={date} />
          <RowData
            title="Estimated diameter"
            value={estimatedDiameter}
          />
          <RowData
            title="Potentially hazardous"
            value={
              isPotentiallyHazardousAsteroid
                ? 'This asteroid is potentially hazardous'
                : 'This asteroid is not potentially hazardous'
            }
            isWarning={isPotentiallyHazardousAsteroid}
          />
        </section>
        {loadingDetail
          ? (
            <LoadingComponent />
          )
          : (
            <div className={styles.extra}>
              <h3> Orbital data </h3>
              <RowData
                title="Orbit determination date"
                value={orbitalData?.orbitDeterminationDate}
              />
              <RowData
                title="First observation date"
                value={orbitalData?.firstObservationDate}
              />
              <RowData
                title="Last observation date"
                value={orbitalData?.lastObservationDate}
              />
              <RowData
                title="Data arc in days"
                value={orbitalData?.dataArcInDays}
              />
              <RowData
                title="Observations used"
                value={orbitalData?.observationsUsed}
              />
              <RowData
                title="Orbit uncertainty"
                value={orbitalData?.orbitUncertainty}
              />
              <RowData
                title="Minimum orbit intersection"
                value={orbitalData?.minimumOrbitIntersection}
              />
              <RowData
                title="Jupiter Tisserand invariant"
                value={orbitalData?.jupiterTisserandInvariant}
              />
              <RowData
                title="Epoch osculation"
                value={orbitalData?.epochOsculation}
              />
              <RowData title="Eccentricity" value={orbitalData?.eccentricity} />
              <RowData
                title="Semi major axis"
                value={orbitalData?.semiMajorAxis}
              />
              <RowData title="Inclination" value={orbitalData?.inclination} />
              <RowData
                title="Ascending node longitude"
                value={orbitalData?.ascendingNodeLongitude}
              />
              <RowData
                title="Orbital period"
                value={orbitalData?.orbitalPeriod}
              />
              <RowData
                title="Perihelion distance"
                value={orbitalData?.perihelionDistance}
              />
              <RowData
                title="Perihelion argument"
                value={orbitalData?.perihelionArgument}
              />
              <RowData
                title="Aphelion distance"
                value={orbitalData?.aphelionDistance}
              />
              <RowData
                title="Perihelion time"
                value={orbitalData?.perihelionTime}
              />
              <RowData title="Mean anomaly" value={orbitalData?.meanAnomaly} />
              <RowData title="Mean motion" value={orbitalData?.meanMotion} />
              <RowData title="Equinox" value={orbitalData?.equinox} />
            </div>
          )}
      </main>
    </div>
  )
}
