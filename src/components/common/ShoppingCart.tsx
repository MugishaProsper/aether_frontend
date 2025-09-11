"use client"

import { Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Trash2, ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/hooks/redux"
import { 
  removeItem, 
  updateQuantity, 
  setCartOpen, 
  clearCart 
} from "@/store/slices/cartSlice"
import { formatPrice } from "@/lib/utils"

export default function ShoppingCart() {
  const dispatch = useAppDispatch()
  const { items, total, itemCount, isOpen } = useAppSelector((state) => state.cart)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }

  const handleCheckout = () => {
    // Navigate to checkout
    window.location.href = "/checkout"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => dispatch(setCartOpen(false))}
          />
          
          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  {itemCount > 0 && (
                    <Badge variant="secondary">{itemCount}</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-4">
                      <ShoppingCartIcon/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Add some products to get started
                    </p>
                    <Button onClick={() => dispatch(setCartOpen(false))}>
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        {/* Product Image */}
                        <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                          <span className="text-2xl">📷</span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)}
                          </p>
                          {item.variant && (
                            <div className="flex gap-2 mt-1">
                              {Object.entries(item.variant).map(([key, value]) => (
                                <Badge key={key} variant="outline" className="text-xs">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => dispatch(setCartOpen(false))}
                      >
                        Continue Shopping
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => dispatch(clearCart())}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      ✨ AI suggests these items go well together
                    </p>
                    <div className="flex gap-2 overflow-x-auto">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="flex-shrink-0 w-16 h-16 rounded-md bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                        >
                          <span className="text-sm">📱</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}