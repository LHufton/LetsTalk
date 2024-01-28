// Experimental ErrorBoundary component that catches errors in child components. Currently inactive.
import React, { useState, useEffect } from 'react'

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorListener = (error) => {
      setHasError(true)
      console.error('Caught error:', error)
    }

    window.addEventListener('error', errorListener)
    return () => {
      window.removeEventListener('error', errorListener)
    }
  }, [])

  if (hasError) {
    return <h1>Something went wrong.</h1>
  }

  return children
}

export default ErrorBoundary
