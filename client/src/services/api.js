// to connect to the backend api endpoints
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://toilt.herokuapp.com/';
export default () => {
  return axios.create({
    // environmental variables are defined in .env
    baseURL: baseURL,
  });
};
console.log('process.env', process.env);
