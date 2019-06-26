import PlacesServices from '../services/PlacesService';

export default {
  state: {
    allBathrooms: [],
    selectedBathroom: {},
  },
  mutations: {
    setAllBathrooms(state, bathrooms) {
      state.allBathrooms = bathrooms;
    },
    setBathroom(state, bathroom) {
      state.selectedBathroom = bathroom;
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
  },
  actions: {
    async setAllBathrooms({ commit }) {
      try {
        const { data } = await PlacesServices.getPlaces();
        commit('setAllBathrooms', data);
      } catch (error) {
        console.error(error);
      }
    },
    async setBathroom({ commit }, bathroomId) {
      try {
        const { data } = await PlacesServices.getPlace(bathroomId);

        let bathroom = data;

        if (!bathroom.address && bathroom.latitude && bathroom.longitude) {
          // if it has coords but no address, go fetch address
          const addressResponse = await PlacesServices.getAddressFromCoords(
            bathroom.latitude,
            bathroom.longitude
          );
          bathroom.address = addressResponse.data.address;
        }
        if ((!bathroom.latitude || !bathroom.longitude) && bathroom.address) {
          const coordsResponse = await PlacesServices.getCoordsFromAddress(
            bathroom.address
          );
          bathroom.coordinates = coordsResponse.data.coords;
        }
        commit('setBathroom', bathroom);
      } catch (error) {
        console.error(error);
      }
    },
    async addBathroom({ commit }, bathroom) {
      try {
        const { data } = await PlacesServices.addPlace(bathroom);
        commit('addBathroom', data);
        return data.id;
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit }, comment) {
      try {
        const { data } = await PlacesServices.addComment({
          title: comment.title,
          body: comment.body,
          userId: comment.userId,
          placeId: comment.placeId,
        });
        commit('addComment', data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  // getters: { ... }
};
