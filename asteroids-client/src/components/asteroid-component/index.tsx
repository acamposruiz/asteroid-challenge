import { Link } from 'react-router-dom'
import { FavoriteButtonComponent } from '../favorite-button'
import styles from './styles.module.css'
import { RowData } from '../row-data'

interface AsteroidComponentProps {
  id: string
  name: string
  date: string
  estimatedDiameter: number
  isPotentiallyHazardousAsteroid: boolean
  isFavorite: boolean | undefined
  onFavoriteClick: () => void
}
export function AsteroidComponent ({
  id: asteroidId,
  name,
  date,
  estimatedDiameter,
  isPotentiallyHazardousAsteroid,
  isFavorite,
  onFavoriteClick
}: AsteroidComponentProps) {
  const asteroidPath = `/asteroid/${asteroidId}`
  return (
    <article className={styles.content}>
      <h2>
        {name}
        <FavoriteButtonComponent
          isFavorite={isFavorite}
          onClick={onFavoriteClick}
        />
      </h2>
      <Link className={styles.link} to={asteroidPath}>
        Go detail page
      </Link>
      <RowData title="Date" value={date} />
      <RowData
        title="Estimated diameter"
        value={`${estimatedDiameter} meters`}
      />
      <RowData
        title="Potentially hazardous"
        isWarning={isPotentiallyHazardousAsteroid}
        value={
          isPotentiallyHazardousAsteroid
            ? 'This asteroid is potentially hazardous'
            : 'This asteroid is not potentially hazardous'
        }
      />
    </article>
  )
}
