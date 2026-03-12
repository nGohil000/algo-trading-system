import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  
  register: (email: string, username: string, password: string) =>
    api.post('/auth/register', { email, username, password }),
  
  refresh: (refresh_token: string) =>
    api.post('/auth/refresh', { refresh_token }),
  
  me: () => api.get('/auth/me'),
}

// Strategies API
export const strategiesAPI = {
  list: () => api.get('/strategies/'),
  
  get: (id: number) => api.get(`/strategies/${id}`),
  
  create: (data: any) => api.post('/strategies/', data),
  
  update: (id: number, data: any) => api.put(`/strategies/${id}`, data),
  
  delete: (id: number) => api.delete(`/strategies/${id}`),
  
  runBacktest: (id: number, data: any) => 
    api.post(`/strategies/${id}/backtest`, data),
  
  getBacktests: (id: number) => 
    api.get(`/strategies/${id}/backtests`),
}

// Trading API
export const tradingAPI = {
  list: (status?: string) => 
    api.get('/trades/', { params: { status } }),
  
  get: (id: number) => api.get(`/trades/${id}`),
  
  execute: (data: any) => api.post('/trades/', data),
  
  cancel: (id: number) => api.delete(`/trades/${id}`),
  
  summary: () => api.get('/trades/stats/summary'),
}

export default api
