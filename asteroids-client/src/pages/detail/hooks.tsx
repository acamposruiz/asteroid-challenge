import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { endpoints, httpService } from '@/core'
import { asteroidDetailMapper } from '@/mappers'
import { type AsteroidModel } from '@/models'
import { useAsteroidsContext } from '@/providers'
import { API_KEY, urlConstructor } from '@/utils'

export function useDetail () {
  const { asteroidId } = useParams()
  const { asteroids, setAsteroids } = useAsteroidsContext()
  const [asteroid, setAsteroid] = useState<AsteroidModel | null>(
    asteroids?.find((asteroid) => asteroid.id === asteroidId) ?? null
  )
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
      const { data } = await httpService.get(detailUrl, true)
      if (data == null) {
        return
      }
      const asteroidDetail = asteroidDetailMapper(data)
      setAsteroid(asteroidDetail)
      setError(null)
      if (asteroids == null) {
        return
      }
      setAsteroids(
        asteroids.map((asteroidItem) => {
          if (asteroidItem.id === asteroidDetail.id) {
            return { ...asteroidDetail, ...asteroidItem }
          }
          return asteroidItem
        })
      )
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
    asteroid,
    loading,
    error
  }
}
