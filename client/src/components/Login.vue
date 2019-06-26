<template>
  <div class="login">
    <h1>Login</h1>

    <b-form>
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

      <b-button @click.prevent="login">Login</b-button>
    </b-form>
  </div>
</template>

<script>
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
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        let toastConfig = {
          variant: 'danger',
          title: 'Error logging in',
          message: error.response.data,
        };
        this.$bvToast.toast(toastConfig.message, toastConfig);
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 80%;
  margin: 10px auto;
}
.login form {
  text-align: left;
  border: 1px solid #c2c2c2;
  padding: 10px;
  border-radius: 10px;
}
</style>