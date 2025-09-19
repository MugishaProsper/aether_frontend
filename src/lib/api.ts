import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

const api = axios.create({
    baseURL: BASE_URL,
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

export default api