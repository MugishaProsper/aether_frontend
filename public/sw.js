const CACHE_NAME = 'aether-frontend-v1';
const STATIC_CACHE_NAME = 'aether-frontend-static-v1';
const DYNAMIC_CACHE_NAME = 'aether-frontend-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/products',
  '/auth/login',
  '/manifest.json',
  '/offline.html',
  // Add your static assets here
];

// Files that should be cached dynamically
const DYNAMIC_FILES = [
  '/api/',
  '/checkout',
  '/merchant',
  '/admin',
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static files with cache-first strategy
  if (STATIC_FILES.some(file => url.pathname === file || url.pathname.startsWith(file))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Handle dynamic pages with stale-while-revalidate strategy
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// Network-first strategy (good for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Cache-first strategy (good for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache and network failed:', error);
    
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Stale-while-revalidate strategy (good for dynamic content)
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.log('[SW] Network failed:', error);
      return null;
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    fetchPromise; // Update cache in background
    return cachedResponse;
  }
  
  // Otherwise wait for network
  const networkResponse = await fetchPromise;
  
  if (networkResponse) {
    return networkResponse;
  }
  
  // Fallback to offline page for navigation requests
  if (request.mode === 'navigate') {
    return caches.match('/offline.html');
  }
  
  throw new Error('No cached response and network failed');
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCart());
  }
  
  if (event.tag === 'order-sync') {
    event.waitUntil(syncOrders());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from AI Commerce',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AI Commerce', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for background sync
async function syncCart() {
  try {
    // Get offline cart data from IndexedDB
    const cartData = await getOfflineCartData();
    
    if (cartData && cartData.length > 0) {
      // Sync with server
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
      
      if (response.ok) {
        // Clear offline cart data
        await clearOfflineCartData();
        console.log('[SW] Cart synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Cart sync failed:', error);
  }
}

async function syncOrders() {
  try {
    // Get offline order data from IndexedDB
    const orderData = await getOfflineOrderData();
    
    if (orderData && orderData.length > 0) {
      // Sync with server
      const response = await fetch('/api/orders/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        // Clear offline order data
        await clearOfflineOrderData();
        console.log('[SW] Orders synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Order sync failed:', error);
  }
}

// IndexedDB helper functions (simplified)
async function getOfflineCartData() {
  // Implementation would use IndexedDB to get offline cart data
  return [];
}

async function clearOfflineCartData() {
  // Implementation would clear IndexedDB cart data
}

async function getOfflineOrderData() {
  // Implementation would use IndexedDB to get offline order data
  return [];
}

async function clearOfflineOrderData() {
  // Implementation would clear IndexedDB order data
}