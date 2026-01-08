/**
 * ==========================================================
 * API Configuration File
 * ==========================================================
 * 
 * This file contains all API-related configuration for the
 * Dr. Online Healthcare Platform.
 * 
 * Backend: PHP + MySQL
 * Database: healthcare_db
 * 
 * To change the API URL, update API_BASE_URL below.
 * ==========================================================
 */

// ==========================================
// API BASE URL
// ==========================================
// Change this URL when deploying to production
export const API_BASE_URL = 'http://localhost/healthcare-api/api';

// ==========================================
// API ENDPOINTS
// ==========================================
// All available API endpoints
export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health.php`,         // GET: Check API status
  services: `${API_BASE_URL}/services.php`,     // GET: List medical services
  contacts: `${API_BASE_URL}/contacts.php`,     // GET/POST: Contact messages
  login: `${API_BASE_URL}/login.php`,           // POST: Admin authentication
  appointments: `${API_BASE_URL}/appointments.php`, // GET/POST: Appointments
};

// ==========================================
// API FETCH HELPER FUNCTION
// ==========================================
/**
 * Wrapper function for fetch() with automatic error handling
 * 
 * @param {string} endpoint - The API endpoint URL
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise} - JSON response data
 * 
 * Usage:
 *   const data = await apiFetch(API_ENDPOINTS.services);
 *   const result = await apiFetch(API_ENDPOINTS.contacts, {
 *     method: 'POST',
 *     body: JSON.stringify({ name: 'John', message: 'Hello' })
 *   });
 */
export const apiFetch = async (endpoint, options = {}) => {
  // Default headers for JSON requests
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Merge options with defaults
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    // Make the API request
    const response = await fetch(endpoint, config);
    const data = await response.json();
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    // Log error for debugging
    console.error('API Error:', error);
    throw error;
  }
};

export default API_ENDPOINTS;
