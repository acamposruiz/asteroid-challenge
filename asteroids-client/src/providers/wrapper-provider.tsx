import { type ReactNode } from 'react'

import { AsteroidsProvider } from './asteroids-provider.tsx'
import { DatesProvider } from './dates-provide.tsx'
import { FavoritesProvider } from './favorites-provider.tsx'
import { SortProvider } from './sort-provide.tsx'

export const WrapperProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DatesProvider>
      <AsteroidsProvider>
        <FavoritesProvider>
          <SortProvider>{children}</SortProvider>
        </FavoritesProvider>
      </AsteroidsProvider>
    </DatesProvider>
  )
}
