import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import app from '@/App'
import title from '@/components/home/title'
import CreateTemplate from '@/components/home/template/CreateTemplate'
import templateList from '@/components/home/templateList'
import feedbackcontent from '@/components/home/feedbackChild/feedbackcontent'
import feedback from '@/components/home/feedback'
import messageList from '@/components/home/messageList'
import bidList from '@/components/home/bidList'
import userjoin from '@/components/home/userjoin'
import bannerList from '@/components/home/bannerList'
import examine from '@/components/home/tabChild/examine'
import registerPending from '@/components/home/registerPending'
import userManagement from '@/components/home/userManagement'
import registerPendinExamine from '@/components/home/tabChild/registerPendinExamine'
import pass from '@/components/home/tabChild/Status/pass'
import refuse from '@/components/home/tabChild/Status/refuse'
import passI from '@/components/home/tabChild/Information/pass'
import refuseI from '@/components/home/tabChild/Information/refuse'
import InformationPending from '@/components/home/InformationPending'
import InformationPendingE from '@/components/home/tabChild/InformationPendingE'
import home from '@/components/home'
import login from '@/components/login'

Vue.use(Router)
Vue.use(VueResource)
export default new Router({
	routes: [{
			path: '/',
			name: 'login',
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
					path: "/InformationPending",
					name: 'InformationPending',
					component: InformationPending,
					children: [{
						path: "/InformationPendingE",
						name: 'InformationPendingE',
						component: InformationPendingE,
						children: [{
								path: "/passI",
								name: 'passI',
								component: passI,
							},
							{
								path: "/refuseI",
								name: 'refuseI',
								component: refuseI,
							},
						]
					}, ]
				},

				{
					path: "/templateList",
					name: 'templateList',
					component: templateList,
					children: [{
						path: "/CreateTemplate",
						name: 'CreateTemplate',
						component: CreateTemplate,
					}, ]

				},
				{
					path: "/feedback",
					name: 'feedback',
					component: feedback,
					children: [{
						path: "/feedbackcontent",
						name: 'feedbackcontent',
						component: feedbackcontent,
					}, ]

				},
{
					path: "/messageList",
					name: 'messageList',
					component: messageList,
//					children: [{
//						path: "/feedbackcontent",
//						name: 'feedbackcontent',
//						component: feedbackcontent,
//					}, ]

				},
				{
					path: "/bidList",
					name: 'bidList',
					component: bidList,
//					children: [{
//						path: "/feedbackcontent",
//						name: 'feedbackcontent',
//						component: feedbackcontent,
//					}, ]

				},
								{
					path: "/userjoin",
					name: 'userjoin',
					component: userjoin,
//					children: [{
//						path: "/feedbackcontent",
//						name: 'feedbackcontent',
//						component: feedbackcontent,
//					}, ]

				},
												{
					path: "/bannerList",
					name: 'bannerList',
					component: bannerList,
//					children: [{
//						path: "/feedbackcontent",
//						name: 'feedbackcontent',
//						component: feedbackcontent,
//					}, ]

				},
			]
		},

	]
})