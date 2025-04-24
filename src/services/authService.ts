import api from './api'; 

interface UserData {
  name: string;
  email: string;
  password: string;
}

// Register function using Axios
export const register = async (name: string, email: string, password: string,phone:string) => {
  try {
    const response = await api.post('/api/v1/register', { userName:name, email, password, phone });
    return response.data; // Axios automatically returns the response data
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login function using Axios
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/v1/login', { email, password });
    return response.data; // Axios automatically returns the response data
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
