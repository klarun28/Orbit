import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap 5 styles, interactive JS bundle, and icon font
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// App theme and layout styles (loaded after Bootstrap so they can override it)
import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/responsive.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
