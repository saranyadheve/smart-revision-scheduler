import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const login = (credentials) => api.post('auth/login', credentials);
export const register = (userData) => api.post('auth/register', userData);
export const verifyEmail = (token) => api.get(`auth/verify?token=${token}`);

// Revision & Stats
export const logRevisionSession = (data) => api.post('revisions', data);
export const getStats = (userId) => api.get(`revisions/stats/${userId}`);

// Notes / Study Materials
export const getAllNotes = () => api.get('notes');
export const getNotesBySubject = (subject) => api.get(`notes/subject/${subject}`);
export const createNote = (noteData) => api.post('notes', noteData);
export const deleteNote = (id) => api.delete(`notes/${id}`);

// Mock Test / Questions
export const getQuestionsByCategory = (category) => api.get(`questions/category/${category}`);
export const createQuestion = (questionData) => api.post('questions', questionData);
export const deleteQuestion = (id) => api.delete(`questions/${id}`);

// AI Service
export const predictSession = (sessionData) => axios.post('/ai/predict-session', sessionData);
export const retrainModel = () => axios.post('/ai/retrain');

// Admin endpoints
export const getAllUsers = () => api.get('admin/users');
export const toggleUserStatus = (id) => api.put(`admin/users/${id}/toggle`);

export default api;
