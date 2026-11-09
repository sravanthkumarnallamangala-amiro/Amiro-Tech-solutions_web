import { useEffect, useEffectEvent, useState } from 'react'

export function useLoad<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState('')
  const [tick, setTick] = useState(0)
  const run = useEffectEvent(fetcher)
  useEffect(() => {
    let live = true
    run().then(
      (value) => {
        if (live) {
          setData(value)
          setError('')
        }
      },
      (reason: Error) => {
        if (live) setError(reason.message)
      },
    )
    return () => {
      live = false
    }
  }, [tick])
  return { data, error, reload: () => setTick((value) => value + 1), loading: data === undefined && !error }
}
