import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import AllBathrooms from '../components/AllBathrooms';
import Loading from '../components/LoadingSpinner';
import UserMapDisplay from '../components/UserMapDisplay';
import BathroomDetail from '../components/BathroomDetail';
import AddBathroom from '../components/AddBathroom';

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
    {
      path: '/bathrooms/:id',
      name: 'bathroom-detail',
      component: BathroomDetail,
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/map',
      name: 'map',
      component: UserMapDisplay,
    },
    {
      path: '/add',
      name: 'add-place',
      component: AddBathroom,
    },
  ],
});
