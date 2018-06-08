import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import app from '@/App'
import title from '@/components/home/title'
import examine from '@/components/home/tabChild/examine'
import registerPending from '@/components/home/registerPending'
import userManagement from '@/components/home/userManagement'
import registerPendinExamine from '@/components/home/tabChild/registerPendinExamine'
import pass from '@/components/home/tabChild/Status/pass'
import refuse from '@/components/home/tabChild/passStatus/refuse'
import InformationPending from '@/components/home/InformationPending'
import verified from '@/components/home/verified'
import home from '@/components/home'
import login from '@/components/login'

Vue.use(Router)
Vue.use(VueResource)
export default new Router({
	routes: [{
			path: '/',
			name: 'login',
			name: "login",
			component: login
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			children: [{
					path: "/",
					name: 'userManagement',
					component: userManagement,
					children: [{
						path: "/examine",
						name: 'examine',
						component: examine,
					}, ]
				},
				{
					path: "/userManagement",
					name: 'userManagement',
					component: userManagement,
				},
				{
					path: "/registerPending",
					name: 'registerPending',
					component: registerPending,
					children: [{
						path: "/registerPendinExamine",
						name: 'registerPendinExamine',
						component: registerPendinExamine,
						children: [{
								path: "/pass",
								name: 'pass',
								component: pass,
							},
							{
								path: "/refuse",
								name: 'refuse',
								component: refuse,
							},
						]
					}, ]
				},
				{
					path: "/verified",
					name: 'verified',
					component: verified,
				},
				{
					path: "/InformationPending",
					name: 'InformationPending',
					component: InformationPending,
				},

			]
		},

	]
})