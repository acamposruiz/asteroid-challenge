import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { WrapperProvider } from './providers/wrapper-provider.tsx'
import { Router } from './router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrapperProvider>
      <Router />
    </WrapperProvider>
  </React.StrictMode>
)
