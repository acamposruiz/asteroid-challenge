import { type ReactNode } from 'react'
import { AsteroidsProvider } from './asteroids-provider.tsx'
import { DatesProvider } from './dates-provide.tsx'
import { SortProvider } from './sort-provide.tsx'
import { FavoritesProvider } from './favorites-provider.tsx'

export const WrapperProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DatesProvider>
      <FavoritesProvider>
        <AsteroidsProvider>
          <SortProvider>{children}</SortProvider>
        </AsteroidsProvider>
      </FavoritesProvider>
    </DatesProvider>
  )
}
