import Vue from 'vue'
import Router from 'vue-router'
import  VueResource  from 'vue-resource'
import login from '@/login'
import app from '@/App'



Vue.use(Router)
Vue.use(VueResource) 
export default new Router({
	routes: [{
		path: '/login',
		component: login
	},
	{
		path: '/app',
		component: app
	},
	]
})