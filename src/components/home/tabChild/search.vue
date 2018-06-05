<template>
	<div class="row">
		<div class="wid">
			<div class="btn-group sousuo">
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    查询方式 <span class="caret"></span>
  </button>
				<ul class="dropdown-menu" style="min-width: 100px">
					<li class="searchPhone" @click="search">
						<a>查询手机号</a>
					</li>
					<li class="searchNickname">
						<a>查询昵称</a>
					</li>
				</ul>
			</div>

			<div class="input-group">
				<input  type="tel"  class="form-control mobile" v-model="mobile" placeholder="搜索用户手机号/或昵称">
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
//				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(that.mobile=='') {
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

		},
	}
</script>

<style scoped="scoped">
	.btn-group {
				margin-left: 0;
				margin-top: 20px;
				background: none;
			}
	.tle {
		float: left;
		margin: 0;
		margin-left: 10%;
		line-height: 75px;
		font-size: 34px;
	}
	
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
			background: #fff;
		box-shadow: 0px 0px 5px #888888;
	}
	
	.mobile {
		border-radius: 15px!important;
	}
</style>