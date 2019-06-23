<template>
  <b-container class="user-map">
    <h1>Find Bathrooms Near You</h1>

    <b-input-group>
      <b-form-input v-model="address" placeholder="Enter an address" v-on:submit="setLocation" trim></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-success" v-on:click="setLocation">GO</b-button>
      </b-input-group-append>
    </b-input-group>
    <MapView
      v-if="!this.posErr&&this.posIsReady"
      v-bind:mapCoords="this.$store.state.coords"
      v-bind:includeArea="true"
      v-bind:mapHeight="'400px'"
    />
    <Loading v-if="!this.posErr&&!this.posIsReady"/>
    <b-alert
      :show="posErr"
      variant="danger"
      dismissible
    >Unable to get location, please enter address.</b-alert>
  </b-container>
</template>

<script>
import MapView from './MapView';
import Loading from './LoadingSpinner';
import PlacesService from '../services/PlacesService';
export default {
  name: 'user-map',
  components: {
    MapView,
    Loading,
  },
  data() {
    return {
      posErr: false,
      posIsReady: false,
      address: '',
    };
  },
  methods: {
    getUserLocation() {
      let options = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        pos => {
          // if successful
          this.$store.dispatch('setCurrentLocation', [
            pos.coords.latitude,
            pos.coords.longitude,
          ]);
          this.posErr = false;
          this.posIsReady = true;
        },
        err => {
          // if unsuccessful
          console.error(err);
          this.posErr = true;
        },
        options
      );
    },
    async setLocation(e) {
      e.preventDefault();
      const { data } = await PlacesService.getCoordsFromAddress(this.address);
      this.$store.dispatch('setCurrentLocation', data.coords);
    },
  },
  mounted() {
    this.getUserLocation();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
