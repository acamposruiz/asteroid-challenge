
export const httpService = {
  get: async (url: string) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_message)
      }
      return data
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
      return data
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
      return data
    } catch (error: Error | any) {
      throw new Error(error)
    }
  }
}
