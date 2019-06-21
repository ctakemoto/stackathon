import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import Register from '../components/Register';
import MapView from '../components/MapView';
import Login from '../components/Login';
import AllBathrooms from '../components/AllBathrooms';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
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
