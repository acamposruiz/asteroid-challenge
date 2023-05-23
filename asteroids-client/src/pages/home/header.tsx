import { IntervalRangeComponent } from '../../components/interval-range'
import { SortComponent } from '../../components/sort'
import { FavoriteButtonComponent } from '../../components/favorite-button'
import { useHome } from './hooks'

export function Header () {
  const {
    date,
    setDate,
    error,
    sort,
    setSort,
    showFavorites,
    setShowFavorites,
    favoritesButtonEnabled
  } = useHome()

  return (
    <header>
      <h1>
        Asteroids{' '}
        <small>
          <FavoriteButtonComponent
            enabled={favoritesButtonEnabled}
            isFavorite={showFavorites}
            isBig={true}
            onClick={() => {
              setShowFavorites(!showFavorites)
            }}
          />
        </small>
      </h1>
      {error != null && <h3 className="error-message">{error.message}</h3>}
      <section>
        <IntervalRangeComponent
          startDateInit={date.startDate}
          endDateInit={date.endDate}
          onSubmit={({ startDate, endDate }) => {
            setDate({ startDate, endDate })
          }}
        />
        <SortComponent
          {...{
            sort,
            setSort
          }}
        />
      </section>
    </header>
  )
}
