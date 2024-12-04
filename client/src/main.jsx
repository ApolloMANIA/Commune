import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="338399151804-5tqsco2e0mskjbn67s2n99o2c4lccvgo.apps.googleusercontent.com">
    <SocketProvider>
      <App />
      <Toaster closeButton />
    </SocketProvider>
  </GoogleOAuthProvider>
)
