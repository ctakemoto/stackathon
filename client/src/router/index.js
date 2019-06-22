import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import AllBathrooms from '../components/AllBathrooms';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/bathrooms',
      name: 'bathrooms',
      component: AllBathrooms,
    },
  ],
});
