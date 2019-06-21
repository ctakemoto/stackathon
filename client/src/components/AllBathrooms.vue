<template>
  <div class="allBathrooms">
    <h1>Explore {{numBathrooms}} Bathrooms</h1>
    <SingleBathroom
      v-bind:key="bathroom.id"
      v-for="bathroom in bathrooms"
      v-bind:bathroom="bathroom"
    />
  </div>
</template>

<script>
import PlacesServices from '../services/PlacesService';
import SingleBathroom from './SingleBathroom';
export default {
  name: 'allBathrooms',
  methods: {
    async getBathrooms() {
      try {
        const { data } = await PlacesServices.getPlaces();

        this.$store.dispatch('getAllBathrooms', data);
      } catch (error) {
        console.error(error);
        this.$bvToast.toast('Error retrieving data', {
          variant: 'danger',
          title: 'Oh no!',
        });
      }
    },
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
  },
  mounted() {
    // this is like component did mount
    this.getBathrooms();
  },
};
</script>

<style scoped>
</style>