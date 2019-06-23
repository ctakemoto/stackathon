<template>
  <b-container class="allBathrooms">
    <Loading v-if="isLoading"/>
    <div class="overflow-auto" v-else>
      <h1>Explore {{numBathrooms}} Bathrooms</h1>
      <div id="bathroom-container">
        <SingleBathroom
          v-bind:key="bathroom.id"
          v-for="bathroom in bathrooms"
          v-bind:bathroom="bathroom"
          class="single-bathroom"
        />
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="numBathrooms"
        :per-page="perPage"
        aria-controls="single-bathroom"
        align="center"
      ></b-pagination>
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
      currentPage: 1,
      perPage: 9,
    };
  },
  computed: {
    bathrooms() {
      const items = this.$store.state.allBathrooms;
      // Return just page of items needed
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
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
#bathroom-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>