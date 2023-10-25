import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './components/Context/Context.tsx'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ContextProvider>
      <App />
    </ContextProvider>
)
