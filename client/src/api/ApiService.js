import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const ApiService = {
  // General user-related requests
  fetchReview: async () => {
    const response = await axios.get(`${API_BASE_URL}/reviews`);
    return response.data;
  },
  
  createReview: async (reviewData) => {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    return response.data;
  },
  fetchUser: async (endpoint) => {
    try {
      const response = await api.get(`/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createUser: async (endpoint, formData) => {
    try {
      const response = await api.post(`/${endpoint}`, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateUser: async (endpoint, formData) => {
    try {
      const response = await api.put(`/${endpoint}`, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteUser: async (endpoint, formData) => {
    try {
      const response = await api.delete(`/${endpoint}`, { data: formData });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  auth: async (endpoint, formData) => {
    try {
      const response = await api.post(`/${endpoint}`, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Donation-related requests
  getAllDonations: async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createDonationCard: async (endpoint, formData) => {
    try {
      const response = await api.post(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateServiceData: async (endpoint, formData) => {
    try {
      const response = await api.put(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteServiceData: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Booking-related requests
  fetchBookingData: async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createBookingData: async (endpoint, formData) => {
    try {
      const response = await api.post(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateBookingData: async (endpoint, formData) => {
    try {
      const response = await api.put(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteBookingData: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Password reset requests
  sendResetPasswordInstructions: async (email) => {
    try {
      const response = await api.post(`/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    }
  },

  sendResetPassword: async (id, token, password) => {
    try {
      const response = await api.post(`/reset-password/${id}/${token}`, { password });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    }
  },

  // Stripe payments APIs
  connectStripe: async (endpoint, userId) => {
    try {
      const response = await api.post(endpoint, { userId });
      return response.data;
    } catch (error) {
      console.error('Stripe connect error:', error);
      throw error;
    }
  },
};

export default ApiService;
