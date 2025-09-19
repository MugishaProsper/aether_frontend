export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  sortBy?: "name" | "price" | "rating" | "newest" | "popularity"
  sortOrder?: "asc" | "desc"
}

export interface AIRecommendation {
  productId: string
  score: number
  reason: string
  type: "similar" | "complementary" | "trending" | "personalized"
}

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: number
  metadata?: {
    productIds?: string[]
    intent?: "search" | "recommendation" | "support" | "general"
  }
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: Address
  billingAddress: Address
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  variant?: Record<string, any>
  image: string
}

export interface Address {
  id?: string
  firstName: string
  lastName: string
  company?: string
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Wishlist {
  id: string
  userId: string
  items: WishlistItem[]
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  productId: string
  addedAt: string
}

export interface RegisteringUser {
  fullname: string
  email: string
  phone: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "visitor" | "buyer" | "seller" | "admin" | "super_admin"
  avatar?: string
  phone?: string
  preferences?: {
    theme: "light" | "dark"
    notifications: boolean
    language: string
  }
  createdAt?: string
  updatedAt?: string
}