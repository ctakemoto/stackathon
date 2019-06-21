<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand to="/">MySite</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/map">Map</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav right>
        <b-nav-item to="/register">Sign Up</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav right>
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>
      <b-nav-form right>
        <b-button @click="logout">Logout</b-button>
      </b-nav-form>
    </b-navbar>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  name: 'navbar',
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