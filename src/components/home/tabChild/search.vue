<template>
	<div class="row">
		<div class="wid">
			<ul @click="search" class="sousuo">
				搜索
			</ul>
			<div class="input-group">
				<input @keyup.13="search" type="tel" maxlength="11" class="form-control mobile" v-model="mobile" placeholder="搜索用户手机号">
			</div>
			<p class="cle"></p>
			<!-- Single button -->
			<div class="">

				<ul class="clicc">
					<li id="0" @click="screen1" class="1" ref="id1" style="background: blue;">
						<a>注册待审</a>
					</li>
					<li id="0" @click="screen4" ip="0" ref="id4">
						<a>资料待审</a>
					</li>
					<li id="1" @click="screen2" ref="id2">
						<a>审核通过</a>
					</li>
					<li id="2" @click="screen3" ref="id3">
						<a>审核未通过</a>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
			}
		},
		methods: {
			search: function() {
				let that = this;

				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(that.mobile)) {
					alert("请输入正确的手机号码!")
				} else {
					$.ajax({
						type: "post",
						url: "/user/findUserByMobile",
						async: true,
						data: {
							mobile: that.mobile
						},
						dataType: "json",
						success: function(result) {
							if(result.status == '0000') {
								that.mobile = ''
								that.$emit("mobile", result)
							} else {
								alert(result.msg);
							}
						}
					})
				}
			},
			screen1: function() {
				let that = this;
//				console.log(that.$refs.id1.id);
				console.log(that.$refs.id1.class);
				that.$refs.id1.style.background = "blue";
				that.$refs.id2.style.background = "none";
				that.$refs.id3.style.background = "none";
				that.$refs.id4.style.background = "none";
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						checkStatus: 0,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.$emit("PagingData1", result)
						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen2: function() {
				let that = this;
				console.log(that.$refs.id2.id);
				that.$refs.id2.style.background = "blue";
				that.$refs.id3.style.background = "none";
				that.$refs.id1.style.background = "none";
				that.$refs.id4.style.background = "none";
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						checkStatus: 1,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.$emit("PagingData2", result)
						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen3: function() {
				let that = this;
				console.log(that.$refs.id3.id);
				that.$refs.id3.style.background = "blue";
				that.$refs.id2.style.background = "none";
				that.$refs.id1.style.background = "none";
				that.$refs.id4.style.background = "none";
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						checkStatus: 2,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.$emit("PagingData3", result)
						} else {
							alert(result.msg);
						}

					}
				})
			},
			screen4: function() {
				let that = this;
				console.log(that.$refs.id4.id);
				console.log(that.$refs.id4.ip);
				that.$refs.id4.style.background = "blue";
				that.$refs.id2.style.background = "none";
				that.$refs.id1.style.background = "none";
				that.$refs.id3.style.background = "none";
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						checkStatus: 0,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result)
						if(result.status == '0000') {
							that.$emit("PagingData4", result)
						} else {
							alert(result.msg);
						}

					}
				})
			},
		},
	}
</script>

<style scoped="scoped">
	.clicc li {
		float: left;
		width: 120px;
		border-radius: 15px;
		text-align: center;
		line-height: 30px;
	}
	
	.clicc li a {
		color: #000000;
	}
	
	.row {
		margin-left: 0;
		margin-right: 0;
	}
	
	.mobile {
		border-radius: 15px!important;
	}
</style>