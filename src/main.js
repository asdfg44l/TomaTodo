import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

// vue-loading
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

// Use v-calendar & v-date-picker components
import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
  componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
});

// bootstrap
import 'bootstrap';

Vue.config.productionTip = false

Vue.component('loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

