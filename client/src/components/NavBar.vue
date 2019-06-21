<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand to="/">MySite</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/map">Map</b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/register" v-if="!$store.state.isLoggedIn">Sign Up</b-nav-item>
          <b-nav-item to="/login" v-if="!$store.state.isLoggedIn">Login</b-nav-item>
          <b-nav-text v-if="$store.state.isLoggedIn">{{userGreeting}}</b-nav-text>
          <b-nav-item v-if="$store.state.isLoggedIn" to="#">Profile</b-nav-item>
          <b-nav-item v-if="$store.state.isLoggedIn" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  name: 'navbar',
  computed: {
    userGreeting() {
      return `Welcome, ${this.$store.state.user.name ||
        this.$store.state.user.email}`;
    },
  },
  methods: {
    async logout() {
      // set toast based on status
      let toastConfig;
      try {
        let { data, status } = await AuthenticationService.logout();
        toastConfig = {
          variant: 'success',
          title: 'Success',
          message: 'Logout successful',
        };
        this.$store.dispatch('logout');
      } catch (error) {
        console.error(error);
        toastConfig = {
          variant: 'danger',
          title: 'Warning',
          message: error.response.data,
        };
      }
      this.$bvToast.toast(toastConfig.message, toastConfig);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>