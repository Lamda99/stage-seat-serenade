
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

console.log('🔗 API Base URL:', API_BASE_URL);

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async get(endpoint: string) {
    console.log(`📡 GET request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  async post(endpoint: string, data?: any) {
    console.log(`📡 POST request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  async put(endpoint: string, data?: any) {
    console.log(`📡 PUT request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  async delete(endpoint: string) {
    console.log(`📡 DELETE request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};

// Test the connection
export const testConnection = async () => {
  try {
    console.log('🔍 Testing connection to:', `${API_BASE_URL}/health`);
    const response = await apiClient.get('/health');
    console.log('✅ Backend connection successful:', response);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};
