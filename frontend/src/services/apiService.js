// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiService;