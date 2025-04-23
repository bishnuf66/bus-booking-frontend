import api from './api'; 

const SECRET_KEY = "busbooking"; 

interface UserData {
  name: string;
  email: string;
  password: string;
}

// Register function using Axios
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data; // Axios automatically returns the response data
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login function using Axios
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data; // Axios automatically returns the response data
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
