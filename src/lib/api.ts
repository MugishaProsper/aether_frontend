import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 30000, // 30 second timeout
    withCredentials: true, // This is essential for cookies to be sent with requests
    validateStatus: (status) => {
        // Don't reject on 401/403, we'll handle them in the interceptor
        return status >= 200 && status < 500;
    }
});

// Track if we're already refreshing the token
let isRefreshing = false;
let failedQueue: Array<{resolve: (value: any) => void, reject: (reason?: any) => void}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

// Request interceptor to add auth token to requests
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Skip adding auth header for login/refresh endpoints
        if (config.url?.includes('/auth/')) {
            return config;
        }

        // Get the access token from cookies
        const accessToken = getCookie('accessToken');
        
        // If we have a token, add it to the headers
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Ensure we're sending credentials with every request
        config.withCredentials = true;
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { 
            _retry?: boolean, 
            _queueRequest?: boolean,
            url?: string
        };
        
        // Handle network errors
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
        }

        // Skip refresh token logic for login/refresh endpoints to prevent infinite loops
        const isAuthEndpoint = originalRequest.url?.includes('/auth/');
        
        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
            // If we're already refreshing the token, queue the request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ 
                        resolve: (token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            }
                            resolve(api(originalRequest));
                        }, 
                        reject 
                    });
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Clear any existing auth state before refreshing
                if (typeof window !== 'undefined') {
                    document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }

                // Attempt to refresh the token
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    { 
                        withCredentials: true,
                        timeout: 10000 // Shorter timeout for refresh requests
                    }
                );

                if (response.data?.accessToken) {
                    const { accessToken } = response.data;
                    
                    // Update the default authorization header
                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    
                    // Process queued requests
                    processQueue(null, accessToken);
                    
                    // Update the Authorization header for the original request
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    }
                    
                    // Retry the original request with the new token
                    return api(originalRequest);
                } else {
                    throw new Error('No access token in refresh response');
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                processQueue(refreshError, null);
                
                // Clear auth state and redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('user');
                    document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    
                    // Only redirect if we're not already on the login page
                    if (!window.location.pathname.includes('/auth/login')) {
                        window.location.href = '/auth/login';
                    }
                }
                
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // For other errors, just reject with the error
        return Promise.reject(error);
    }
);

export default api;