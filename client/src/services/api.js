// to connect to the backend api endpoints
import axios from 'axios';

export default () => {
  return axios.create({
    // environmental variables are defined in .env
    baseURL: process.env.VUE_APP_BASE_URL,
  });
};
