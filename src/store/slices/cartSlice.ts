import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: {
    size?: string
    color?: string
    [key: string]: any
  }
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
  shippingCost: number
  discount: number
  promoCode?: string
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
  shippingCost: 0,
  discount: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
      const existingItem = state.items.find(
        (item) => 
          item.productId === action.payload.productId &&
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        })
      }

      cartSlice.caseReducers.calculateTotals(state)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id)
        }
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      state.discount = 0
      state.promoCode = undefined
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    applyPromoCode: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.promoCode = action.payload.code
      state.discount = action.payload.discount
      cartSlice.caseReducers.calculateTotals(state)
    },
    removePromoCode: (state) => {
      state.promoCode = undefined
      state.discount = 0
      cartSlice.caseReducers.calculateTotals(state)
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      state.total = Math.max(0, subtotal + state.shippingCost - state.discount)
    },
  },
})

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  applyPromoCode,
  removePromoCode,
  calculateTotals,
} = cartSlice.actions