<template>
  <div class="register">
    <h1>Register</h1>

    <b-form @submit="register">
      <b-form-group id="input-group-1" label="Email Address:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="email"
          name="email"
          placeholder="email"
          v-model="email"
          required
        ></b-form-input>
      </b-form-group>
      <!-- v-model is a two way binding -->
      <b-form-group id="input-group-2" label="Username:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          name="username"
          placeholder="username"
          v-model="username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Name:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          name="name"
          placeholder="name"
          v-model="name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Password:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit">Register</b-button>
    </b-form>
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
      username: '',
      name: '',
    };
  },
  // watch: {
  //   email(value) {
  //     console.log('email has changed value:', value);
  //   },
  // },
  methods: {
    async register(e) {
      e.preventDefault();
      const { data } = await AuthenticationService.register({
        email: this.email,
        password: this.password,
        username: this.username,
        name: this.name,
      });
      // eslint-disable-next-line
      console.log(data);
    },
  },
  // mounted() {
  //   // this is like component did mount
  // },
};
</script>
  <style scoped />;
