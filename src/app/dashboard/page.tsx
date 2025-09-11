"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  CreditCard, 
  Settings,
  Package,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Bell
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/Header"
import { useAppSelector } from "@/hooks/redux"
import { formatPrice, formatDate } from "@/lib/utils"

const mockUserStats = {
  totalOrders: 12,
  totalSpent: 2456.78,
  wishlistItems: 8,
  loyaltyPoints: 1250,
  memberSince: "2023-06-15",
  nextReward: "Free Shipping",
}

const mockRecentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
    items: [
      { name: "AI-Powered Wireless Headphones", quantity: 1, image: "/api/placeholder/60/60" }
    ],
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "ORD-002",
    date: "2024-01-10", 
    total: 149.98,
    status: "shipped",
    items: [
      { name: "Smart Fitness Tracker", quantity: 1, image: "/api/placeholder/60/60" },
      { name: "Eco Water Bottle", quantity: 1, image: "/api/placeholder/60/60" }
    ],
    trackingNumber: "1Z999AA1234567891",
  },
]

const mockRecommendations = [
  {
    id: "1",
    name: "Wireless Charging Pad",
    price: 49.99,
    originalPrice: 69.99,
    image: "/api/placeholder/120/120",
    rating: 4.7,
    aiReason: "Complements your recent headphones purchase",
  },
  {
    id: "2",
    name: "Premium Phone Case",
    price: 29.99,
    image: "/api/placeholder/120/120", 
    rating: 4.5,
    aiReason: "Popular with customers like you",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    image: "/api/placeholder/120/120",
    rating: 4.8,
    aiReason: "Based on your audio preferences",
  },
]

export default function UserDashboard() {
  const { user } = useAppSelector((state) => state.auth)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "processing": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getLoyaltyProgress = () => {
    const nextTierPoints = 1500
    const progress = (mockUserStats.loyaltyPoints / nextTierPoints) * 100
    return Math.min(progress, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || "User"}!</h1>
              <p className="text-muted-foreground">
                Member since {formatDate(mockUserStats.memberSince)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime purchases
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(mockUserStats.totalSpent)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">Saved $234.56</span> with deals
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserStats.wishlistItems}</div>
              <p className="text-xs text-muted-foreground">
                3 items on sale now
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserStats.loyaltyPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                250 points to {mockUserStats.nextReward}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest purchases</CardDescription>
                  </div>
                  <Link href="/dashboard/orders">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(order.total)}</p>
                          <Badge variant="secondary" className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                              <span className="text-sm">📷</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium truncate max-w-32">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Personalized picks just for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {mockRecommendations.map((product) => (
                      <div key={product.id} className="group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-3xl">📱</span>
                        </div>
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-purple-600 mb-2">✨ {product.aiReason}</p>
                        <Button size="sm" className="w-full">Add to Cart</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loyalty Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Loyalty Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Points</span>
                        <span className="font-medium">{mockUserStats.loyaltyPoints}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${getLoyaltyProgress()}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        250 points to unlock {mockUserStats.nextReward}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Available Rewards</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>$5 Off Coupon</span>
                          <Button size="sm" variant="outline" disabled>500 pts</Button>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Free Shipping</span>
                          <Button size="sm" variant="outline" disabled>750 pts</Button>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>$20 Off Coupon</span>
                          <Button size="sm" variant="outline">1000 pts</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/orders">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Track Orders
                    </Button>
                  </Link>
                  <Link href="/dashboard/wishlist">
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      View Wishlist
                    </Button>
                  </Link>
                  <Link href="/dashboard/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard/addresses">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Manage Addresses
                    </Button>
                  </Link>
                  <Link href="/dashboard/notifications">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}