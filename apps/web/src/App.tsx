import { useQuery } from '@tanstack/react-query'
import { getApiLiveStatus } from './api/queries'

const App = () => {
  const { data } = useQuery(getApiLiveStatus())
  return <>{data}</>
}

export { App }
