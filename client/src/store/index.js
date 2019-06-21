import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, //makes immutable
  state: {
    user: null,
    isLoggedIn: false,
    allBathrooms: [],
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
    getAllBathrooms(state, bathrooms) {
      state.allBathrooms = bathrooms;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    },
    getAllBathrooms({ commit }, bathrooms) {
      commit('getAllBathrooms', bathrooms);
    },
  },
});
