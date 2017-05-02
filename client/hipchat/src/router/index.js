import Router from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';

import Home from '../routes/home/Home';

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
