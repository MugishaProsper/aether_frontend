import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 10000, // 10 second timeout
    withCredentials: true // This is essential for cookies to be sent with requests
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
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true } // Important: include credentials for refresh endpoint
                );

                // The new access token should be in an HTTP-only cookie
                // No need to handle it in the frontend
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