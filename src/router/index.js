import Vue from 'vue'
import Router from 'vue-router'
import  VueResource  from 'vue-resource'
import app from '@/App'
import title from '@/components/home/title'
import tab from '@/components/home/tab'
import home from '@/components/home'
import login from '@/components/login'



Vue.use(Router)
Vue.use(VueResource) 
export default new Router({
	routes: [
	{
		path: '/',
		name:"login",
		component: login
	},
	{
		path: '/home',
		component: home
	},
	]
})