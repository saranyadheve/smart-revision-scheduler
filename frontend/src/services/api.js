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
    console.log(`[API Request] Calling URL: ${config.baseURL}${config.url}`);
    const token = localStorage.getItem('sr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to log responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] Success for ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`[API Error] Failed calling ${error.config?.url}:`, error.response || error.message);
    
    // Clear local storage on auth failure to prevent stale session issues
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Auth failure detected. Clearing session.");
      localStorage.removeItem('sr_token');
      localStorage.removeItem('sr_user');
      // We don't force a reload here to avoid infinite loops, 
      // but the next page load or action will be clean.
    }
    
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (credentials) => api.post('auth/login', credentials);
export const register = (userData) => api.post('auth/register', userData);
export const verifyEmail = (token) => api.get(`auth/verify?token=${token}`);
export const verifyPasscode = (data) => api.post('auth/verify-passcode', data);
export const resendPasscode = (email) => api.post('auth/resend-passcode', { email });

// Revision & Stats
export const logRevisionSession = (data) => api.post('revisions', data);
export const getStats = (userId) => api.get(`revisions/stats/${userId}`);

// Study Materials (Library)
export const getAllNotes = () => api.get('notes');
export const getNotesBySubject = (subject) => api.get(`notes/subject/${subject}`);
export const createNote = (noteData) => api.post('notes', noteData);
export const deleteNote = (id) => api.delete(`notes/${id}`);

// Personal Notes (User specific)
export const getPersonalNotes = (userId) => api.get(`notes/user/${userId}`);
export const createPersonalNote = (userId, noteData) => api.post(`notes/user/${userId}`, noteData);
export const updatePersonalNote = (id, noteData) => api.put(`notes/${id}`, noteData);
export const deletePersonalNote = (id) => api.delete(`notes/${id}`);

// To-do List (Sub-topic persistence)
export const getUserTodos = (userId) => api.get(`todos/user/${userId}`);
export const toggleTodo = (userId, todoData) => api.post(`todos/user/${userId}/toggle`, todoData);

// Mock Test / Questions
export const getQuestionsByCategory = (category) => api.get(`questions/category/${category}`);
export const createQuestion = (questionData) => api.post('questions', questionData);
export const deleteQuestion = (id) => api.delete(`questions/${id}`);

// AI Service
export const predictSession = (sessionData) => axios.post('/ai/predict-session', sessionData);
export const retrainModel = () => axios.post('/ai/retrain');

// AI Learning Hub
export const getLearningModules = () => api.get('learning/modules');
export const getTopicsByModule = (moduleId) => api.get(`learning/modules/${moduleId}/topics`);
export const getTopicContent = (topicId) => api.get(`learning/topics/${topicId}/content`);
export const updateTopicProgress = (userId, topicId, completed) => api.post(`/learning/progress/${userId}/${topicId}?completed=${completed}`);

// AI Generation Endpoints
export const triggerTopicGeneration = (topicId) => api.post(`/learning/generate/${topicId}`);
export const getGenerationJobStatus = (jobId) => api.get(`/learning/job-status/${jobId}`);
export const saveGeneratedContent = (topicId, result) => api.post(`/learning/save-generated/${topicId}`, result);
export const getLearningStats = (userId) => api.get(`learning/stats/completion/${userId}`);

// Admin endpoints
export const getAllUsers = () => api.get('admin/users');
export const toggleUserStatus = (id) => api.put(`admin/users/${id}/toggle`);

export default api;
