// to connect to the backend api endpoints
import axios from 'axios';
console.log(process.env);
export default () => {
  return axios.create({
    // environmental variables are defined in .env
    baseURL: process.env.VUE_APP_SERVER_BASE_URL || `http://localhost:8080`,
  });
};
