import { createContext, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuth } from './context/auth-context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import "./i18n/config";
import './index.css';

/* Battambang font family */
import "@fontsource/battambang/300.css";
import "@fontsource/battambang/400.css";
import "@fontsource/battambang/700.css";
import "@fontsource/battambang/900.css";

// Create a new router instance
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!
  },
})

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create a new context language
const DefaultParamsContext = createContext({ lang: "en" });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultParamsContext.Provider value={{ lang: "en" }}>
        <RouterProvider router={router} context={{ auth }} />
      </DefaultParamsContext.Provider>
    </QueryClientProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

// Render the app
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
        <App />
    </StrictMode>,
  )
}