import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <GoogleOAuthProvider clientId="">
    <App />                        
    </GoogleOAuthProvider>
    <Toaster closeButton/>
  </SocketProvider>
)
