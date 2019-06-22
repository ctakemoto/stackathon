import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from './store';

import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

sync(store, router);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
