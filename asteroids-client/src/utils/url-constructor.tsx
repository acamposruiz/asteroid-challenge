export const API_KEY = import.meta.env.VITE_API_KEY as string
const HOST = import.meta.env.VITE_HOST as string

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
