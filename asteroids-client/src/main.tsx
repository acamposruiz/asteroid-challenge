import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AsteroidsProvider } from './providers/asteroids-provider.tsx'
import { AsteroidDetailComponent } from './components/asteroid-detail-component.tsx'
import { DatesProvider } from './providers/dates-provide.tsx'
import { SortProvider } from './providers/sort-provide.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'asteroid/:asteroidId',
    element: <AsteroidDetailComponent />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AsteroidsProvider>
      <DatesProvider>
        <SortProvider>
          <RouterProvider router={router} />
        </SortProvider>
      </DatesProvider>
    </AsteroidsProvider>
  </React.StrictMode>
)
