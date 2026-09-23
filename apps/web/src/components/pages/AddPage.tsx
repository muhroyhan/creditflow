import { featureRegistry } from '@/features/registary'
import { useParams } from '@tanstack/react-router'

const AddPage = () => {
  const { feature } = useParams({ strict: false })
  const registary = featureRegistry[feature]
  const { Add } = registary.compnents

  return (
    <section>
      <h1>{registary?.name}</h1>
      {Add && <Add />}
    </section>
  )
}

export { AddPage }
