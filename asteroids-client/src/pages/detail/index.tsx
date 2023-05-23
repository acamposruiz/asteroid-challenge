import { Link, useParams } from 'react-router-dom'
import { useAsteroidsContext } from '../../providers/asteroids-provider'
import { FavoriteButtonComponent } from '../../components/favorite-button'
import { LoadingComponent } from '../../components/loading'
import { RowData } from '../../components/row-data'
import { useFavoritesContext } from '../../providers/favorites-provider'
import { ExtraDataComponent } from './extra-data'

export function DetailPage () {
  const { asteroidId } = useParams()
  const { favorites, toggleFavorite } = useFavoritesContext()
  const { detailContent, loadingDetail, errorDetail } =
    useAsteroidsContext(asteroidId)

  if (detailContent == null || asteroidId === undefined) {
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
  } = detailContent

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
        {loadingDetail || !orbitalData
          ? (
            <LoadingComponent />
          )
          : (
            <ExtraDataComponent orbitalData={orbitalData} />
          )}
      </main>
    </div>
  )
}
