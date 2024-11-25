import axios from 'axios';

// Use your environment variable for the API base URL
const API_BASE = import.meta.env.VITE_API_BASE;

// Set up Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Add an interceptor to include the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token in header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch movies and their favorite status
export const fetchMovies = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/movies`, {
      params: { page, limit },
    });
    return response.data; // Return fetched movies data
  } catch (error) {
    console.error('Error fetching movies:', error.response?.data || error.message);
    throw error.response?.data || 'Error fetching movies'; // Handle error properly
  }
};

// Toggle favorite status of a movie
export const toggleFavorite = async (movieId) => {
  try {
    const response = await axiosInstance.post(`/movies/toggleFavorites/${movieId}`);
    return response.data; // Return updated favorite status
  } catch (error) {
    console.error('Error toggling favorite:', error.response?.data || error.message);
    throw error.response?.data || 'Error toggling favorite'; // Handle error properly
  }
};

export const getFavorites = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (!token) {
      throw new Error('Authorization token required');
    }

    const response = await axiosInstance.get('/movies/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    return response.data; // Return favorite movies
  } catch (error) {
    console.error('Error fetching favorites:', error.response?.data || error.message);
    throw error.response?.data || 'Error fetching favorites';
  }
};

