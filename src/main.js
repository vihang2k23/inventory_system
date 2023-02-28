import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './route'
import store from './store'
import swal from "vue-swal"
Vue.config.productionTip = false
Vue.use(swal)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
