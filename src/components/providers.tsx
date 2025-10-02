"use client"

import { ReactNode, useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { AppDispatch, store } from "@/store"
import { setLoading, setUser } from "@/store/slices/authSlice"
import { getCurrentUser } from "@/services/auth.services"

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
    const initializeAuth = async () => {
      try {
        dispatch(setLoading(true));
        const token = localStorage.getItem('token');
        
        if (token) {
          const user = await getCurrentUser();
          if (user) {
            dispatch(setUser(user));
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
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