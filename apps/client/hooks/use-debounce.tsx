import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Create a timer that will execute the callback after the specified delay
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(value) // Update the debounced text with the latest input
    }, delay)

    // Cleanup function: Clear the timer if the component unmounts or the input changes
    return () => {
      clearTimeout(debounceTimer)
    }
  }, [value, delay])

  return debouncedValue // Return the debounced text
}

export default useDebounce
