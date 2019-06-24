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
      <h3>Information</h3>
      <b-container class="place-info">
        <div class="info-right">
          <div>
            <h4>Description</h4>
            <p>{{this.bathroom.desciption ? this.bathroom.desciption : 'None'}}</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>{{this.bathroom.address ? this.bathroom.address : 'None'}}</p>
          </div>
        </div>
        <dl class="info-left">
          <dt>Single Stall:</dt>
          <dd>{{this.bathroom.singleStall}}</dd>
          <dt>Handicap Accessible:</dt>
          <dd>{{this.bathroom.handicapAccessible}}</dd>
          <dt>Open Year Round:</dt>
          <dd>{{this.bathroom.openYearRoundl}}</dd>
          <dt>Autoflush:</dt>
          <dd>{{this.bathroom.autoFlush}}</dd>
          <dt>Gender Neutral:</dt>
          <dd>{{this.bathroom.genderNeutral}}</dd>
          <dt>Ledge in Stall:</dt>
          <dd>{{this.bathroom.hasLedge}}</dd>
          <dt>Free to use:</dt>
          <dd>{{this.bathroom.isFree}}</dd>
          <dt>Cleanliness Level:</dt>
          <dd>{{this.bathroom.cleanliness}}</dd>
        </dl>
      </b-container>
      <b-container>
        <h3>Comments</h3>
        <b-card
          v-bind:key="comment.id"
          v-for="comment in this.bathroom.comments"
          :header="'Posted by '+(comment.userId ? comment.user.username : 'Guest')"
          :title="comment.title"
          :sub-title="'Posted on '+comment.createdAt.slice(0, 10)"
          class="comment-card text-left"
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
  methods: {
    format(date, format) {
      dateFormat(date, format);
    },
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
          console.log('bathroom.comments', bathroom.comments);
        }
        this.$store.dispatch('setBathroom', bathroom);
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
.place-info {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  text-align: left;
}
.info-right,
.info-left {
  margin: 10px 20px 10px 10px;
}
</style>