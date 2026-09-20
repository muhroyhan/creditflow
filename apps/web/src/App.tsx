import { useQuery } from '@tanstack/react-query'
import { getApiLiveStatus, getApiReadyStatus } from './api/queries'

const App = () => {
  const {
    data: liveData,
    isPending: isPendingLive,
    isError: isErrorLive,
  } = useQuery(getApiLiveStatus())
  const {
    data: readyData,
    isPending: isPendingReady,
    isError: isErrorReady,
  } = useQuery(getApiReadyStatus())

  if (isPendingLive && isPendingReady) return <p>Checking API…</p>
  const texts = []
  if (isErrorLive) texts.push('API Unavailable')
  else texts.push(`API status: ${liveData?.message}`)
  if (isErrorReady) texts.push('DB Unavailable')
  else texts.push(`DB status: ${readyData?.message}`)

  return <p>{texts.map((item) => item + '\n')}</p>
}

export { App }
