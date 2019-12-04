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
      baseImageUrl: "https://image.tmdb.org/t/p/original",
      baseMovieUrl: "https://api.themoviedb.org/3/movie/",
      baseTvUrl: "https://api.themoviedb.org/3/tv/",
      token: process.env.VUE_APP_MOVIEDB_TOKEN,
      key: process.env.VUE_APP_MOVIEDB_KEY,
    },
    movieList: {},
    tvList: {},
    movVideoList: {},
    tvVideoList: {},
    movieDetailsList: {},
    tvDetailsList: {},
    status: '',
    selectedTab: "Movie",
    selectedMovieId: 0,
    selectedVideoId: "",

  },
  mutations: {
    fetchRequest(state) {
      state.status = 'loading'
    },
    fetchError(state) {
      state.status = 'error'
    },
    setMovieList(state, list) {
      state.status = 'success'
      state.movieList = list
    },
    setTVList(state, list) {
      state.status = 'success'
      state.tvList = list
    },
    setNavigationDrawer(state, value) {
      state.navigationDrawer = value
    },
    setMovieId(state, id) {
      state.selectedMovieId = id
    },
    setMovVideoList(state, list) {
      state.movVideoList = list
    },
    setTvVideoList(state, list) {
      state.tvVideoList = list
    },
    setVideoId(state, id) {
      Vue.set(state, 'selectedVideoId', id);
    },
    setMovieDetails(state, list) {
      state.movieDetailsList = list
    },
    setTvDetails(state, list) {
      state.tvDetailsList = list
    },
    setSelectedTab(state, tab) {
      state.selectedTab = tab
      // Vue.set(state, 'selectedTab', tab);
    },
  },
  actions: {
    fetchMovie({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseUrl + 'discover/movie', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setMovieList', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            reject(error)
          })
      })
    },
    fetchTV({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseUrl + 'discover/tv', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setTVList', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            reject(error)
          })
      })
    },
    async fetchMovVideoList({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseMovieUrl + this.state.movieList.results[this.state.selectedMovieId].id + '/videos', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setMovVideoList', resp.data)
            commit("setVideoId", resp.data.results[0].key);
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            reject(error)
          })
      })
    },
    async fetchTvVideoList({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseTvUrl + this.state.tvList.results[this.state.selectedMovieId].id + '/videos', { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setTvVideoList', resp.data)
            commit("setVideoId", resp.data.results[0].key);
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            reject(error)
          })
      })
    },
    fetchMovieDetails({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseMovieUrl + this.state.movieList.results[this.state.selectedMovieId].id, { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setMovieDetails', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
            reject(error)
          })
      })
    },
    fetchTvDetails({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetchRequest')
        axios.get(this.state.api.baseTvUrl + this.state.tvList.results[this.state.selectedMovieId].id, { params: { "api_key": this.state.api.key } }, { headers: { 'Content-Type': 'application/json; charset=utf-8' }, timeout: 5000, })
          .then((resp) => {
            commit('setTvDetails', resp.data)
            // console.log(resp.data)
            resolve(resp)
          })
          .catch((error) => {
            commit('fetchError')
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
