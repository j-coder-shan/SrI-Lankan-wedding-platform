import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // Connects to API Gateway
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include auth token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
