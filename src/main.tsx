import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'

// Import the route tree
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { helloRoute } from './routes/hello'

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, helloRoute])

// Create the router
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
