<template>
  <b-container class="allBathrooms">
    <Loading v-if="isLoading"/>
    <div v-if="!isLoading">
      <h1>Explore {{numBathrooms}} Bathrooms</h1>
      <SingleBathroom
        v-bind:key="bathroom.id"
        v-for="bathroom in bathrooms"
        v-bind:bathroom="bathroom"
      />
    </div>
  </b-container>
</template>

<script>
import PlacesServices from '../services/PlacesService';
import SingleBathroom from './SingleBathroom';
import Loading from './LoadingSpinner';
export default {
  name: 'allBathrooms',
  methods: {
    async getBathrooms() {
      try {
        const { data } = await PlacesServices.getPlaces();

        this.$store.dispatch('setAllBathrooms', data);
        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.$bvToast.toast('Error retrieving data', {
          variant: 'danger',
          title: 'Oh no!',
        });
      }
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    bathrooms() {
      return this.$store.state.allBathrooms;
    },
    numBathrooms() {
      return this.$store.state.allBathrooms.length;
    },
  },
  components: {
    SingleBathroom,
    Loading,
  },
  mounted() {
    // this is like component did mount
    this.getBathrooms();
  },
};
</script>

<style scoped>
</style>