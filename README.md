# 🚀 Aether - Next-Gen E-Commerce Platform

A cutting-edge, AI-powered e-commerce platform built with Next.js 14, featuring intelligent recommendations, real-time interactions, and seamless multi-role management.

![AI Commerce](https://img.shields.io/badge/AI%20Commerce-Next--Gen%20E--Commerce-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 **Multi-Role Support**
- **Visitors**: Browse products, use AI chat, guest checkout
- **Registered Users**: Personalized dashboard, order history, wishlist, faster checkout
- **Merchants**: Product management, sales analytics, AI-powered insights
- **Super Admins**: System monitoring, merchant management, AI configuration

### 🤖 **AI-Powered Experience**
- **Smart Recommendations**: Personalized product suggestions based on behavior
- **AI Chat Assistant**: Interactive shopping help with product guidance
- **Intelligent Search**: Auto-complete, typo tolerance, voice search ready
- **Fraud Detection**: Real-time AI-powered security monitoring
- **Sales Forecasting**: Predictive analytics for merchants

### 📱 **Progressive Web App (PWA)**
- **Offline Support**: Browse cached products and manage cart offline
- **Push Notifications**: Order updates and promotional alerts
- **App-like Experience**: Install on mobile/desktop devices
- **Background Sync**: Automatic data synchronization when back online

### 🎨 **Modern UI/UX**
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Theme**: Automatic theme switching support
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Glass Morphism**: Modern design with backdrop blur effects
- **Gradient Accents**: Beautiful purple-blue gradient theme

### 🛒 **Shopping Experience**
- **Smart Cart**: Persistent cart with variant support
- **Quick Checkout**: Streamlined purchase flow
- **Multiple Payment Methods**: Support for various payment options
- **Real-time Updates**: Live inventory and order status updates

## 🏗️ **Tech Stack**

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features with concurrent rendering

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation and gesture library
- **Lucide React** - Beautiful icon library

### **State Management**
- **Redux Toolkit** - Predictable state container
- **React Query** - Server state management
- **Zustand** - Lightweight state management (alternative)

### **Real-time & PWA**
- **Socket.IO** - Real-time bidirectional communication
- **Service Workers** - Offline functionality and caching
- **Web Push API** - Push notifications support

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **TypeScript** - Static type checking

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-commerce-frontend.git
   cd ai-commerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Super admin dashboard
│   ├── checkout/          # Checkout flow
│   ├── dashboard/         # User dashboard
│   ├── merchant/          # Merchant dashboard
│   ├── products/          # Product catalog
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── common/            # Shared components
│   ├── layout/            # Layout components
│   └── ui/                # UI primitives
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── store/                 # Redux store and slices
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions

public/
├── icons/                 # PWA icons
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
└── offline.html           # Offline fallback page
```

## 🎭 **User Roles & Demo Accounts**

### 🛍️ **Customer Account**
- **Email**: `user@demo.com`
- **Password**: `demo123`
- **Features**: Product browsing, cart management, order tracking, wishlist

### 🏪 **Merchant Account**
- **Email**: `merchant@demo.com`
- **Password**: `demo123`
- **Features**: Product management, sales analytics, order fulfillment

### 👑 **Admin Account**
- **Email**: `admin@demo.com`
- **Password**: `demo123`
- **Features**: System monitoring, merchant management, AI configuration

## 🔧 **Key Components**

### **AI Chat Assistant**
```typescript
// Interactive AI shopping assistant
<AIChatAssistant />
```

### **Smart Product Recommendations**
```typescript
// AI-powered product suggestions
<ProductRecommendations userId={user.id} />
```

### **Shopping Cart**
```typescript
// Persistent shopping cart with offline support
<ShoppingCart />
```

### **PWA Features**
```typescript
// Progressive web app functionality
<PWAProvider />
```

## 📊 **State Management**

### **Redux Slices**
- `authSlice` - User authentication and profile
- `cartSlice` - Shopping cart management
- `productSlice` - Product catalog and search
- `uiSlice` - UI state and notifications

### **Example Usage**
```typescript
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { addItem } from '@/store/slices/cartSlice'

const dispatch = useAppDispatch()
const { items, total } = useAppSelector(state => state.cart)

dispatch(addItem({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity: 1
}))
```

## 🎨 **Styling & Theming**

### **Custom CSS Classes**
```css
.gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-morphism {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### **Theme Configuration**
The app supports automatic dark/light theme switching based on system preferences.

## 📱 **PWA Features**

### **Offline Support**
- Cached product browsing
- Offline cart management
- Background synchronization
- Offline fallback pages

### **Installation**
Users can install the app on their devices for a native-like experience.

### **Push Notifications**
Real-time notifications for:
- Order status updates
- New product recommendations
- Promotional offers
- Merchant alerts

## 🔒 **Security Features**

### **Authentication**
- JWT token-based authentication
- Social login support (Google, Apple)
- Secure password handling
- Session management

### **AI Fraud Detection**
- Real-time transaction monitoring
- Risk assessment algorithms
- Automatic fraud prevention
- Admin alert system

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
npm start
```

### **Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SOCKET_URL=wss://socket.example.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

### **Deployment Platforms**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

## 🧪 **Testing**

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 📈 **Performance Optimization**

### **Built-in Optimizations**
- Next.js Image optimization
- Automatic code splitting
- Route prefetching
- Bundle optimization
- CDN-ready assets

### **PWA Caching Strategy**
- **Static files**: Cache-first strategy
- **API calls**: Network-first with cache fallback
- **Dynamic content**: Stale-while-revalidate

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent deployment platform
- **shadcn** - Beautiful UI components
- **Framer** - Smooth animations library
- **Tailwind CSS** - Utility-first CSS framework

## 📞 **Support**

For support, email nelsonprox92@gmail.com 

---

<div align="center">
  <p>Built by Mugisha Prosper</p>
  <p>
    <a href="https://aether.vercel.app">Website</a> •
    <a href="https://docs.aether.com">Documentation</a>
  </p>
</div>