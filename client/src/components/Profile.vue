<template>
  <b-container class="profile">
    <h1>Profile</h1>
    <div class="profile-info">
      <dl>
        <dt>Name:</dt>
        <dd>{{user.name}}</dd>
        <dt>Username:</dt>
        <dd>{{user.username}}</dd>
        <dt>Email:</dt>
        <dd>{{user.email}}</dd>
      </dl>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'profile',
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    test() {
      return process.env.VUE_APP_TEST_VAR;
    },
  },
};
</script>

<style scoped>
.profile-info {
  text-align: left;
}
</style>