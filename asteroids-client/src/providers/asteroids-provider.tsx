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
  fetchAsteroidDetail: (id: string) => void
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

  const unMemorizedFetchAsteroidsSearch = async (dateParam: { startDate: string, endDate: string }) => {
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
      const asteroidsRawFlatted: AsteroidAPI[] = Object.values((data as ResponseSearchAPI).near_earth_objects).flat()
      setAsteroids(asteroidsSearchMapper(asteroidsRawFlatted))
      setErrorSearch(null)
    } catch (error: Error | any) {
      setErrorSearch(error)
      setAsteroids([])
    } finally {
      setLoadingSearch(false)
    }
  }

  const unMemorizedFetchAsteroidDetail = async (id: string) => {
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
      setAsteroids((asteroidsPrev) => {
        console.log({ asteroidsPrev })

        if (asteroidsPrev == null) {
          return null
        }
        const asteroidIndex = asteroidsPrev.findIndex((asteroid) => asteroid.id === asteroidDetail.id)
        if (asteroidIndex === -1) {
          return asteroidsPrev
        }
        const newAsteroids = [...asteroidsPrev]
        newAsteroids[asteroidIndex] = asteroidDetail
        return newAsteroids
      })
      setErrorDetail(null)
    } catch (error: Error | any) {
      setErrorDetail(error)
    } finally {
      setLoadingDetail(false)
    }
  }

  const fetchAsteroidsSearch = useCallback(unMemorizedFetchAsteroidsSearch, [])
  const fetchAsteroidDetail = useCallback(unMemorizedFetchAsteroidDetail, [asteroids])

  useEffect(() => {
    setLoadingSearch(true)
    void fetchAsteroidsSearch(date)
  }, [date])

  return (
    <asteroidsContext.Provider value={{ asteroids, fetchAsteroidDetail, loadingSearch, loadingDetail, errorSearch, errorDetail }}>
      {children}
    </asteroidsContext.Provider>
  )
}

export const useAsteroidsContext = (asteroidId?: string): AsteroidsContextProps => {
  const context = useContext(asteroidsContext)
  if (context == null) {
    throw new Error('useAsteroidsContext must be used within an AsteroidsProvider')
  }
  const { asteroids, fetchAsteroidDetail } = context

  useEffect(() => {
    if (asteroidId != null) {
      const asteroid = asteroids?.find(
        (asteroid: AsteroidModel) => asteroid.id === asteroidId)

      if (asteroid?.orbitalData == null) {
        fetchAsteroidDetail(asteroidId)
      }
    }
  }, [fetchAsteroidDetail])

  if (asteroidId != null) {
    const detailContent = asteroids?.find(
      (asteroid: AsteroidModel) => asteroid.id === asteroidId
    )
    return { ...context, detailContent }
  }

  return context
}
