import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flatpickr/dist/flatpickr.css';
import { AppRoute } from './utils/router.tsx'
import { ContextProvider } from './utils/ContextProvider.tsx'
import { StyledEngineProvider } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ContextProvider>
        <AppRoute />
      </ContextProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
