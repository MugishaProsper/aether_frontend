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

// Request interceptor to handle CSRF token if needed
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // If your API requires CSRF token, you can fetch it from cookies here
        // const csrfToken = getCookie('XSRF-TOKEN');
        // if (csrfToken) {
        //     config.headers['X-XSRF-TOKEN'] = csrfToken;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        if (response.status === 401) {
            // If we get a 401, it means the user is not authenticated
            // or the session has expired
            return Promise.reject(new Error('Not authenticated'));
        }
        return response;
    },
    async (error: AxiosError) => {
        // Handle network errors or other request failures
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
        }

        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    { 
                        withCredentials: true,
                        timeout: 10000 // Shorter timeout for refresh requests
                    }
                );

                if (response.status === 200) {
                    // Retry the original request with the new token
                    return api(originalRequest);
                }
                
                // If refresh failed, reject with the original error
                return Promise.reject(new Error('Session expired. Please log in again.'));
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear any auth state and redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;