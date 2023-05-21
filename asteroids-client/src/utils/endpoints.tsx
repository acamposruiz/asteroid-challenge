const HOST = 'localhost:3001'
export const API_KEY = 'ejeG5zIpLfN7belXBAlZx6vElO0ch5CdlKhldP4h'

export const endpoints = {
  ASTEROIDS_SEARCH: 'asteroids-api/feed',
  ASTEROIDS_DETAIL: 'asteroids-api/neo',
  FAVORITES: 'favorites'
}

export const urlConstructor = ({
  endpoint,
  params = [],
  search
}: {
  endpoint: string
  params?: string[]
  search?: URLSearchParams
}): string => {
  const url = new URL(`http://${HOST}/${endpoint}/${params.join('/')}`)
  if (search != null) {
    url.search = search.toString()
  }
  return url.toString()
}
