// to connect to the backend api endpoints
import axios from 'axios';

export default () => {
  return axios.create({
    // environmental variables are defined in .env
    baseURL: process.env.VUE_APP_SERVER_BASE_URL || `http://localhost:3000`,
  });
};
console.log('process.env', process.env);
