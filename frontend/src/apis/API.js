import axios from 'axios'
import { useAuth } from '../context/AuthContext';
const API = axios.create({
  baseURL: 'http://localhost:5000/', // Update with your backend API URL
  withCredentials: true,
});

// Custom hook to set token in header
export function useApi() {
  const { token } = useAuth();

  API.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return API;
}

export const loginApi = async (email, password) => {
  try {
    const response = await API.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signupStudentApi = async (userData) => {
  try {
    const response = await API.post('/signup/student', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up student:', error);
    throw error;
  }
};

export const signupTeacherApi = async (userData) => {
  try {
    const response = await API.post('/signup/teacher', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up teacher:', error);
    throw error;
  }
};

export const sendOtpApi = async (email) => {
  try {
    const response = await API.post('/send-otp', email);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

export const verifyOtpApi = async ({email , otp}) => {
  try {
    const response = await API.post('/verify-otp',{email , otp});
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}

export const generateqrApi = async (data) => {
  try {
    const response = await API.post('/generate-qr', data);
    return response.data;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export const scanQRApi = async (data) => {
  try {
    const response = await API.post('/scan-qr', data);
    return response.data;
  } catch (error) {
    console.error('Error scanning QR code:', error);
    throw error;
  }
}

export const markAttendanceApi = async (data) => {
  try {
    const response = await API.post('/mark-attendance', data);
    return response.data;
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;
  }
};