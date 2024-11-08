import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
export const API_URL = "http://localhost:5000/api";

const $api: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api",
});

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;

}, async(error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem("token", response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log("User is not authorized!")
        }
    }
    throw error;
})

export default $api;