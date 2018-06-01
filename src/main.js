
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'  
import './assets/js/bootstrap.min.js'  
//import './assets/css/menu.css'  
//import './assets/css/base.css'  
//import './assets/js/menu.js'  
//import './assets/js/adapter.js'  
import 'vue-beauty/package/style/vue-beauty.min.css'


import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  $,
components: { App },
template: '<App/>'
})


