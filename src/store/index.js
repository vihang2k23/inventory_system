import Vue from 'vue'
import Vuex from 'vuex'
import category from "../store/modules/category"
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    category
  }
})
