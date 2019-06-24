import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, //makes immutable
  state: {
    user: {},
    isLoggedIn: false,
    allBathrooms: [],
    selectedBathroom: {},
    coords: [40.705450817990055, -74.00917347517144],
    selectedLocation: [],
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
    setAllBathrooms(state, bathrooms) {
      state.allBathrooms = bathrooms;
    },
    setBathroom(state, bathroom) {
      state.selectedBathroom = bathroom;
    },
    setCurrentLocation(state, coords) {
      state.coords = coords;
    },
    addBathroom(state, bathroom) {
      state.allBathrooms = [...state.allBathrooms, bathroom];
    },
    addComment(state, comment) {
      comment.user = state.user;
      state.selectedBathroom.comments = [
        ...state.selectedBathroom.comments,
        comment,
      ];
    },
    setSelectedLocation(state, coords) {
      state.selectedLocation = coords;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    },
    setAllBathrooms({ commit }, bathrooms) {
      commit('setAllBathrooms', bathrooms);
    },
    setBathroom({ commit }, bathroom) {
      commit('setBathroom', bathroom);
    },
    setCurrentLocation({ commit }, coords) {
      commit('setCurrentLocation', coords);
    },
    addBathroom({ commit }, bathroom) {
      commit('addBathroom', bathroom);
    },
    addComment({ commit }, comment) {
      commit('addComment', comment);
    },
    setSelectedLocation({ commit }, coords) {
      commit('setSelectedLocation', coords);
    },
  },
});
