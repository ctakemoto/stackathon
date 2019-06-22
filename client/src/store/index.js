import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, //makes immutable
  state: {
    user: null,
    isLoggedIn: false,
    allBathrooms: [],
    coords: [40.705450817990055, -74.00917347517144],
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
    setCurrentLocation(state, coords) {
      state.coords = coords;
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
    setCurrentLocation({ commit }, coords) {
      commit('setCurrentLocation', coords);
    },
  },
});
