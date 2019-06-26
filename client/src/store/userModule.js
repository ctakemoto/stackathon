import AuthenticationService from '../services/AuthenticationService';
export default {
  state: {
    user: {},
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    async login({ commit }, authDetails) {
      try {
        let { data } = await AuthenticationService.login({
          email: authDetails.email,
          password: authDetails.password,
        });
        commit('setUser', data);
      } catch (error) {
        console.error(error);
      }
    },
    async logout({ commit }) {
      try {
        await AuthenticationService.logout();
        commit('logout');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
