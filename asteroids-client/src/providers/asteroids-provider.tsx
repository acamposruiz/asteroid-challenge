/* eslint-disable @typescript-eslint/no-misused-promises */
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react'
import { useDatesContext } from './dates-provide'
import { asteroidDetailMapper, asteroidsSearchMapper } from '../mappers/asteroids-mapper'
import { API_KEY, endpoints, urlConstructor } from '../utils/endpoints'
import { httpService } from '../utils/http-service'
import { type ResponseSearchAPI, type AsteroidAPI } from '../models/search-models-api'
import { type AsteroidModel } from '../models/search-models-app'

interface AsteroidsContextProps {
  asteroids: AsteroidModel[] | null
  fetchAsteroidDetail: (id: string) => void
  loading: boolean
  error: Error | null
}

const asteroidsContext = createContext<AsteroidsContextProps | null>(null)

export const AsteroidsProvider = ({ children }: { children: ReactNode }) => {
  const [asteroids, setAsteroids] = useState<AsteroidModel[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { initDate, endDate } = useDatesContext()

  const fetchAsteroidsSearch = async () => {
    const queryStringSearchAPI = new URLSearchParams({
      start_date: initDate,
      end_date: endDate,
      api_key: API_KEY
    })

    const urlSearchAPI = urlConstructor({
      endpoint: endpoints.ASTEROIDS_SEARCH,
      search: queryStringSearchAPI
    })

    try {
      setLoading(true)
      const data = await httpService.get(urlSearchAPI)
      const asteroidsRawFlatted: AsteroidAPI[] = Object.values((data as ResponseSearchAPI).near_earth_objects).flat()
      setAsteroids(asteroidsSearchMapper(asteroidsRawFlatted))
      setError(null)
    } catch (error: Error | any) {
      setError(error)
      setAsteroids([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAsteroidDetail = async (id: string) => {
    const queryStringDetailAPI = new URLSearchParams({
      api_key: API_KEY
    })

    const urlDetailAPI = urlConstructor({
      endpoint: endpoints.ASTEROIDS_DETAIL,
      params: [id],
      search: queryStringDetailAPI
    })

    try {
      setLoading(true)
      const data = await httpService.get(urlDetailAPI)
      const asteroidDetail = asteroidDetailMapper(data)
      setAsteroids((asteroids) => {
        if (asteroids == null) {
          return null
        }
        const asteroidIndex = asteroids.findIndex((asteroid) => asteroid.id === asteroidDetail.id)
        if (asteroidIndex === -1) {
          return asteroids
        }
        const newAsteroids = [...asteroids]
        newAsteroids[asteroidIndex] = asteroidDetail
        return newAsteroids
      })
      setError(null)
    } catch (error: Error | any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    void fetchAsteroidsSearch()
  }, [initDate, endDate])

  return (
    <asteroidsContext.Provider value={{ asteroids, fetchAsteroidDetail, loading, error }}>
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
