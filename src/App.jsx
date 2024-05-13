import React, { useState, useEffect } from 'react'
import Another from './components/Another'
import FormFormik from './components/FormFormik'
import ReactQuery from './components/ReactQuery'

const App = () => {
  const [showAnother, setShowAnother] = useState(false)

  useEffect(() => {
    // After 1000 milliseconds (1 second), set showAnother to true
    const timeoutId = setTimeout(() => {
      setShowAnother(true)
    }, 500)

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId)
  }, []) // Run this effect only once, on component mount

  return (
    <>
      {/* <FormFormik /> */}
      <ReactQuery />
      {showAnother && <Another />}
      {/* Render Another component if showAnother is true */}
    </>
  )
}

export default App
