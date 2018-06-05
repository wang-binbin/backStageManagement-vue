import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import app from '@/App'
import title from '@/components/home/title'
//import leftNavigation from '@/components/home/leftNavigation'
import registerPending from '@/components/home/registerPending'
import InformationPending from '@/components/home/InformationPending'
import verified from '@/components/home/verified'
import home from '@/components/home'
import login from '@/components/login'

Vue.use(Router)
Vue.use(VueResource)
export default new Router({
	routes: [{
			path: '/',
			name: "login",
			component: login
		},
		{
			path: '/home',
			component: home,
			children: [ {
					path: "/",
					component: registerPending
				},
				{
					path: "/registerPending",
					component: registerPending,
				},
				{
					path: "/verified",
					component: verified,
				},
				{
					path: "/InformationPending",
					component: InformationPending,
				},

			]
		},

	]
})