import { useEffect, useState } from 'react'

export const useTimer = (delay) => {
  const [countdown, setCountdown] = useState(delay)

  useEffect(() => {
    let timer = null
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [countdown])

  return countdown
}
