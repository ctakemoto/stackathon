export default {
  state: {
    coords: [40.705450817990055, -74.00917347517144],
    selectedLocation: [],
  },
  mutations: {
    setCurrentLocation(state, coords) {
      state.coords = coords;
    },
    setSelectedLocation(state, coords) {
      state.selectedLocation = coords;
    },
  },
  actions: {
    setCurrentLocation({ commit }, coords) {
      commit('setCurrentLocation', coords);
    },
    setSelectedLocation({ commit }, coords) {
      commit('setSelectedLocation', coords);
    },
  }
}