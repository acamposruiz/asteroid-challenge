
import { type AsteroidModel } from '../models/search-models-app'

export const sortAsteroids = (sort: [keyof AsteroidModel, boolean] | null) => (a: AsteroidModel, b: AsteroidModel) => {
  if (sort == null) {
    return 0
  }
  const [sortKey, sortAsc] = sort
  if (a[sortKey] < b[sortKey]) {
    return sortAsc ? -1 : 1
  }
  if (a[sortKey] > b[sortKey]) {
    return sortAsc ? 1 : -1
  }
  return 0
}
