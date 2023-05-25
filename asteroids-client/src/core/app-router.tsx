import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DetailPage, HomePage } from '@/pages'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route
          path="/asteroid/:asteroidId"
          element={<DetailPage />}
        />
      </Routes>
    </Router>
  )
}
