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
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Registration failed')
        }
    } catch (error: any) {
        console.error('Registration failed:', error)
        handleApiError(error)
    }
}

export async function login({ loginData }: { loginData: LoginUser }) {
    try {
        const response = await api.post('/auth/login', loginData)

        if (response.data.success) {
            const { user, accessToken, refreshToken } = response.data.data

            // Store tokens in localStorage
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            return { user, accessToken, refreshToken }
        } else {
            throw new Error(response.data.message || 'Login failed')
        }
    } catch (error: any) {
        console.error('Login failed:', error)
        handleApiError(error)
    }
}

export async function logout() {
    try {
        const refreshToken = localStorage.getItem('refreshToken')
        await api.post('/auth/logout', { refreshToken })

        // Clear tokens from localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        return { success: true }
    } catch (error: any) {
        console.error('Logout failed:', error)
        // Even if logout fails on server, clear local tokens
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return { success: true }
    }
}

export async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
            throw new Error('No refresh token available')
        }

        const response = await api.post('/auth/refresh', { refreshToken })

        if (response.data.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            return { accessToken, refreshToken: newRefreshToken }
        } else {
            throw new Error(response.data.message || 'Token refresh failed')
        }
    } catch (error: any) {
        console.error('Token refresh failed:', error)
        // Clear invalid tokens
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        handleApiError(error)
    }
}

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
        handleApiError(error)
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
        handleApiError(error)
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
        handleApiError(error)
    }
}