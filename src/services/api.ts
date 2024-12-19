import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const regulationService = {
  getAll: () => api.get('/regulations'),
  getById: (id: string) => api.get(`/regulations/${id}`),
  search: (params: any) => api.get('/regulations/search', { params }),
};

export const userService = {
  create: (userData: any) => api.post('/users', userData),
  getProfile: (id: string) => api.get(`/users/${id}`),
  update: (id: string, userData: any) => api.patch(`/users/${id}`, userData),
  saveRegulation: (userId: string, regulationId: string) => 
    api.post(`/users/${userId}/save-regulation/${regulationId}`),
};

export const assessmentService = {
  create: (assessmentData: any) => api.post('/assessments', assessmentData),
  getById: (id: string) => api.get(`/assessments/${id}`),
  update: (id: string, assessmentData: any) => api.patch(`/assessments/${id}`, assessmentData),
  getUserAssessments: (userId: string) => api.get(`/assessments/user/${userId}`),
};
