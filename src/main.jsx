import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Activar smooth scroll después de que las animaciones iniciales terminen
setTimeout(() => {
  document.documentElement.classList.add('loaded');
}, 1000); // 1 segundo después de la carga

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
