/* eslint-disable no-prototype-builtins */

import { type AsteroidModel } from '../models'

export const sortAsteroids = (sort: [keyof AsteroidModel, boolean] | null) => (a: AsteroidModel, b: AsteroidModel) => {
  if (sort == null) {
    return 0
  }

  const [sortKey, sortAsc] = sort

  const valueA = a.hasOwnProperty(sortKey) ? a[sortKey] ?? 0 : 0
  const valueB = b.hasOwnProperty(sortKey) ? b[sortKey] ?? 0 : 0

  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return sortAsc ? valueA - valueB : valueB - valueA
  }

  if (typeof valueA === 'string' && typeof valueB === 'string') {
    return sortAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
  }

  if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
    return sortAsc ? (valueA ? 1 : 0) - (valueB ? 1 : 0) : (valueB ? 1 : 0) - (valueA ? 1 : 0)
  }

  return 0
}
