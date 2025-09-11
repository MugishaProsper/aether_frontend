import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  brand?: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  variants?: {
    size?: string[]
    color?: string[]
    [key: string]: any
  }
  aiRecommendationScore?: number
  createdAt: string
  updatedAt: string
}

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  recommendations: Product[]
  categories: string[]
  currentProduct: Product | null
  searchQuery: string
  filters: {
    category?: string
    priceRange?: [number, number]
    brand?: string
    rating?: number
    inStock?: boolean
  }
  sortBy: "name" | "price" | "rating" | "newest" | "popularity"
  isLoading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  recommendations: [],
  categories: [],
  currentProduct: null,
  searchQuery: "",
  filters: {},
  sortBy: "popularity",
  isLoading: false,
  error: null,
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.isLoading = false
      state.error = null
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload
    },
    setRecommendations: (state, action: PayloadAction<Product[]>) => {
      state.recommendations = action.payload
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
    },
    setSortBy: (state, action: PayloadAction<ProductState["sortBy"]>) => {
      state.sortBy = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload)
    },
  },
})

export const {
  setProducts,
  setFeaturedProducts,
  setRecommendations,
  setCategories,
  setCurrentProduct,
  setSearchQuery,
  setFilters,
  clearFilters,
  setSortBy,
  setLoading,
  setError,
  updateProduct,
  addProduct,
  removeProduct,
} = productSlice.actions