import { type AsteroidModel } from '../../models/search-models-app'
import { useSortContext } from '../../providers/sort-provide'

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
      <label className="retro-checkbox">
        <input
          type="checkbox"
          checked={sort?.[1] ?? false}
          onChange={() => {
            if (sort == null) {
              return
            }
            setSort([sort[0], !sort[1]])
          }}
        />
        Ascending
      </label>
    </div>
  )
}
