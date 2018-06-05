<template>
	<div class="homepage">
		<div class="leftNavigation">
			<div class="account-l fl" style="width: 100%;">
				<a class="list-title">
					<!--<img style="width: 100%;" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/official/logo.png">-->
					麦奇后台
				</a>
				<ul id="accordion" class="accordion">
					<li>
						<div class="link"><i class="fa fa-file-text"></i>注册审核<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
							<li >
								<router-link to="/registerPending">
								<a>注册待审</a>
								</router-link>
							</li>
							<li >
								<router-link to="/InformationPending">
								<a>资料待审</a>
								</router-link>
							</li>
							<li>
								
								<a>审核通过</a>
								
							</li>
							<li >
								
								<a>审核拒绝</a>
							
							</li>
						</ul>
					</li>

					<li>
						<div class="link"><i class="fa fa-hand-o-right"></i>资料审核<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
							<li>
								<a>审核通过</a>
							</li>
							<li>
								<a>审核拒绝</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<registerPending :userss="userss" :paging="paging" />

	</div>
</template>

<script>
	import registerPending from './home/registerPending'
import InformationPending from './home/InformationPending'
	export default {
		name: "homepage",
		components: {
			registerPending,
			InformationPending
		},
		data() {
			return {
				two: 0,
				one: 1,
				paging: '',
				userss: [],
			}
		},
		methods: {
			screen1: function() {
				let that = this;
//				that.$router.push('/registerPending');
				that.status = 0;
				that.infoCheckStatus = 1;
			},
			screen4: function() {

				let that = this;
//				that.$router.push('/InformationPending');
				that.status = 0;
				that.infoCheckStatus = 0;
			},
			screen2: function() {
				let that = this;
				that.status = 1;
			},
			screen3: function() {
				let that = this;
				that.status = 2;
			},

		},
	}
</script>

<style>

</style>