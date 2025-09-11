"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/Header"
import Link from "next/link"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Get personalized product suggestions powered by advanced machine learning algorithms.",
    color: "text-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Merchant dashboards with AI-driven sales forecasts and performance insights.",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description: "Seamless experience for visitors, customers, merchants, and administrators.",
    color: "text-green-500"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live inventory tracking, order updates, and instant notifications.",
    color: "text-orange-500"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              🚀 Next Generation E-Commerce Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6">
              AI Commerce
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of online shopping with AI-powered personalization, 
              intelligent recommendations, and seamless multi-role management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="gradient-primary text-white border-0 px-8 py-3">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <feature.icon className={`h-8 w-8 ${feature.color} mb-3`} />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Role-based Access Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <Card className="glass-morphism border-0 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  Customer Portal
                </CardTitle>
                <CardDescription>
                  Personalized shopping with AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/products">
                  <Button className="w-full">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-0 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Merchant Dashboard
                </CardTitle>
                <CardDescription>
                  Manage products and analyze sales with AI insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/merchant">
                  <Button variant="outline" className="w-full">Merchant Portal</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-0 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Admin Control
                </CardTitle>
                <CardDescription>
                  System monitoring and global management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin">
                  <Button variant="outline" className="w-full">Admin Panel</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
      </section>
    </div>
  )
}