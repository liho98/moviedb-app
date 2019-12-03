import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigationDrawer: true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getNavigationDrawer: state => state.navigationDrawer,
  }
})
