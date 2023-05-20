import { type ReactNode } from 'react'
import { AsteroidsProvider } from '../providers/asteroids-provider.tsx'
import { DatesProvider } from '../providers/dates-provide.tsx'
import { SortProvider } from '../providers/sort-provide.tsx'
import { FavoritesProvider } from '../providers/favorites-provider.tsx'

export const ProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AsteroidsProvider>
      <DatesProvider>
        <SortProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </SortProvider>
      </DatesProvider>
    </AsteroidsProvider>
  )
}
