import { createContext, useState, useContext, useEffect, type ReactNode } from 'react'
import { useDatesContext } from './dates-provide'
import { asteroidsSearchMapper } from '../mappers/asteroids-mapper'
import { API_KEY, endpoints, urlConstructor } from '../utils/endpoints'
import { httpService } from '../utils/http-service'
import { type ResponseSearchAPI, type AsteroidAPI } from '../models/search-models-api'
import { type AsteroidModel } from '../models/search-models-app'

interface AsteroidsContextProps {
  asteroids: AsteroidModel[] | null
  setAsteroids: (asteroids: AsteroidModel[] | null) => void
  loading: boolean
  error: Error | null
}

const asteroidsContext = createContext<AsteroidsContextProps | null>(null)

export const AsteroidsProvider = ({ children }: { children: ReactNode }) => {
  const [asteroids, setAsteroids] = useState<AsteroidModel[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { date } = useDatesContext()

  const searchAsteroids = async (dateParam: { startDate: string, endDate: string }) => {
    const search = new URLSearchParams({
      start_date: dateParam.startDate,
      end_date: dateParam.endDate,
      api_key: API_KEY
    })

    const searchUrl = urlConstructor({
      endpoint: endpoints.ASTEROIDS_SEARCH,
      search
    })

    try {
      setLoading(true)
      const { data } = await httpService.get(searchUrl)
      const asteroidsRawFlatted: AsteroidAPI[] = Object.values(
        (data as ResponseSearchAPI).near_earth_objects
      ).flat()
      setAsteroids(asteroidsSearchMapper(asteroidsRawFlatted))
      setError(null)
    } catch (error: Error | any) {
      setError(error)
      setAsteroids([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    void searchAsteroids(date)
  }, [date])

  return (
    <asteroidsContext.Provider
      value={{ asteroids, setAsteroids, loading, error }}
    >
      {children}
    </asteroidsContext.Provider>
  )
}

export const useAsteroidsContext = (): AsteroidsContextProps => {
  const context = useContext(asteroidsContext)
  if (context == null) {
    throw new Error('useAsteroidsContext must be used within an AsteroidsProvider')
  }

  return context
}
