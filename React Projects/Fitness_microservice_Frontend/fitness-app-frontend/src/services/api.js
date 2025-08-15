import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (userId) {
        config.headers['X-User-Id'] = userId;
    }
    return config;
});

// ✅ Normal endpoints
export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);

// ✅ Updated getActivityDetail with fallback
export const getActivityDetail = async (id) => {
    try {
        // Try recommendation service first
        const res = await api.get(`/recommendations/activity/${id}`);
        return res;
    } catch (error) {
        console.warn(`Recommendation service unavailable for activity ${id}, falling back to /activities/${id}`);
        // Fallback to normal activity endpoint
        return await api.get(`/activities/${id}`);
    }
};
