import { featureRegistry } from '@/features/registary'
import { useParams } from '@tanstack/react-router'
import NotFoundPage from './NotFoundPage'

const ViewPage = () => {
  const { feature, id } = useParams({ strict: false })
  const registary = featureRegistry[feature]
  if (!registary) return <NotFoundPage />
  const { View } = registary.compnents

  return (
    <section>
      <h1>{registary?.name}</h1>
      {View && <View id={id} />}
    </section>
  )
}

export { ViewPage }
