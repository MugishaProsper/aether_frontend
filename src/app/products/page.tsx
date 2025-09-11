"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Filter, Grid3X3, List, SortAsc, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/Header"
import { useAppSelector, useAppDispatch } from "@/hooks/redux"
import { setProducts, setSearchQuery, setFilters } from "@/store/slices/productSlice"
import { addItem } from "@/store/slices/cartSlice"
import { formatPrice } from "@/lib/utils"

// Mock product data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "AI-Powered Wireless Headphones",
    description: "Experience premium sound quality with AI-enhanced noise cancellation",
    price: 299.99,
    originalPrice: 399.99,
    images: ["/api/placeholder/400/400"],
    category: "Electronics",
    brand: "TechFlow",
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    stockCount: 50,
    tags: ["AI", "Wireless", "Premium"],
    aiRecommendationScore: 0.95,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2", 
    name: "Smart Fitness Tracker",
    description: "Track your health with AI insights and personalized recommendations",
    price: 199.99,
    images: ["/api/placeholder/400/400"],
    category: "Health",
    brand: "FitTech",
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stockCount: 25,
    tags: ["Fitness", "Health", "Smart"],
    aiRecommendationScore: 0.87,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description: "Stay hydrated with this sustainable, temperature-maintaining bottle",
    price: 49.99,
    images: ["/api/placeholder/400/400"],
    category: "Lifestyle",
    brand: "EcoLife",
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    stockCount: 100,
    tags: ["Eco-Friendly", "Sustainable"],
    aiRecommendationScore: 0.72,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    description: "Capture stunning photos with this high-quality telephoto lens",
    price: 899.99,
    originalPrice: 1199.99,
    images: ["/api/placeholder/400/400"],
    category: "Photography",
    brand: "LensMax",
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    stockCount: 15,
    tags: ["Photography", "Professional", "Telephoto"],
    aiRecommendationScore: 0.91,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  }
]

const categories = ["All", "Electronics", "Health", "Lifestyle", "Photography"]

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { products, searchQuery, filters, sortBy } = useAppSelector((state) => state.products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    // Simulate loading products from API
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    dispatch(addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    }))
  }

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false
    }
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Products</h1>
          <p className="text-muted-foreground text-lg">
            Explore our AI-curated collection of premium products
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by Popularity
            </Button>

            {/* Filter */}
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <span className="text-4xl">📷</span>
                    </div>
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        Sale
                      </Badge>
                    )}
                    {product.aiRecommendationScore && product.aiRecommendationScore > 0.9 && (
                      <Badge className="absolute top-2 right-2 bg-purple-500">
                        AI Pick
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product as typeof mockProducts[0])}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product as typeof mockProducts[0])}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}