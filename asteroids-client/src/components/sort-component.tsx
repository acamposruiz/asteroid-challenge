
import { type AsteroidModel } from '../models/models-app'
import { useSortContext } from '../providers/sort-provide'

export function SortComponent () {
  const { sort, setSort } = useSortContext()
  return (
        <div>
            <label>
                Sort by:
                <select
                    value={sort ?? 'none'}
                    onChange={(e) => {
                      const value = e.target.value
                      setSort(value === 'none' ? null : value as keyof AsteroidModel)
                    }}
                >
                    <option value="none">None</option>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                    <option value="estimatedDiameter">Diameter</option>
                </select>
            </label>
        </div>
  )
}
