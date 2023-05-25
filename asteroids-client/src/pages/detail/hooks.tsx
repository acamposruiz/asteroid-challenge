import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type AsteroidModel } from '../../models/search-models-app'
import { endpoints } from '../../core/endpoints'
import { urlConstructor, API_KEY } from '../../utils/url-constructor'
import { httpService } from '../../core/http-service'
import { asteroidDetailMapper } from '../../mappers/asteroids-mapper'
import { useAsteroidsContext } from '../../providers/asteroids-provider'

export function useDetail () {
  const { asteroidId } = useParams()
  const { asteroids, setAsteroids } = useAsteroidsContext()
  const [asteroid, setAsteroid] = useState<AsteroidModel | null>(() => {
    if (asteroids == null) {
      return null
    }
    return asteroids.find(asteroid => asteroid.id === asteroidId) ?? null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getDetail = async (id: string | undefined) => {
    if (id == null) {
      return
    }

    setLoading(true)

    const search = new URLSearchParams({
      api_key: API_KEY
    })

    const detailUrl = urlConstructor({
      endpoint: endpoints.ASTEROIDS_DETAIL,
      params: [id],
      search
    })

    try {
      const { data } = await httpService.get(detailUrl)
      const asteroidDetail = asteroidDetailMapper(data)
      setAsteroid(asteroidDetail)
      setError(null)
      if (asteroids == null) {
        return
      }
      setAsteroids(asteroids.map(asteroidItem => {
        if (asteroidItem.id === asteroidDetail.id) {
          return { ...asteroidDetail, ...asteroidItem }
        }
        return asteroidItem
      }))
    } catch (error: Error | any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!asteroid?.orbitalData) {
      setLoading(true)
      void getDetail(asteroidId)
    }
  }, [])

  return {
    asteroidId,
    asteroid,
    loading,
    error
  }
}
