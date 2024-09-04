import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <HelmetProvider>
      <App />
      </HelmetProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
