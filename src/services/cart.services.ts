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

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
  variant?: {
    size?: string
    color?: string
    [key: string]: any
  }
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: string
  updatedAt: string
}

export async function getCart(): Promise<Cart> {
  try {
    const response = await api.get('/cart')

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to fetch cart')
    }
  } catch (error: any) {
    console.error('Failed to fetch cart:', error)
    handleApiError(error)
  }
}

export async function addToCart(item: {
  productId: string
  quantity: number
  variant?: Record<string, any>
}): Promise<Cart> {
  try {
    const response = await api.post('/cart/items', item)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to add item to cart')
    }
  } catch (error: any) {
    console.error('Failed to add to cart:', error)
    handleApiError(error)
  }
}

export async function updateCartItem(sku: string, quantity: number): Promise<Cart> {
  try {
    const response = await api.put(`/cart/items/${sku}`, { quantity })

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to update cart item')
    }
  } catch (error: any) {
    console.error('Failed to update cart item:', error)
    handleApiError(error)
  }
}

export async function removeFromCart(sku: string): Promise<Cart> {
  try {
    const response = await api.delete(`/cart/items/${sku}`)

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to remove item from cart')
    }
  } catch (error: any) {
    console.error('Failed to remove from cart:', error)
    handleApiError(error)
  }
}

export async function clearCart(): Promise<Cart> {
  try {
    const response = await api.delete('/cart')

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to clear cart')
    }
  } catch (error: any) {
    console.error('Failed to clear cart:', error)
    handleApiError(error)
  }
}
