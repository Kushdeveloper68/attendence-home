import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/', // Update with your backend API URL
  withCredentials: true,
});

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
