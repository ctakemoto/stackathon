import Api from './api';

export default {
  register(credentials) {
    // axios does a post request to the register endpoint in our api
    return Api().post('auth/signup', credentials);
  },
  login(credentials) {
    return Api().post('auth/login', credentials);
  },
  logout() {
    return Api().post('auth/logout');
  },
};

// the above method is called like this from another file:

// AuthenticationService.register({
//   email: 'name@email.com',
//   password: '1234'
// })
