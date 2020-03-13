import { useState } from "react"
import { useCallback } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = useCallback((url, method = 'GET', body = null, headers = {}) => {
    try {
      const response = await fetch(url, {
        method,
        body,
        headers
      })
      const data = await response.json()
      
      if(!response.ok){
        setError(data.message || "something went wrong")
        throw new Error( data.message || "something went wrong")
      }

      setLoading(false)

      return data
    } catch (e) {
      
    }
  }, [])

  return { loading, request, error }
}