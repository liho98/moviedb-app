import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigationDrawer: true,
    api: {
      baseUrl: "https://api.themoviedb.org/3/",
      imageUrl: "https://image.tmdb.org/t/p/original/",
      token: process.env.VUE_APP_MOVIEDB_TOKEN,
      key: process.env.VUE_APP_MOVIEDB_KEY,
    },
    movieList: {},
    status: '',
  },
  mutations: {
    fetch_request(state) {
      state.status = 'loading'
    },
    fetch_success(state, list) {
      state.status = 'success'
      state.movieList = list
    },
    fetch_error(state) {
      state.status = 'error'
    },
  },
  actions: {
    fetchMovie({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetch_request')
        axios.get(this.state.api.baseUrl + 'trending/movie/week', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('fetch_success', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetch_error')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },
  },
  modules: {
  },
  getters: {
    getNavigationDrawer: state => state.navigationDrawer,
  }
})
