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
        >{{comment.body}}</b-card>
      </b-container>
      <AddComment v-if="showCommentForm" v-bind:bathroomId="bathroom.id"/>
      <b-button v-else @click="showCommentForm = !showCommentForm">Add a Comment</b-button>
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
      bathroom: null,
      mapErr: false,
      showCommentForm: false,
    };
  },
  methods: {
    async getPlace() {
      // retrieve data for specific bathroom
      try {
        const { data } = await PlacesServices.getPlace(this.$route.params.id);

        this.bathroom = data;

        if (
          !this.bathroom.address &&
          this.bathroom.latitude &&
          this.bathroom.longitude
        ) {
          // if it has coords but no address, go fetch address
          const addressResponse = await PlacesServices.getAddressFromCoords(
            this.bathroom.latitude,
            this.bathroom.longitude
          );
          this.bathroom.address = addressResponse.data.address;
        }
        if (
          (!this.bathroom.latitude || !this.bathroom.longitude) &&
          this.bathroom.address
        ) {
          const coordsResponse = await PlacesServices.getCoordsFromAddress(
            this.bathroom.address
          );
          this.bathroom.coordinates = coordsResponse.data.coords;
        }
        this.$store.dispatch('setBathroom', this.bathroom);
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
</style>