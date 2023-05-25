import {
  DateSearch, FavoriteButton, FavoriteButtonSize, Sort
} from '@/components'

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
    favoritesButtonDisabled,
    loading
  } = useHome()

  return (
    <header>
      <h1>
        Asteroids{' '}
        <FavoriteButton
          disabled={favoritesButtonDisabled}
          isFavorite={showFavorites}
          size={FavoriteButtonSize.Big}
          onClick={() => {
            setShowFavorites(!showFavorites)
          }}
        />
      </h1>
      {error != null && <h3 className="error-message">{error.message}</h3>}
      <section>
        <DateSearch
          disabled={loading}
          startDateInit={date.startDate}
          endDateInit={date.endDate}
          onSubmit={({ startDate, endDate }) => {
            setDate({ startDate, endDate })
          }}
        />
        <Sort
          disabled={loading}
          {...{
            sort,
            setSort
          }}
        />
      </section>
    </header>
  )
}
