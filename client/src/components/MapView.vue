<template>
  <div class="mapid">
    <div id="map-view" v-if="!this.mapErr">
      <div class="text-center">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
    <b-alert show="this.mapErr" variant="danger" dismissible>Error in displaying map!</b-alert>
  </div>
</template>

<script>
import L from 'leaflet';
export default {
  name: 'mapid',
  data() {
    return {
      map: null,
      zoom: 18,
      tileLayer: null, //actual map visuals
      mapErr: false,
    };
  },
  props: {
    mapCoords: {
      type: Array,
      required: true,
    },
  },
  methods: {
    initMap(maxZoom = 18) {
      try {
        this.map = L.map('map-view').setView(this.mapCoords, this.zoom);

        this.tileLayer = L.tileLayer(
          `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`,
          {
            maxZoom,
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets',
            accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
          }
        ).addTo(this.map);
        this.mapErr = false;
      } catch (error) {
        console.error(err);
        this.mapErr = true;
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#map-view {
  height: 300px;
}
</style>