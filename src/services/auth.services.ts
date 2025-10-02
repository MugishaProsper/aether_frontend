import api from "@/lib/api"
import { LoginUser, RegisteringUser, User } from "@/types"

// Helper function to handle API errors
function handleApiError(error: any): never {
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
    } else if (error.message) {
        throw new Error(error.message)
    } else {
        throw new Error('An unexpected error occurred')
    }
}

export async function register({ registrationData }: { registrationData: RegisteringUser }) {
    try {
        const response = await api.post('/auth/register', registrationData)

        if (response.data.success) {
            // The server will set the auth cookies
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Registration failed')
        }
    } catch (error: any) {
        console.error('Registration failed:', error)
        handleApiError(error)
    }
}

interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export async function login({ loginData }: { loginData: LoginUser }): Promise<LoginResponse['data']> {
    try {
        const response = await api.post<LoginResponse>('/auth/login', loginData);

        if (response.data.success) {
            // The server will set the auth cookies
            // Return the response data including tokens
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Login failed');
        }
    } catch (error: any) {
        console.error('Login failed:', error);
        return handleApiError(error);
    }
}

export async function logout() {
    try {
        // The server will clear the auth cookies
        await api.post('/auth/logout')        
        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
        }
        return { success: true }
    } catch (error: any) {
        console.error('Logout failed:', error)
        // Even if logout fails, redirect to login
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
        }
        return { success: true }
    }
}

// No need for refreshToken function anymore as it's handled by the API interceptor

export async function getCurrentUser(): Promise<User> {
    try {
        const response = await api.get('/auth/me')

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to get user profile')
        }
    } catch (error: any) {
        console.error('Get current user failed:', error)
        // Don't redirect here, let the calling component handle it
        throw error;
    }
}

export async function updateProfile(userData: Partial<User>): Promise<User> {
    try {
        const response = await api.put('/auth/me', userData)

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Profile update failed')
        }
    } catch (error: any) {
        console.error('Profile update failed:', error)
        handleApiError(error)
    }
}

export async function forgotPassword(email: string) {
    try {
        const response = await api.post('/auth/forgot-password', { email })

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Password reset request failed')
        }
    } catch (error: any) {
        console.error('Forgot password failed:', error)
        // Don't redirect for forgot password, just show the error
        throw error;
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        const response = await api.post('/auth/reset-password', {
            token,
            password: newPassword
        })

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Password reset failed')
        }
    } catch (error: any) {
        console.error('Password reset failed:', error)
        // Don't redirect here, let the calling component handle it
        throw error;
    }
}