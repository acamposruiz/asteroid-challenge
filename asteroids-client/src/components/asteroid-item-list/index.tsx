import { Link } from 'react-router-dom'

import { FavoriteButton, RowData } from '@/components'

import styles from './styles.module.css'

interface AsteroidComponentProps {
  id: string
  name: string
  date: string
  estimatedDiameter: number
  isPotentiallyHazardousAsteroid: boolean
  isFavorite: boolean | undefined
  onFavoriteClick: () => void
}
export function AsteroidItemList ({
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
        <FavoriteButton isFavorite={isFavorite} onClick={onFavoriteClick} />
      </h2>
      <Link className={styles.link} to={asteroidPath}>
        Go detail page
      </Link>
      <RowData title="Date" value={date} />
      <RowData title="Estimated diameter" value={`${estimatedDiameter} meters`} />
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
