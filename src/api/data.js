import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API;
const API_KEY = import.meta.env.VITE_API_KEY;


export const discoverMovie = `${BASE_URL}discover/movie?api_key=${API_KEY}`;

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
});

export default api;