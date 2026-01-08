// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// API Endpoints
export const ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  contacts: `${API_BASE_URL}/api/contacts`,
  services: `${API_BASE_URL}/api/services`,
  users: `${API_BASE_URL}/api/users`,
  login: `${API_BASE_URL}/api/users/login`,
  register: `${API_BASE_URL}/api/users/register`,
  appointments: `${API_BASE_URL}/api/appointments`
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_BASE_URL;
