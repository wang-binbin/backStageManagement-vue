<template>
	<div>

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
							<li id="0" @click="screen1" ref="id1">
								<a>注册待审</a>
							</li>
							<li id="0" @click="screen4" ref="id4">
								<a>资料待审</a>
							</li>
							<li id="1" @click="screen2" ref="id2">
								<a>审核通过</a>
							</li>
							<li id="2" @click="screen3" ref="id3">
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
		<register :userss="userss" :paging="paging" />
	</div>
</template>

<script>
	import register from './tabChild/register'

	export default {
		name: "leftNavigation",

		components: {
			register,
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
				that.userss = "[{'nickName': 'zik','mobile': '15892333333','status': '0','gender': 'm'}]";
				console.log(that.$refs.id1.id);
				console.log(that.one);

				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: 0,
						page: 1,
						infoCheckStatus: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.paging = 0;
							that.userss = "[{'nickName': 'zik','mobile': '15892333333','status': '0','gender': 'm'}]";
						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen4: function() {
				let that = this;
				console.log(that.$refs.id4.id);
				console.log(that.two);

				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: 0,
						page: 1,
						infoCheckStatus: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.paging = 1;

						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen2: function() {
				let that = this;
				console.log(that.$refs.id2.id);

				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: 1,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.paging = 2;
						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen3: function() {
				let that = this;
				console.log(that.$refs.id3.id);

				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: 2,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.paging = 3;
						} else {
							alert(result.msg);
						}

					}
				})
			},

		},
	}
</script>
<style>

</style>