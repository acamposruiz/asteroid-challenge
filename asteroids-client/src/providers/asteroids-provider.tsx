/* eslint-disable @typescript-eslint/no-misused-promises */
import { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from 'react'
import { useDatesContext } from './dates-provide'
import { asteroidDetailMapper, asteroidsSearchMapper } from '../mappers/asteroids-mapper'
import { API_KEY, endpoints, urlConstructor } from '../utils/endpoints'
import { httpService } from '../utils/http-service'
import { type ResponseSearchAPI, type AsteroidAPI } from '../models/search-models-api'
import { type AsteroidModel } from '../models/search-models-app'

interface AsteroidsContextProps {
  asteroids: AsteroidModel[] | null
  detailContent?: AsteroidModel | null
  callDetail: (id: string) => void
  loadingSearch: boolean
  loadingDetail: boolean
  errorSearch: Error | null
  errorDetail: Error | null
}

const asteroidsContext = createContext<AsteroidsContextProps | null>(null)

export const AsteroidsProvider = ({ children }: { children: ReactNode }) => {
  const [asteroids, setAsteroids] = useState<AsteroidModel[] | null>(null)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [errorSearch, setErrorSearch] = useState<Error | null>(null)
  const [errorDetail, setErrorDetail] = useState<Error | null>(null)
  const { date } = useDatesContext()

  const unMemorizedSearchAsteroids = async (dateParam: { startDate: string, endDate: string }) => {
    const queryStringSearchAPI = new URLSearchParams({
      start_date: dateParam.startDate,
      end_date: dateParam.endDate,
      api_key: API_KEY
    })

    const urlSearchAPI = urlConstructor({
      endpoint: endpoints.ASTEROIDS_SEARCH,
      search: queryStringSearchAPI
    })

    try {
      setLoadingSearch(true)
      const { data } = await httpService.get(urlSearchAPI)
      const asteroidsRawFlatted: AsteroidAPI[] = Object.values(
        (data as ResponseSearchAPI).near_earth_objects
      ).flat()
      setAsteroids(asteroidsSearchMapper(asteroidsRawFlatted))
      setErrorSearch(null)
    } catch (error: Error | any) {
      setErrorSearch(error)
      setAsteroids([])
    } finally {
      setLoadingSearch(false)
    }
  }

  const unMemorizedCallDetail = async (id: string) => {
    if (asteroids == null) {
      return
    }
    setLoadingDetail(() => true)

    const queryStringDetailAPI = new URLSearchParams({
      api_key: API_KEY
    })

    const urlDetailAPI = urlConstructor({
      endpoint: endpoints.ASTEROIDS_DETAIL,
      params: [id],
      search: queryStringDetailAPI
    })

    try {
      const { data } = await httpService.get(urlDetailAPI)
      const asteroidDetail = asteroidDetailMapper(data)
      const asteroidIndex = asteroids.findIndex((asteroid) => asteroid.id === asteroidDetail.id)
      if (asteroidIndex === -1) {
        return asteroids
      }
      const newAsteroids = [...asteroids]
      newAsteroids[asteroidIndex] = asteroidDetail
      setAsteroids(newAsteroids)
      setErrorDetail(null)
    } catch (error: Error | any) {
      setErrorDetail(error)
    } finally {
      setLoadingDetail(false)
    }
  }

  const searchAsteroids = useCallback(unMemorizedSearchAsteroids, [])
  const callDetail = useCallback(unMemorizedCallDetail, [asteroids])

  useEffect(() => {
    setLoadingSearch(true)
    void searchAsteroids(date)
  }, [date])

  return (
    <asteroidsContext.Provider
      value={{ asteroids, callDetail, loadingSearch, loadingDetail, errorSearch, errorDetail }}
    >
      {children}
    </asteroidsContext.Provider>
  )
}

export const useAsteroidsContext = (asteroidId?: string): Partial<AsteroidsContextProps> => {
  const context = useContext(asteroidsContext)
  if (context == null) {
    throw new Error('useAsteroidsContext must be used within an AsteroidsProvider')
  }
  const { asteroids, callDetail, loadingSearch, loadingDetail, errorSearch, errorDetail } = context

  useEffect(() => {
    if (asteroidId != null) {
      const asteroid = asteroids?.find((asteroid: AsteroidModel) => asteroid.id === asteroidId)

      if (asteroid?.orbitalData == null) {
        callDetail(asteroidId)
      }
    }
  }, [callDetail])

  if (asteroidId != null) {
    const detailContent = asteroids?.find((asteroid: AsteroidModel) => asteroid.id === asteroidId)
    return { detailContent, loadingDetail, errorDetail }
  }

  return { asteroids, loadingSearch, errorSearch }
}
