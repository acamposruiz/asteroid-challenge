/* eslint-disable no-prototype-builtins */

import { type AsteroidModel } from '../models/search-models-app'

export const sortAsteroids = (sort: [keyof AsteroidModel, boolean] | null) => (a: AsteroidModel, b: AsteroidModel) => {
  if (sort == null) {
    return 0
  }

  const [sortKey, sortAsc] = sort

  const valueA = a.hasOwnProperty(sortKey) ? a[sortKey] ?? 0 : 0
  const valueB = b.hasOwnProperty(sortKey) ? b[sortKey] ?? 0 : 0

  if (valueA < valueB) {
    return sortAsc ? -1 : 1
  }
  if (valueA > valueB) {
    return sortAsc ? 1 : -1
  }

  return 0
}
