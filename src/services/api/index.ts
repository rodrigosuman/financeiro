import axios from 'axios';

const api = axios.create({
  baseURL: 'https://financeiro-backend.herokuapp.com',
});

export default api;
