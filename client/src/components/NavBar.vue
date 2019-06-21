<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand to="/">MySite</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/map">Map</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav right>
        <b-nav-item to="/register">Register</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style scoped>
/* .navbar {
  width: 100vw;
  position: fixed;
  top: 0;
  margin: 0 0 10px 0;
} */
</style>