<template>
  <div class="login">
    <h1>Login</h1>

    <b-form @submit="login">
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
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      // set toast based on status
      let toastConfig;
      try {
        let { data, status } = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        toastConfig = {
          variant: 'success',
          title: 'Success',
          message: 'Login successful',
        };
      } catch (error) {
        console.dir(error);
        toastConfig = {
          variant: 'danger',
          title: 'Warning',
          message: error.response.data,
        };
      }
      this.$bvToast.toast(toastConfig.message, toastConfig);
    },
  },
};
</script>

<style scoped>
.login {
  width: 80%;
  min-width: 600px;
  margin: 10px auto;
}
.login form {
  text-align: left;
  border: 1px solid #c2c2c2;
  padding: 10px;
  border-radius: 10px;
}
</style>