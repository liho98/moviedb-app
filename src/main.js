import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false

Vue.use(VueYoutube)

Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
