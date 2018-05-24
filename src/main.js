
import Vue from 'vue'
import App from './App'
import login from './login'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#login',
  router,
  components: { login },
  template: '<login/>'
})

new Vue({
  el: '#app',
  router,
components: { App },
template: '<App/>'
})


