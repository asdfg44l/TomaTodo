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

router.beforeEach((to, from, next) => {
  //確認該分頁是否需要驗證
  if(to.meta.requiresAuth){
    //使用 api 來確認使用者是否已經登入
    var user = firebase.auth().currentUser;
    if(user) {
      next();
    }else {
      console.log("尚未登入")
      next({ path :"auth"})
    }
  }else{
    next();
  }
})