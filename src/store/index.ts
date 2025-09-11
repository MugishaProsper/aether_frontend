import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./slices/authSlice"
import { cartSlice } from "./slices/cartSlice"
import { productSlice } from "./slices/productSlice"
import { uiSlice } from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch