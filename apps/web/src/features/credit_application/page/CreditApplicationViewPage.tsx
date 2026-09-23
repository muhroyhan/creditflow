import { creditApplicationQueries } from '../api/credit_application.queries'
import { useQuery } from '@tanstack/react-query'

const CreditApplicationViewPage = ({ id }: { id: string }) => {
  const { data: item } = useQuery(creditApplicationQueries.detail(id))
  return (
    <>
      {item && (
        <div>
          {Object.entries(item).map((value, key) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export { CreditApplicationViewPage }
