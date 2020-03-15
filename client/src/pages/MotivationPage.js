import React from 'react'
import { useEffect } from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const MotivationPage = () => {
    const {request, error, loading, clearError} = useHttp()
    const message = useMessage()

    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    // const data = request('')

    return (
        <h1>Hi</h1>
    )
}