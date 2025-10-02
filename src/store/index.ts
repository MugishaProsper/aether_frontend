import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./slices/cartSlice"
import { productSlice } from "./slices/productSlice"
import { uiSlice } from "./slices/uiSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
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