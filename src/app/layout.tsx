import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import ShoppingCart from "@/components/common/ShoppingCart"
import AIChatAssistant from "@/components/common/AIChatAssistant"
import PWAProvider from "@/components/common/PWAProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Commerce - Next-Gen E-Commerce Platform",
  description: "AI-powered e-commerce platform with personalized shopping experiences, smart recommendations, and intelligent merchant tools.",
  keywords: ["ecommerce", "AI", "shopping", "online store", "artificial intelligence"],
  authors: [{ name: "AI Commerce Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#667eea",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <ShoppingCart />
          <AIChatAssistant />
          <PWAProvider />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}