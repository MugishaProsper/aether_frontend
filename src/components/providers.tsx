"use client"

import { ReactNode, useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { store } from "@/store"
import { initializeAuth } from "@/store/slices/authSlice"
import { AppDispatch } from "@/store"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

// Auth initializer component
function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth())
  }, [dispatch])

  return <>{children}</>
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthInitializer>
            {children}
          </AuthInitializer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}