<template>
  <div class="mapid">
    <div id="map-view" v-if="!this.mapErr">
      <Loading/>
    </div>
    <b-alert :show="mapErr" variant="danger" dismissible>Error in displaying map!</b-alert>
  </div>
</template>

<script>
import L from 'leaflet';
import Loading from './LoadingSpinner';
export default {
  name: 'mapid',
  data() {
    return {
      map: null,
      zoom: 18,
      tileLayer: null, //actual map visuals
      mapErr: false,
      marker: null,
      area: null,
    };
  },
  components: {
    Loading,
  },
  props: {
    mapCoords: {
      type: Array,
      required: true,
    },
    includeArea: {
      type: Boolean,
      default: false,
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

        // let markerIcon = this.createIcon();

        // this.marker = L.marker(this.mapCoords, {
        //   icon: markerIcon,
        // }).addTo(this.map);

        this.marker = L.circle(this.mapCoords, {
          color: '#222',
          fillColor: '#222',
          fillOpacity: 1,
          radius: 1,
        }).addTo(this.map);

        if (this.includeArea) {
          //  add area circle
          this.area = L.circle(this.mapCoords, {
            color: '#222',
            fillColor: '#222',
            fillOpacity: 0.3,
            radius: 50,
          }).addTo(this.map);
        }

        this.mapErr = false;
      } catch (error) {
        console.error(err);
        this.mapErr = true;
      }
    },
    createIcon() {
      return L.icon({
        iconUrl: '../assets/map-marker.png',
        shadowUrl: '../assets/map-marker-shadow.png',

        iconSize: [38, 64], // size of the icon
        shadowSize: [46, 27], // size of the shadow
        iconAnchor: [22, 64], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 25], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
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