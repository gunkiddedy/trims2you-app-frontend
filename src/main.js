import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import './assets/css/custom.css'

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin);

import VueSweetalert2 from 'vue-sweetalert2'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2);


import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
  ]
}
Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
// Vue.use(VueHtmlToPaper);

// MOMENT JS
import moment from 'moment'
moment.locale('en'); //change to id for indonesian time
Vue.filter('momentDateIndoTime', function(value) {
	if (value) {
		return moment(String(value)).format('D-MMM-YYYY, h:mm:ss a') // (March 8th 2021, 4:51:58 am)
  	}
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
