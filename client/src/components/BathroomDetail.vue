<template>
  <b-container class="bathroom-detail">
    <Loading v-if="isLoading&&!mapErr"/>
    <div v-if="!isLoading">
      <h1>{{this.bathroom.name}}</h1>
      <MapView
        v-if="!isLoading&&!mapErr"
        v-bind:mapCoords="this.bathroom.coordinates"
        v-bind:mapHeight="'400px'"
      />
      <b-container>
        <h3>Comments</h3>
        <b-card
          v-bind:key="comment.id"
          v-for="comment in this.bathroom.comments"
          :title="comment.title"
          :sub-title="comment.userId ? comment.user.username : 'Guest'"
          class="comment-card"
        >{{comment.body}}</b-card>
      </b-container>
      <AddComment v-bind:bathroomId="bathroom.id"/>
    </div>
  </b-container>
</template>

<script>
import PlacesServices from '../services/PlacesService';
import Loading from './LoadingSpinner';
import MapView from './MapView';
import AddComment from './AddComment';
export default {
  name: 'bathroom-detail',
  methods: {},
  data() {
    return {
      isLoading: true,
      mapErr: false,
    };
  },
  computed: {
    bathroom() {
      return this.$store.state.selectedBathroom;
    },
  },
  watch: {
    bathroom: function(val) {
      console.dir(val);
    },
  },
  methods: {
    async getPlace() {
      // retrieve data for specific bathroom
      try {
        const { data } = await PlacesServices.getPlace(this.$route.params.id);

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
        this.$store.dispatch('setBathroom', bathroom);
        console.log('bathroom', bathroom);
      } catch (error) {
        console.error(error);
        this.$bvToast.toast(error.response.data, {
          variant: 'danger',
          title: 'Error finding Coordinates',
        });
        this.mapErr = true;
      }
      this.isLoading = false;
    },
  },
  components: {
    Loading,
    MapView,
    AddComment,
  },
  mounted() {
    this.getPlace();
  },
};
</script>

<style scoped>
.comment-card {
  margin: 10px;
}
</style>