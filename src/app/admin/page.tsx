"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  Server, 
  Database, 
  Users, 
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Monitor,
  Shield,
  Zap,
  Settings,
  UserCheck,
  Ban,
  Eye,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/Header"
import { formatPrice } from "@/lib/utils"

const mockSystemStats = {
  totalUsers: 12547,
  totalMerchants: 342,
  totalOrders: 8934,
  totalRevenue: 2456789.50,
  systemUptime: "99.98%",
  activeUsers: 1247,
  serverLoad: 67,
  databaseSize: "2.4GB",
  cacheHitRate: 94.2,
}

const mockAlerts = [
  {
    id: "1",
    type: "warning",
    title: "High Server Load",
    message: "CPU usage is at 85% on server-2",
    timestamp: "2 minutes ago",
  },
  {
    id: "2", 
    type: "info",
    title: "New Merchant Registration",
    message: "TechGear Store has requested approval",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    type: "error",
    title: "Payment Gateway Error",
    message: "Stripe webhook failed for order #12345",
    timestamp: "10 minutes ago",
  },
]

const mockMerchants = [
  {
    id: "1",
    name: "TechFlow Electronics",
    email: "contact@techflow.com",
    status: "active",
    revenue: 45678.90,
    products: 23,
    orders: 156,
    joinDate: "2023-12-15",
  },
  {
    id: "2",
    name: "EcoLife Products",
    email: "hello@ecolife.com", 
    status: "pending",
    revenue: 0,
    products: 5,
    orders: 0,
    joinDate: "2024-01-10",
  },
  {
    id: "3",
    name: "Fashion Forward",
    email: "info@fashionforward.com",
    status: "suspended",
    revenue: 23456.78,
    products: 45,
    orders: 89,
    joinDate: "2023-11-20",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info": return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Super Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor system performance, manage merchants, and oversee platform operations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "merchants", label: "Merchants" },
            { id: "system", label: "System Health" },
            { id: "ai-config", label: "AI Configuration" },
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
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.3%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.totalMerchants}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.7%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(mockSystemStats.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.2%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.systemUptime}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Metrics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Recent system notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live System Status</CardTitle>
                  <CardDescription>Real-time system monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4" />
                        <span>Server Load</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-yellow-500 rounded-full" 
                            style={{ width: `${mockSystemStats.serverLoad}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{mockSystemStats.serverLoad}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>Database Size</span>
                      </div>
                      <span className="text-sm font-medium">{mockSystemStats.databaseSize}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Active Users</span>
                      </div>
                      <span className="text-sm font-medium">{mockSystemStats.activeUsers.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Cache Hit Rate</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">{mockSystemStats.cacheHitRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Merchants Tab */}
        {activeTab === "merchants" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Merchant Management</h2>
              <Button className="gradient-primary">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium">Merchant</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Revenue</th>
                        <th className="text-left p-4 font-medium">Products</th>
                        <th className="text-left p-4 font-medium">Orders</th>
                        <th className="text-left p-4 font-medium">Join Date</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMerchants.map((merchant) => (
                        <tr key={merchant.id} className="border-b">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{merchant.name}</p>
                              <p className="text-sm text-muted-foreground">{merchant.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className={getStatusColor(merchant.status)}>
                              {merchant.status}
                            </Badge>
                          </td>
                          <td className="p-4 font-medium">{formatPrice(merchant.revenue)}</td>
                          <td className="p-4">{merchant.products}</td>
                          <td className="p-4">{merchant.orders}</td>
                          <td className="p-4 text-muted-foreground">{merchant.joinDate}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {merchant.status === "pending" && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              )}
                              {merchant.status === "active" && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                  <Ban className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Settings className="h-4 w-4" />
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

        {/* System Health Tab */}
        {activeTab === "system" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">System Health Monitoring</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Performance</CardTitle>
                  <CardDescription>Real-time server metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Monitor className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-semibold mb-2">All Systems Operational</p>
                      <p className="text-2xl font-bold text-green-600">99.98% Uptime</p>
                      <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <CardDescription>Platform security monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>SSL Certificate</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Valid
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Firewall Status</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-yellow-500" />
                        <span>DDoS Protection</span>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Monitoring
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Data Encryption</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        AES-256
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* AI Configuration Tab */}
        {activeTab === "ai-config" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">AI System Configuration</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Engine</CardTitle>
                  <CardDescription>Configure AI recommendation parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Recommendation Aggressiveness</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-3/4 h-full bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Personalization Level</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-4/5 h-full bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm">80%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Learning Rate</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Optimal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fraud Detection</CardTitle>
                  <CardDescription>AI-powered fraud prevention settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Fraud Sensitivity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-3/5 h-full bg-red-500 rounded-full" />
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk Threshold</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Medium
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Auto-Block Enabled</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Yes
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
                <CardDescription>Current AI system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">94.2%</div>
                    <p className="text-sm text-muted-foreground">Recommendation Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2.3ms</div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">99.1%</div>
                    <p className="text-sm text-muted-foreground">Fraud Detection Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}