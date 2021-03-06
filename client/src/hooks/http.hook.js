import { useState, useCallback } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if(body !== null){
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()
      
      if(!response.ok){
        setError(data.message || "Response from register isn't ok")
        throw new Error( data.message || "something went wrong")
      }
      
      setLoading(false)
      
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw new Error( e.message || "something went wrong")
    }
  }, [])

  //use callback because Error was cleared to fast
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { loading, request, error, clearError }
}