import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://financeiro-backend.herokuapp.com',
  baseURL: 'http://192.168.1.106:3000',
});

export default api;
