import { useEffect, useRef, useMemo } from 'react'

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const callbackRef = useRef(callback)

  // Sync the latest callback function without triggering re-renders
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Memorize the debounced execution function so it persists across renders
  return useMemo(() => {
    let timerId: number

    const debouncedFn = (...args: any[]) => {
      if (timerId) clearTimeout(timerId)

      timerId = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    }

    // Provide a cancel method just like Lodash does
    debouncedFn.cancel = () => {
      if (timerId) clearTimeout(timerId)
    }

    return debouncedFn
  }, [delay])
}
