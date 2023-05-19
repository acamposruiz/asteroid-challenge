
import { useEffect, useState } from 'react'
import { type ResponseAPI } from '../models/models-api'
import { type AsteroidModel } from '../models/models-app'
import { asteroidsMapper } from '../mappers/asteroids-mapper'

export function useAsteroids (apiKey: string, startDate: string, endDate: string) {
  const [asteroids, setAsteroids] = useState< AsteroidModel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  useEffect(() => {
    setLoading(true)
    const fetchAsteroids = async () => {
      try {
        const response = await fetch(url)
        const data: ResponseAPI = await response.json()
        setAsteroids(asteroidsMapper(Object.values(data.near_earth_objects)[0]))
        setError(null)
      } catch (error: Error | any) {
        setAsteroids([])
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    void fetchAsteroids()
  }, [])

  return { asteroids, loading, error }
}
