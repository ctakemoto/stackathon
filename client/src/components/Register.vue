<template>
  <div class="register">
    <h1>Register</h1>

    <input type="email" name="email" placeholder="email" v-model="email">
    <!-- v-model is a two way binding -->
    <input type="password" name="password" placeholder="password" v-model="password">
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  // watch: {
  //   email(value) {
  //     console.log('email has changed value:', value);
  //   },
  // },
  methods: {
    async register() {
      const { data } = await AuthenticationService.register({
        email: this.email,
        password: this.password,
      });
      console.log(data);
    },
  },
  // mounted() {
  //   // this is like component did mount
  // },
};
</script>
  <style scoped />;
