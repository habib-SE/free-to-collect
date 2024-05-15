import axios from "axios";

export const API_BASE_URL = "http://localhost:5555/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const serviceApi = axios.create({
  baseURL: API_BASE_URL,
});
const bookingApi = axios.create({
  baseURL: API_BASE_URL,
});

const ApiService = {
  fetchUser: async (endpoint) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_BASE_URL}/${endpoint}`)
        .then(async (response) => {
          resolve(response.data);
          console.log("response.data", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  createUser: async (endpoint, formData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_BASE_URL}/${endpoint}`, formData)
        .then(async (response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  updateUser: async (endpoint, formData) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_BASE_URL}/${endpoint}`, formData)
        .then(async (response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  deleteUser: async (endpoint, formData) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_BASE_URL}/${endpoint}`, formData)
        .then(async (response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  auth: async (endpoint, formData) => {
    const response = await api.post(`${API_BASE_URL}/${endpoint}`, formData);
    return response.data;
  },

  // services end point section

  getAllDonations: async (endpoint) => {
    try {
      const response = await serviceApi.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  createDonationCard: async (endpoint, formData) => {
    try {
      const response = await serviceApi.post(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateServiceData: async (endpoint, formData) => {
    try {
      const response = await serviceApi.put(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteServiceData: async (endpoint) => {
    try {
      const response = await serviceApi.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchBookingData: async (endpoint) => {
    try {
      const response = await bookingApi.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  createBookingData: async (endpoint, formData) => {
        try {
      const response = await bookingApi.post(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateBookingData: async (endpoint, formData) => {
    try {
      const response = await bookingApi.put(endpoint, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteBookingData: async (endpoint) => {
    try {
      const response = await bookingApi.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  // stripe payments apis
  connectStripe: async (endpoint, userId) => {
    try {
      const response = await serviceApi.post(endpoint, userId);
      return response.data;
    } catch (error) {
      console.error("Stripe connect error:",error);
    }
  },
};

export default ApiService;
