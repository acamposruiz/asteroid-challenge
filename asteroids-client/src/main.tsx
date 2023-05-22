import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { WrapperProvider } from './providers/wrapper-provider.tsx'
import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WrapperProvider>
    <App />
  </WrapperProvider>
)
