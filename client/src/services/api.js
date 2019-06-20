// to connect to the backend api endpoints
import axios from 'axios';

export default () => {
  return axios.create({
    baseUrl: process.env.SERVER_BASE_URL || `http://localhost:8080`,
  });
};
