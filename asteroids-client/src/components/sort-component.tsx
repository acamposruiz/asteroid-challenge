
import { type AsteroidModel } from '../models/search-models-app'
import { useSortContext } from '../providers/sort-provide'

export function SortComponent () {
  const { sort, setSort } = useSortContext()
  return (
    <div>
      <label>
        Sort by:
        <select
          value={sort?.[0] ?? ''}
          onChange={(e) => {
            const sortKey = e.target.value
            setSort(sortKey === '' ? null : [sortKey as keyof AsteroidModel, true])
          }}
        >
          <option value="">---</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="estimatedDiameter">Estimated diameter</option>
          <option value="isPotentiallyHazardousAsteroid" >Dangerousness</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={sort?.[1] ?? false}
          onChange={(e) => {
            if (sort == null) {
              return
            }
            const [, sortAsc] = sort
            setSort([sort[0], !sortAsc])
          }}
        />
        Ascending
      </label>
    </div>
  )
}
