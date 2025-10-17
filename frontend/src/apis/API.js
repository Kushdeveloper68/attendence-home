import axios from 'axios'
import { useAuth } from '../context/authcontext';
const API = axios.create({
  baseURL: 'http://localhost:5000/', // Update with your backend API URL
  withCredentials: true,
});

// Custom hook to set token in header
export function useApi() {
  const { authToken } = useAuth();

  API.interceptors.request.use((config) => {
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
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

export const submitStudentReportApi = async (data) => {
  try {
    const response = await API.post('/student-report', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting student report:', error);
    throw error;
  }
};

export const submitTeacherReportApi = async (data) => {
  try {
    const response = await API.post('/teacher-report', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting teacher report:', error);
    throw error;
  }
};


//admin apis 

// ========== Student Admin Panel APIs ========== //

export const getAllStudentsApi = async () => {
  try {
    const response = await API.get('/admin/students');
    return response.data.students;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to fetch students";
  }
};

export const getStudentByEnrollmentApi = async (enrollmentNumber) => {
  try {
    const response = await API.get(`/admin/students/search`, {
      params: { enrollmentNumber }
    });
    return response.data.student;
  } catch (error) {
    throw error?.response?.data?.error || "Student not found";
  }
};

export const filterStudentsApi = async (branch, semester) => {
  try {
    const response = await API.get(`/admin/students/filter`, {
      params: { branch, semester }
    });
    return response.data.students;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to filter students";
  }
};

export const addStudentApi = async (studentData) => {
  try {
    const response = await API.post(`/admin/students`, studentData);
    return response.data.student;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to add student";
  }
};

export const editStudentApi = async (studentId, studentData) => {
  try {
    const response = await API.put(`/admin/students/${studentId}`, studentData);
    return response.data.student;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to update student";
  }
};

export const deleteStudentApi = async (studentId) => {
  try {
    await API.delete(`/admin/students/${studentId}`);
    return "Student deleted successfully";
  } catch (error) {
    throw error?.response?.data?.error || "Failed to delete student";
  }
};


// ========== Teacher Admin Panel APIs ========== //

export const getAllTeachersApi = async () => {
  try {
    const response = await API.get('/admin/teachers');
    return response.data.teachers;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to fetch teachers";
  }
};

export const getTeacherByUniqueIdApi = async (uniqueId) => {
  try {
    const response = await API.get(`/admin/teachers/search`, {
      params: { uniqueId }
    });
    return response.data.teacher;
  } catch (error) {
    throw error?.response?.data?.error || "Teacher not found";
  }
};

export const filterTeachersByBranchApi = async (branch) => {
  try {
    const response = await API.get(`/admin/teachers/filter`, {
      params: { branch }
    });
    return response.data.teachers;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to filter teachers";
  }
};

export const addTeacherApi = async (teacherData) => {
  try {
    const response = await API.post(`/admin/teachers`, teacherData);
    return response.data.teacher;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to add teacher";
  }
};

export const editTeacherApi = async (teacherId, teacherData) => {
  try {
    const response = await API.put(`/admin/teachers/${teacherId}`, teacherData);
    return response.data.teacher;
  } catch (error) {
    throw error?.response?.data?.error || "Failed to update teacher";
  }
};

export const deleteTeacherApi = async (teacherId) => {
  try {
    await API.delete(`/admin/teachers/${teacherId}`);
    return "Teacher deleted successfully";
  } catch (error) {
    throw error?.response?.data?.error || "Failed to delete teacher";
  }
};
