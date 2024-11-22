import { createContext, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// nuqs
import { NuqsAdapter } from 'nuqs/adapters/react'

// material-ui datepicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

// google-fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

// Create a new router instance
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!
  },
})

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  }
});

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
let rootElement: HTMLElement | null = null;

if(typeof document !== 'undefined') {
  rootElement = document.getElementById('root');
}

if(rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
       <NuqsAdapter>
       <App />
       </NuqsAdapter>
       </LocalizationProvider>
    </StrictMode>,
  )
}
