import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flatpickr/dist/flatpickr.css';
import { AppRoute } from './utils/router.tsx'
import { ContextProvider } from './utils/ContextProvider.tsx'
import { StyledEngineProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <AppRoute />
          <ReactQueryDevtools initialIsOpen={false} />
        </ContextProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
