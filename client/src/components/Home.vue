<template>
  <div class="home">
    <h1>Hello</h1>
    <b-alert
      :show="posErr"
      variant="danger"
      dismissible
    >Unable to get location, please enter address.</b-alert>
    <MapView
      v-if="!this.posErr&&this.posIsReady"
      v-bind:mapCoords="this.$store.state.coords"
      v-bind:includeArea="true"
    />
    <Loading v-if="!this.posErr&&!this.posIsReady"/>
  </div>
</template>

<script>
import MapView from './MapView';
import Loading from './LoadingSpinner';
export default {
  name: 'home',
  components: {
    MapView,
    Loading,
  },
  data() {
    return {
      posErr: false,
      posIsReady: false,
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
          console.log('pos', pos);
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
  },
  mounted() {
    this.getUserLocation();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
