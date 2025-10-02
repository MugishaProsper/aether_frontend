"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Bell,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/hooks/redux"
import { toggleCart } from "@/store/slices/cartSlice"
import { setMobileMenuOpen, toggleSearch, toggleAIChat } from "@/store/slices/uiSlice"
import { logoutUser } from "@/store/slices/authSlice"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" }
]

export default function Header() {
  const dispatch = useAppDispatch()
  const { itemCount } = useAppSelector((state) => state.cart)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { mobileMenuOpen, searchOpen, notifications } = useAppSelector((state) => state.ui)
  const [searchQuery, setSearchQuery] = useState("")

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Aether
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products with AI..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => dispatch(toggleSearch())}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* AI Chat Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleAIChat())}
            className="relative"
          >
            <Sparkles className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </Button>

          {/* Notifications */}
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          )}

          {/* Wishlist */}
          {isAuthenticated && (
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleCart())}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}          
          {isAuthenticated ? (
            <Button variant="ghost" size="icon">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user?.fullname?.charAt(0).toUpperCase()}
                </span>
              </div>
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="icon" className="border">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(setMobileMenuOpen(!mobileMenuOpen))}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t bg-background px-4 py-3 lg:hidden"
        >
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products with AI..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </motion.div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t bg-background md:hidden"
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="outline" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}