import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin);

import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);


import './assets/css/tailwind.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
