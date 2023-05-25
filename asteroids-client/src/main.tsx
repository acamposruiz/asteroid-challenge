import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { WrapperProvider } from './providers'
import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrapperProvider>
      <App />
    </WrapperProvider>
  </React.StrictMode>
)
