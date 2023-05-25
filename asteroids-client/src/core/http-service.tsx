import { CLIENT_PATHS } from '.'

export const httpService = {
  get: async (url: string, delegateWrongResponseRedirection?: boolean) => {
    try {
      const response = await fetch(url)
      if (delegateWrongResponseRedirection) {
        if (response.status === 404) {
          window.location.href = CLIENT_PATHS.NOT_FOUND
        }
        if (response.status === 500) {
          window.location.href = CLIENT_PATHS.ERROR
        }
      }
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      return { data, response }
    } catch (error: Error | any) {
      throw new Error(error)
    }
  },
  post: async (url: string, body?: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      return { data, response }
    } catch (error: Error | any) {
      throw new Error(error)
    }
  },
  delete: async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      return { data, response }
    } catch (error: Error | any) {
      throw new Error(error)
    }
  }
}
