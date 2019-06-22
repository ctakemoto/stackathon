<template>
  <b-container class="bathroom-detail">
    <Loading v-if="isLoading"/>
    <div v-if="!isLoading">
      <h1>{{this.bathroom.name}}</h1>
      <MapView
        v-if="!isLoading"
        v-bind:mapCoords="this.bathroom.coordinates"
        v-bind:mapHeight="'400px'"
      />
    </div>
  </b-container>
</template>

<script>
import PlacesServices from '../services/PlacesService';
import Loading from './LoadingSpinner';
import MapView from './MapView';
export default {
  name: 'bathroom-detail',
  methods: {},
  data() {
    return {
      isLoading: true,
      bathroom: null,
    };
  },
  components: {
    Loading,
    MapView,
  },
  async mounted() {
    // retrieve data for specific bathroom
    try {
      const { data } = await PlacesServices.getPlace(this.$route.params.id);
      this.$store.dispatch('setBathroom', data);
      this.bathroom = data;

      if (
        !this.bathroom.address &&
        this.bathroom.latitude &&
        this.bathroom.longitude
      ) {
        // if it has coords but no address, go fetch address
        this.bathroom.address = await PlacesServices.getAddressFromCoords(
          this.bathroom.latitude,
          this.bathroom.longitude
        );
      }
      if (
        (!this.bathroom.latitude || !this.bathroom.longitude) &&
        this.bathroom.address
      ) {
        this.bathroom.coordinates = await PlacesServices.getCoordsFromAddress(
          this.bathroom.address
        );
      }

      this.isLoading = false;
    } catch (error) {
      console.error(error);
      this.$bvToast.toast('Error retrieving data', {
        variant: 'danger',
        title: 'Oh no!',
      });
    }
  },
};
</script>

<style scoped>
</style>