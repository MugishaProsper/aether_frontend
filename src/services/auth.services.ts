import api from "@/lib/api"
import { LoginUser, RegisteringUser } from "@/types"

export async function register({ registrationData }: { registrationData: RegisteringUser }) {
    try {
        const response = await api.post('/auth/register', registrationData)
        return response.data
    } catch (error) {
        console.error('Registration failed:', error)
        throw error
    }
};

export async function login({ loginData }:{ loginData : LoginUser}){
    try {
        const response = await api.post('/auth/login', loginData);
        return response.data
    } catch (error : any) {
        throw new Error(error)
    }
};

export async function logout(){
    try {
        const response = await api.post('/auth/logout');
        return response.data
    } catch ( error : any) {
        throw new Error(error)
    }
}