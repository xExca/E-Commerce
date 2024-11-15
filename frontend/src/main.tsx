import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoute } from './utils/router.tsx'
import { ContextProvider } from './utils/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <AppRoute />
    </ContextProvider>
  </StrictMode>,
)
