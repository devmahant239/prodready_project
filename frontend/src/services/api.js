// Picks up VITE_API_BASE_URL from .env.local (dev) or .env.production (prod build)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper wrapper around standard fetch API with automatic JWT header injection.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong. Please try again.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}`);
    }
    throw error;
  }
}

export const api = {
  // Auth API
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request('/auth/me'),

  // Protected User API
  getDashboardData: () => request('/user/dashboard'),

  // Health check API
  checkHealth: () => request('/health'),
};
