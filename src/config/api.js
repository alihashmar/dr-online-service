/**
 * ==========================================================
 * API Configuration File
 * ==========================================================
 * 
 * This file contains all API-related configuration for the
 * Dr. Online Healthcare Platform.
 * 
 * Backend: Node.js + Express + MySQL
 * ==========================================================
 */

// API BASE URL - Uses environment variable for production, localhost for development
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  services: `${API_BASE_URL}/services`,
  contacts: `${API_BASE_URL}/contacts`,
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`
  },
  appointments: `${API_BASE_URL}/appointments`
};

/**
 * API Fetch Helper
 * @param {string} endpoint - The API endpoint URL
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise} - JSON response data
 */
export const apiFetch = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('api_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_ENDPOINTS;
