import { type AsteroidModel } from '../../models/search-models-app'
import {
  Link
} from 'react-router-dom'
import { ToggleFavoriteComponent } from '../toggle-favorite-component'
import styles from './styles.module.css'
import { RowData } from '../row-data'

export function AsteroidComponent ({
  id: asteroidId,
  name,
  date,
  estimatedDiameter,
  isPotentiallyHazardousAsteroid
}: AsteroidModel) {
  const asteroidPath = `/asteroid/${asteroidId}`
  return (
    <article className={styles.content}>
      <h2>{name}<small><ToggleFavoriteComponent asteroidId={asteroidId} /></small></h2>
      <Link className={styles.link} to={asteroidPath}>Go detail page</Link>
      <RowData title='Estimated diameter' value={`${estimatedDiameter} meters`} />
      <RowData
        title='Potentially hazardous'
        value={
          isPotentiallyHazardousAsteroid
            ? 'This asteroid is potentially hazardous'
            : 'This asteroid is not potentially hazardous'
        }
      />
      <RowData title='Date' value={date} />
    </article>
  )
}
