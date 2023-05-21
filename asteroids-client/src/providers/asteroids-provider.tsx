import { type ReactNode, createContext, useState, useContext, useEffect } from 'react'
import { type AsteroidModel } from '../models/models-app'
import { useDatesContext } from './dates-provide'
import { type ResponseAPI, type ResponseErrorAPI } from '../models/models-api'
import { asteroidsMapper } from '../mappers/asteroids-mapper'
import { API_KEY, endpoints, urlConstructor } from '../utils/endpoints'

const asteroidsContext = createContext<{
  asteroids: AsteroidModel[] | null
  loading: boolean
  error: Error | null
} | null>(null)

export const AsteroidsProvider = ({ children }: {
  children: ReactNode
}) => {
  const [asteroids, setAsteroids] = useState<AsteroidModel[] | null>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { initDate, endDate } = useDatesContext()

  const queryString = new URLSearchParams({
    start_date: initDate,
    end_date: endDate,
    api_key: API_KEY
  })

  const url = urlConstructor({
    endpoint: endpoints.ASTEROIDS,
    search: queryString
  })

  const fetchAsteroids = async () => {
    try {
      const response = await fetch(url)
      const data: ResponseAPI | ResponseErrorAPI = await response.json()
      if (!response.ok) {
        throw new Error((data as ResponseErrorAPI).error_message)
      }
      const asteroidsRawFlatted = Object.values((data as ResponseAPI).near_earth_objects).flat()
      setAsteroids(asteroidsMapper(asteroidsRawFlatted))
      setError(null)
    } catch (error: Error | any) {
      setAsteroids([])
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    void fetchAsteroids()
  }, [initDate, endDate])

  return (
        <asteroidsContext.Provider value={{ asteroids, loading, error }}>
            {children}
        </asteroidsContext.Provider>
  )
}

export const useAsteroidsContext = () => {
  const context = useContext(asteroidsContext)
  if (context == null) {
    throw new Error('useAsteroidsContext must be used within a asteroidsProvider')
  }
  return context
}
