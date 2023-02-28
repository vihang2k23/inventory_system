import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './route'
import store from './store'
import swal from "vue-swal"
Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  
  return " ₹ "  + parseFloat(value).toFixed(2);
})
Vue.filter("convert",function (value) {
  return value.toString();
})
Vue.use(swal)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
