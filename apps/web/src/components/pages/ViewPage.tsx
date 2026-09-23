import { featureRegistry } from '@/features/registary'
import { useParams } from '@tanstack/react-router'

const ViewPage = () => {
  const { feature, id } = useParams({ strict: false })
  const registary = featureRegistry[feature]
  const { View } = registary.compnents

  return (
    <section>
      <h1>{registary?.name}</h1>
      {View && <View id={id} />}
    </section>
  )
}

export { ViewPage }
