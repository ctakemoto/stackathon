import Api from './api';

export default {
  getPlaces() {
    // axios does a post request to the register endpoint in our api
    return Api().get('api/places');
  },
  getPlace(id) {
    return Api().get(`api/places/${id}`);
  },
  addPlace(placeDetails) {
    return Api().post('api/places', placeDetails);
  },
};
