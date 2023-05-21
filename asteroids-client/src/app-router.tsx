import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AsteroidDetailComponent } from './components/asteroid-detail-component.tsx'
import { HomeComponent } from './components/home-component.tsx'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomeComponent />} />
        <Route
          path="/asteroid/:asteroidId"
          element={<AsteroidDetailComponent />}
        />
      </Routes>
    </Router>
  )
}
