import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AsteroidDetailPage } from './pages/detail/index.tsx'
import { HomePage } from './pages/home/index.tsx'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route
          path="/asteroid/:asteroidId"
          element={<AsteroidDetailPage />}
        />
      </Routes>
    </Router>
  )
}
