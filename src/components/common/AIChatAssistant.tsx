"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Bot,
  ShoppingBag,
  Search,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAppSelector, useAppDispatch } from "@/hooks/redux"
import { setAIChatOpen } from "@/store/slices/uiSlice"
import { addItem } from "@/store/slices/cartSlice"

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: number
  suggestions?: string[]
  products?: Array<{
    id: string
    name: string
    price: number
    image: string
  }>
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    content: "👋 Hi! I'm your AI shopping assistant. I can help you find products, answer questions, and provide personalized recommendations. How can I help you today?",
    role: "assistant",
    timestamp: Date.now(),
    suggestions: [
      "Show me trending products",
      "Find wireless headphones under $200",
      "What's good for fitness tracking?",
      "Help me find a gift"
    ]
  }
]

export default function AIChatAssistant() {
  const dispatch = useAppDispatch()
  const { aiChatOpen } = useAppSelector((state) => state.ui)
  const { user } = useAppSelector((state) => state.auth)
  
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("headphones") || lowerMessage.includes("audio")) {
      return {
        id: (Date.now() + 1).toString(),
        content: "🎧 I found some great wireless headphones for you! Based on your preferences, here are my top AI-powered recommendations:",
        role: "assistant",
        timestamp: Date.now(),
        products: [
          {
            id: "1",
            name: "AI-Powered Wireless Headphones",
            price: 299.99,
            image: "/api/placeholder/100/100"
          },
          {
            id: "5",
            name: "Premium Noise-Canceling Headphones",
            price: 199.99,
            image: "/api/placeholder/100/100"
          }
        ],
        suggestions: [
          "Compare these headphones",
          "Show me budget options",
          "What about gaming headphones?"
        ]
      }
    }

    if (lowerMessage.includes("fitness") || lowerMessage.includes("health")) {
      return {
        id: (Date.now() + 1).toString(),
        content: "💪 Perfect! I can help you find fitness products. Here are some AI-recommended items based on current trends:",
        role: "assistant",
        timestamp: Date.now(),
        products: [
          {
            id: "2",
            name: "Smart Fitness Tracker",
            price: 199.99,
            image: "/api/placeholder/100/100"
          }
        ],
        suggestions: [
          "Show me workout equipment",
          "Find healthy lifestyle products",
          "What about yoga accessories?"
        ]
      }
    }

    if (lowerMessage.includes("trending") || lowerMessage.includes("popular")) {
      return {
        id: (Date.now() + 1).toString(),
        content: "🔥 Here are the trending products right now, powered by our AI analytics:",
        role: "assistant",
        timestamp: Date.now(),
        products: [
          {
            id: "1",
            name: "AI-Powered Wireless Headphones",
            price: 299.99,
            image: "/api/placeholder/100/100"
          },
          {
            id: "4",
            name: "Professional Camera Lens",
            price: 899.99,
            image: "/api/placeholder/100/100"
          }
        ],
        suggestions: [
          "Show me deals",
          "What's trending in electronics?",
          "Find gift ideas"
        ]
      }
    }

    return {
      id: (Date.now() + 1).toString(),
      content: `I understand you're looking for "${userMessage}". Let me search our catalog and find the best matches for you! 🔍`,
      role: "assistant",
      timestamp: Date.now(),
      suggestions: [
        "Show me similar products",
        "Find alternatives",
        "What's on sale?",
        "Help me compare options"
      ]
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleAddToCart = (product: any) => {
    dispatch(addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }))
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!aiChatOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            size="lg"
            className="h-14 w-14 rounded-full gradient-primary shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => dispatch(setAIChatOpen(true))}
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] bg-background rounded-lg shadow-2xl border"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aether Assistant</h3>
                    <p className="text-xs opacity-80">
                      {user ? `Hi ${user.name}!` : "Here to help you shop"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(setAIChatOpen(false))}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : ""}`}>
                      <div
                        className={`rounded-lg p-3 text-sm ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>

                      {/* Products */}
                      {message.products && (
                        <div className="mt-2 space-y-2">
                          {message.products.map((product) => (
                            <Card key={product.id} className="p-2">
                              <CardContent className="p-0">
                                <div className="flex items-center gap-2">
                                  <div className="h-12 w-12 rounded bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                                    <img src="https://unsplash.com/sample" alt="" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-xs truncate">
                                      {product.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      ${product.price}
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-7 px-2"
                                      onClick={() => handleAddToCart(product)}
                                    >
                                      <ShoppingBag className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse animation-delay-200"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}