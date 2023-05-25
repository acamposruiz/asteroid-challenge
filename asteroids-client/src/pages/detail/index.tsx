import { Link } from 'react-router-dom'

import {
  FavoriteButton,
  FavoriteButtonSize,
  Loading,
  RowData,
  Minimal
} from '@/components'
import { useFavoritesContext } from '@/providers'

import { ExtraData } from './components/extra-data'
import { useDetail } from './hooks'

export function DetailPage () {
  const { favorites, toggleFavorite } = useFavoritesContext()
  const { asteroid, loading, error } = useDetail()

  if (error) {
    return (
      <Minimal>
        <h3 className="error-message">{error.message}</h3>
      </Minimal>
    )
  }

  if (loading) {
    return (
      <Minimal>
        <Loading />
      </Minimal>
    )
  }

  if (asteroid == null) {
    return (
      <Minimal>
        <p>Asteroid not found</p>
      </Minimal>
    )
  }

  const { name, estimatedDiameter, isPotentiallyHazardousAsteroid, orbitalData, date } = asteroid

  return (
    <div>
      <header>
        <Link to="/">Back to home</Link>
        <h1>
          {name}
          <div>
            <FavoriteButton
              isFavorite={favorites?.includes(asteroid.id)}
              onClick={() => {
                toggleFavorite(asteroid.id)
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
        <ExtraData orbitalData={orbitalData} />
      </main>
    </div>
  )
}
