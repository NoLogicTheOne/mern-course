import { useState, useCallback } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = {}, headers = {}) => {
    setLoading(true)
    try {
      body = JSON.stringify(body)
      headers['content-type'] = 'application/json'

      const response = await fetch(url, {
        method,
        body,
        headers
      })
      const data = await response.json()
      
      if(!response.ok){
        setLoading(false)
        setError(data.message || "something went wrong")
        throw new Error( data.message || "something went wrong")
      }
      
      setLoading(false)
      
      return data
    } catch (e) {
      setLoading(false)
      throw new Error( e.message || "something went wrong")
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  return { loading, request, error, clearError }
}