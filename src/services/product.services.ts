import api from "@/lib/api"

// Helper function to handle API errors
function handleApiError(error: any): never {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message)
  } else if (error.message) {
    throw new Error(error.message)
  } else {
    throw new Error('An unexpected error occurred')
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  sku: string
  createdAt: string
  updatedAt: string
  sellerId?: string
  sellerName?: string
}

export interface ProductFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  sortBy?: "name" | "price" | "rating" | "createdAt" | "popularity"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const response = await api.get(`/products?${params.toString()}`)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to fetch products')
    }
  } catch (error: any) {
    console.error('Failed to fetch products:', error)
    handleApiError(error)
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/products/featured')

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to fetch featured products')
    }
  } catch (error: any) {
    console.error('Failed to fetch featured products:', error)
    handleApiError(error)
  }
}

export async function searchProducts(query: string, filters?: Omit<ProductFilters, 'query'>): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams({ query })

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const response = await api.get(`/products/search?${params.toString()}`)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Search failed')
    }
  } catch (error: any) {
    console.error('Search failed:', error)
    handleApiError(error)
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await api.get(`/products/${id}`)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to fetch product')
    }
  } catch (error: any) {
    console.error('Failed to fetch product:', error)
    handleApiError(error)
  }
}

export async function createProduct(productData: Partial<Product>): Promise<Product> {
  try {
    const response = await api.post('/products', productData)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to create product')
    }
  } catch (error: any) {
    console.error('Failed to create product:', error)
    handleApiError(error)
  }
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  try {
    const response = await api.put(`/products/${id}`, productData)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to update product')
    }
  } catch (error: any) {
    console.error('Failed to update product:', error)
    handleApiError(error)
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await api.delete(`/products/${id}`)

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete product')
    }
  } catch (error: any) {
    console.error('Failed to delete product:', error)
    handleApiError(error)
  }
}

export async function uploadProductImages(productId: string, images: File[]): Promise<string[]> {
  try {
    const formData = new FormData()
    images.forEach(image => {
      formData.append('images', image)
    })

    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to upload images')
    }
  } catch (error: any) {
    console.error('Failed to upload images:', error)
    handleApiError(error)
  }
}
