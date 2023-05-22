import { type AsteroidModel } from '../../models/search-models-app'

export function SortComponent ({
  sort,
  setSort
}: {
  sort: [keyof AsteroidModel, boolean] | null
  setSort: (sort: [keyof AsteroidModel, boolean] | null) => void
}) {
  return (
    <div>
      <label>
        Sort by:
        <select
          value={sort?.[0] ?? ''}
          onChange={(e) => {
            const sortKey = e.target.value
            setSort(
              sortKey === '' ? null : [sortKey as keyof AsteroidModel, true]
            )
          }}
        >
          <option value="">---</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="estimatedDiameter">Estimated diameter</option>
          <option value="isPotentiallyHazardousAsteroid">Dangerousness</option>
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
