import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // Tangani error global untuk query (GET)
      console.error('Global Query Error:', error.message)
      // Contoh: tampilkan toast notification di sini
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error('Global Mutation Error:', error.message)
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1, // Batasi percobaan ulang otomatis
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
