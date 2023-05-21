import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { AsteroidDetailComponent } from './components/asteroid-detail-component.tsx'

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

export const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}
