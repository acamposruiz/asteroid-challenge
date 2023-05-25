import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { DetailPage, ErrorPage, HomePage, NotFoundPage } from '@/pages'

import { CLIENT_PATHS } from './'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index path={CLIENT_PATHS.HOME} element={<HomePage />} />
        <Route
          path={CLIENT_PATHS.ASTEROID_DETAIL}
          element={<DetailPage />}
        />
        {['*', CLIENT_PATHS.NOT_FOUND].map((path, index) =>
          <Route path={path} element={<NotFoundPage />} key={index} />
        )}
        <Route index path={CLIENT_PATHS.ERROR} element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
