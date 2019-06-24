<template>
  <div class="addBathroom">
    <h1>Add a Place</h1>
    <b-form autocomplete="off">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input id="input-1" type="text" name="name" v-model="fields.name" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Address:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          name="address"
          v-model="fields.address"
          @focus="showCollapse = true"
          @keyup.enter.native="setLocation"
          required
        ></b-form-input>
        <b-collapse id="collapse-map" v-model="showCollapse" v-on:click="setAddress">
          <b-alert show variant="info">You can click on the map to pick the address</b-alert>
          <MapView :mapCoords="mapCoords" :additionalCallback="setAddress"/>
        </b-collapse>
      </b-form-group>
      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          name="description"
          v-model="fields.description"
          @focus="showCollapse = false"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Is it a single stall?" label-for="input-4">
        <b-form-select
          id="input-4"
          name="singleStall"
          :options="options"
          v-model="fields.singleStall"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-5" label="Is it a handicap accessible?" label-for="input-5">
        <b-form-select
          id="input-5"
          name="handicapAccessible"
          :options="options"
          v-model="fields.handicapAccessible"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-6" label="Is it open all year round?" label-for="input-6">
        <b-form-select
          id="input-6"
          name="openYearRound"
          :options="options"
          v-model="fields.openYearRound"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-7"
        label="Do all (or most) toilets auto-flush?"
        label-for="input-7"
      >
        <b-form-select
          id="input-7"
          name="autoFlush"
          :options="options"
          v-model="fields.autoFlush"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-8" label="Is it gender neutral?" label-for="input-8">
        <b-form-select
          id="input-8"
          name="genderNeutral"
          :options="options"
          v-model="fields.genderNeutral"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-9" label="Is there a ledge in the stall?" label-for="input-9">
        <b-form-select
          id="input-9"
          name="hasLedge"
          :options="options"
          v-model="fields.hasLedge"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-10" label="Is it free to use?" label-for="input-10">
        <b-form-select
          id="input-10"
          name="isFree"
          :options="options"
          v-model="fields.isFree"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-11" label="How clean is it?" label-for="input-11">
        <b-form-select
          id="input-11"
          name="cleanliness"
          :options="options2"
          v-model="fields.cleanliness"
          required
        ></b-form-select>
      </b-form-group>
      <b-button @click.prevent="addPlace">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import PlacesService from '../services/PlacesService';
import MapView from './MapView';
export default {
  name: 'addBathroom',
  data() {
    return {
      fields: {
        name: '',
        description: '',
        address: '',
        latitude: null,
        longitude: null,
        singleStall: '',
        hasLedge: '',
        isFree: '',
        cleanliness: '',
        borough: '',
        handicapAccessible: '',
        openYearRound: '',
        genderNeutral: '',
      },
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'Yes', text: 'Yes' },
        { value: 'No', text: 'No' },
        { value: 'Unknown', text: 'Unknown' },
      ],
      options2: [
        { value: null, text: 'Please select an option' },
        { value: 'Great', text: 'Great' },
        { value: 'Good', text: 'Good' },
        { value: 'Okay', text: 'Okay' },
        { value: 'Poor', text: 'Poor' },
        { value: 'Unknown', text: 'Unknown' },
      ],
      showCollapse: false,
      mapCoords: this.$store.state.coords,
    };
  },
  components: {
    MapView,
  },
  methods: {
    async addPlace() {
      try {
        const { data } = await PlacesService.addPlace(this.fields);
        this.$store.dispatch('addBathroom', data);
        this.$router.push(`/bathrooms/${data.id}`);
      } catch (error) {
        console.error(error);
        let toastConfig = {
          variant: 'danger',
          title: 'Warning',
          message: error.response.data,
        };
        this.$bvToast.toast(toastConfig.message, toastConfig);
      }
    },
    async setAddress(lat, long) {
      try {
        console.log('lat', lat, 'long', long);
        const { data } = await PlacesService.getAddressFromCoords(lat, long);
        this.fields.address = data.address;
        this.fields.latitude = lat;
        this.fields.longitude = long;
      } catch (error) {
        console.error(error);
        let toastConfig = {
          variant: 'danger',
          title: 'Error getting address',
          message: error.response.data,
        };
        this.$bvToast.toast(toastConfig.message, toastConfig);
      }
    },
    async setLocation(e) {
      e.preventDefault();
      const { data } = await PlacesService.getCoordsFromAddress(
        this.fields.address
      );
      this.mapCoords = data.coords;
    },
  },
};
</script>

<style scoped>
.addBathroom {
  width: 80%;
  margin: 10px auto;
}
.addBathroom form {
  text-align: left;
  border: 1px solid #c2c2c2;
  padding: 10px;
  border-radius: 10px;
}
#collapse-map {
  margin: 10px;
}
</style>