import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: number
  read: boolean
}

interface UIState {
  theme: "light" | "dark"
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  searchOpen: boolean
  notifications: Notification[]
  isOnline: boolean
  aiChatOpen: boolean
  loading: {
    global: boolean
    products: boolean
    auth: boolean
    cart: boolean
  }
  modals: {
    authModal: boolean
    productModal: boolean
    cartModal: boolean
  }
}

const initialState: UIState = {
  theme: "light",
  sidebarOpen: true,
  mobileMenuOpen: false,
  searchOpen: false,
  notifications: [],
  isOnline: true,
  aiChatOpen: false,
  loading: {
    global: false,
    products: false,
    auth: false,
    cart: false,
  },
  modals: {
    authModal: false,
    productModal: false,
    cartModal: false,
  },
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id" | "timestamp" | "read">>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      }
      state.notifications.unshift(notification)
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
    toggleAIChat: (state) => {
      state.aiChatOpen = !state.aiChatOpen
    },
    setAIChatOpen: (state, action: PayloadAction<boolean>) => {
      state.aiChatOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState["loading"]; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value
    },
    setModal: (state, action: PayloadAction<{ modal: keyof UIState["modals"]; open: boolean }>) => {
      state.modals[action.payload.modal] = action.payload.open
    },
  },
})

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSearch,
  setSearchOpen,
  addNotification,
  markNotificationRead,
  removeNotification,
  clearNotifications,
  setOnlineStatus,
  toggleAIChat,
  setAIChatOpen,
  setLoading,
  setModal,
} = uiSlice.actions