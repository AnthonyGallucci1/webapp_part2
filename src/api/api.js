import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

export default api;
