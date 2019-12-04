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
      baseImageUrl: "https://image.tmdb.org/t/p/original/",
      baseMovieUrl: "https://api.themoviedb.org/3/movie/",
      token: process.env.VUE_APP_MOVIEDB_TOKEN,
      key: process.env.VUE_APP_MOVIEDB_KEY,
    },
    movieList: {},
    videoList: {},
    status: '',
    selectedMovieId: 0,
    selectedVideoId: "",
  },
  mutations: {
    fetchRequest(state) {
      state.status = 'loading'
    },
    fetchMovieList(state, list) {
      state.status = 'success'
      state.movieList = list
    },
    fetchError(state) {
      state.status = 'error'
    },
    setNavigationDrawer(state, value) {
      state.navigationDrawer = value
    },
    setMovieId(state, id) {
      Vue.set(state, 'selectedMovieId', id);
      state.selectedMovieId = id
    },
    fetchVideoList(state, list) {
      state.videoList = list
    },
    setVideoId(state, id) {
      Vue.set(state, 'selectedVideoId', id);
    },
  },
  actions: {
    fetchMovie({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseUrl + 'trending/movie/week', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('fetchMovieList', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },
    async fetchVideo({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseMovieUrl + this.state.movieList.results[this.state.selectedMovieId].id + '/videos', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, })
          .then((resp) => {
            commit('fetchVideoList', resp.data)
            commit("setVideoId", resp.data.results[0].key);
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
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
