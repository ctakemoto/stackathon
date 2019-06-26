<template>
  <b-navbar class="navbar" toggleable="sm" type="dark" fixed="top">
    <b-navbar-brand to="/">Toilt</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse2"></b-navbar-toggle>

    <b-collapse id="nav-collapse2" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/map">Map</b-nav-item>
        <b-nav-item to="/bathrooms">Explore</b-nav-item>
        <b-nav-item to="/add">Contribute</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/register" v-if="!this.isLoggedIn">Sign Up</b-nav-item>
        <b-nav-item to="/login" v-if="!this.isLoggedIn">Login</b-nav-item>
        <b-nav-item to="/profile" v-if="this.isLoggedIn">{{userGreeting}}</b-nav-item>
        <b-nav-item v-if="this.isLoggedIn" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'navbar',
  computed: {
    ...mapState({
      user: state => state.user.user,
      isLoggedIn: state => state.user.isLoggedIn,
    }),
    userGreeting() {
      return `Welcome, ${this.user.name || this.user.username}`;
    },
  },
  methods: {
    async logout() {
      // set toast based on status
      let toastConfig;
      try {
        await this.$store.dispatch('logout');

        toastConfig = {
          variant: 'success',
          title: 'Success',
          message: 'Logout successful',
        };
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
.navbar {
  height: 56px;
}

.navbar,
.navbar-collapse.collapse {
  background-color: #222;
}
.navbar-collapse.collapse.show {
  text-align: center;
  padding-right: 10px;
}
</style>