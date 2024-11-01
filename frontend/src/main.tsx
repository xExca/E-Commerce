import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoute } from './utils/router.tsx'
import { AuthProvider } from './utils/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  </StrictMode>,
)
