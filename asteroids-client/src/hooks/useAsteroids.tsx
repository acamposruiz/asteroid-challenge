import { useEffect, useState } from 'react'
import { type ResponseErrorAPI, type ResponseAPI } from '../models/models-api'
import { asteroidsMapper } from '../mappers/asteroids-mapper'
import { useAsteroidsContext } from '../providers/asteroids-provider'

export function useAsteroids (
  apiKey: string,
  startDate: string,
  endDate: string
) {
  const { asteroids, setAsteroids } = useAsteroidsContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  useEffect(() => {
    setLoading(true)
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
    void fetchAsteroids()
  }, [startDate, endDate])

  return { asteroids, loading, error }
}
