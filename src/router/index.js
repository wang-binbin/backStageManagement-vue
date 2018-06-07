import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import app from '@/App'
import title from '@/components/home/title'
import examine from '@/components/home/tabChild/examine'
import registerPending from '@/components/home/registerPending'
import userManagement from '@/components/home/userManagement'
import InformationPending from '@/components/home/InformationPending'
import verified from '@/components/home/verified'
import home from '@/components/home'
import login from '@/components/login'

Vue.use(Router)
Vue.use(VueResource)
export default new Router({
	routes: [{
			path: '/',
			name:'login',
			name: "login",
			component: login
		},
		{
			path: '/home',
			name:'home',
			component: home,
			children: [ {
					path: "/",
					name:'userManagement',
					component: userManagement,
					children:[{
					path: "/",
					component: examine,
					name:'examine',
					},
					{
					path: "/examine",
					name:'examine',
					component: examine,
					},
					]
				},
				{
					path: "/userManagement",
					name:'userManagement',
					component: userManagement,
				},
				{
					path: "/registerPending",
					name:'registerPending',
					component: registerPending,
				},
				{
					path: "/verified",
					name:'verified',
					component: verified,
				},
				{
					path: "/InformationPending",
					name:'InformationPending',
					component: InformationPending,
				},

			]
		},

	]
})