import { featureRegistry } from '@/features/registary'
import { useParams } from '@tanstack/react-router'
import NotFoundPage from './NotFoundPage'

const EditPage = () => {
  const { feature } = useParams({ strict: false })
  const registary = featureRegistry[feature]
  if (!registary) return <NotFoundPage />
  return <div>EditPage</div>
}

export { EditPage }
