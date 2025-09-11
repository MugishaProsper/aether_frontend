"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/Header"
import { formatPrice } from "@/lib/utils"

const mockStats = {
  totalRevenue: 45678.90,
  totalOrders: 234,
  totalProducts: 45,
  avgOrderValue: 195.25,
  revenueGrowth: 12.5,
  orderGrowth: 8.3,
}

const mockProducts = [
  {
    id: "1",
    name: "AI-Powered Wireless Headphones",
    price: 299.99,
    stock: 50,
    sold: 125,
    status: "active",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    price: 199.99,
    stock: 25,
    sold: 89,
    status: "active",
    image: "/api/placeholder/80/80",
    rating: 4.6,
    reviews: 189,
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    price: 49.99,
    stock: 5,
    sold: 156,
    status: "low_stock",
    image: "/api/placeholder/80/80",
    rating: 4.4,
    reviews: 156,
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    price: 899.99,
    stock: 0,
    sold: 78,
    status: "out_of_stock",
    image: "/api/placeholder/80/80",
    rating: 4.9,
    reviews: 78,
  },
]

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    total: 299.99,
    status: "delivered",
    date: "2024-01-15",
    items: 1,
  },
  {
    id: "ORD-002", 
    customer: "Jane Smith",
    total: 149.98,
    status: "shipped",
    date: "2024-01-14",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    total: 899.99,
    status: "processing",
    date: "2024-01-14",
    items: 1,
  },
]

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "low_stock": return "bg-yellow-100 text-yellow-800"
      case "out_of_stock": return "bg-red-100 text-red-800"
      case "delivered": return "bg-green-100 text-green-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "processing": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-3 w-3" />
      case "shipped": return <Package className="h-3 w-3" />
      case "processing": return <Clock className="h-3 w-3" />
      case "low_stock": return <AlertTriangle className="h-3 w-3" />
      case "out_of_stock": return <AlertTriangle className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Merchant Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage your products and track sales with AI-powered insights
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "products", label: "Products" },
            { id: "orders", label: "Orders" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="rounded-md"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(mockStats.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{mockStats.revenueGrowth}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{mockStats.orderGrowth}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    3 products need attention
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(mockStats.avgOrderValue)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5.2%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(order.total)}</p>
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <span className="text-sm">📷</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-muted-foreground">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(product.price)}</p>
                          <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Products</h2>
              <Button className="gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium">Product</th>
                        <th className="text-left p-4 font-medium">Price</th>
                        <th className="text-left p-4 font-medium">Stock</th>
                        <th className="text-left p-4 font-medium">Sold</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                <span className="text-lg">📷</span>
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-sm text-muted-foreground">
                                    {product.rating} ({product.reviews})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                          <td className="p-4">
                            <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">{product.sold}</td>
                          <td className="p-4">
                            <Badge variant="secondary" className={getStatusColor(product.status)}>
                              {getStatusIcon(product.status)}
                              <span className="ml-1">{product.status.replace("_", " ")}</span>
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Orders</h2>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium">Order ID</th>
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Items</th>
                        <th className="text-left p-4 font-medium">Total</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4 text-muted-foreground">{order.date}</td>
                          <td className="p-4">{order.items}</td>
                          <td className="p-4 font-medium">{formatPrice(order.total)}</td>
                          <td className="p-4">
                            <Badge variant="secondary" className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">AI-Powered Analytics</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Forecast</CardTitle>
                  <CardDescription>AI prediction for next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                      <p className="text-lg font-semibold mb-2">Projected Revenue</p>
                      <p className="text-2xl font-bold text-green-600">+23% Growth</p>
                      <p className="text-sm text-muted-foreground">Based on current trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Insights</CardTitle>
                  <CardDescription>AI analysis of customer behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Peak Shopping Hours</span>
                      <span className="font-semibold">2PM - 6PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Top Customer Segment</span>
                      <span className="font-semibold">Tech Enthusiasts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg. Session Duration</span>
                      <span className="font-semibold">8m 34s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cart Abandonment Rate</span>
                      <span className="font-semibold text-yellow-600">23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}