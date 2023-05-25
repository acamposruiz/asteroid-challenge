import { Link } from 'react-router-dom'

import {
  FavoriteButtonComponent, FavoriteButtonSize, LoadingComponent, RowData
} from '@/components'
import { useFavoritesContext } from '@/providers'

import { ExtraDataComponent } from './extra-data'
import { useDetail } from './hooks'

export function DetailPage () {
  const { favorites, toggleFavorite } = useFavoritesContext()
  const { asteroidId, asteroid, loading, error } = useDetail()

  if (loading) {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <LoadingComponent />
      </div>
    )
  }

  if (asteroid == null || asteroidId === undefined) {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <p>Asteroid not found</p>
      </div>
    )
  }
  const { name, estimatedDiameter, isPotentiallyHazardousAsteroid, orbitalData, date } = asteroid

  return (
    <div>
      <header>
        <Link to="/">Back to home</Link>
        {error != null && <h3 className="error-message">{error.message}</h3>}

        <h1>
          {name}
          <div>
            <FavoriteButtonComponent
              isFavorite={favorites?.includes(asteroidId)}
              onClick={() => {
                toggleFavorite(asteroidId)
              }}
              size={FavoriteButtonSize.Big}
            />
          </div>
        </h1>
      </header>
      <main>
        <section>
          <h3>General data</h3>
          <RowData title="Date" value={date} />
          <RowData title="Estimated diameter" value={estimatedDiameter} />
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
        <ExtraDataComponent orbitalData={orbitalData} />
      </main>
    </div>
  )
}
