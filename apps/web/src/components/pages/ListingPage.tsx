import { featureRegistry } from '@/features/registary'
import NotFoundPage from './NotFoundPage'
import { useParams } from '@tanstack/react-router'

const ListingPage = () => {
  const { feature } = useParams({ strict: false })
  const registary = featureRegistry[feature]
  if (!registary) return <NotFoundPage />
  return <div>Listing</div>
}

export { ListingPage }
