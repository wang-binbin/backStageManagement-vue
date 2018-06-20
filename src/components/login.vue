<template>
	<div id="login">
		<img class="loginimg" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/bg.jpg">
		<div class="row">
			<div>
				<div class="input-group">
					<input type="tel" class="form-control" id="code" maxlength="11" placeholder="请输入手机号">
					<p style="clear: both;"></p>
					<input type="tel" class="form-control" id="inp" placeholder="请输入验证码">
					<span class="input-group-btn" id="span">
<button class="btn code btn-default" type="button" @click="getcode">获取验证码</button></span>
					<p style="clear: both;height: 40px;"></p>
					<div class="login" @click="login">立即登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {

			}
		},

		methods: {
			getcode: function() {//获取验证码

				var mobile = $("#code").val();
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(mobile)) {
					alert("请输入正确的手机号码!");
				} else {
					$.ajax({
						type: "post",
						url: "/admin/getMobileVerifyCode",
						async: true,
						data: {
							mobile: mobile
						},
						dataType: "json",
						success: function(result) {
							alert(result.msg);
							console.log(result);
						}
					})
				}
			},
			login: function() {//登录
				let that = this;
//				console.log(this)
//				that.$router.push('/home')
				var mobile = $("#code").val();
				var verifyCode = $("#inp").val();
				console.log(mobile + verifyCode)
				if(mobile != "") {
					$.ajax({
						type: "post",
						url: "/admin/login",
						async: true,
						data: {
							mobile: mobile,
							verifyCode: verifyCode
						},
						dataType: "json",
						success: function(result) {
//							console.log(result)
							if(result.status != "0000") {
								alert(result.msg)
							}
							if(result.status == "0000") {
//								console.log(that)
							that.$router.push('/home')
							}
							//
						},
						//
					})
				} else {
					alert("请输入验证码!")
				}
			},
		},

	}
</script>

<style scoped>
	.row{
		
		padding: 0;
		margin: 0;
		width: 400px;
		margin: 0 auto;
		background: #fff;
		height: 250px;
		border-radius: 15px;
		padding-top:45px;
	}
	#span{
	
	}
	p {
		height: 20px;
	}
	
	.input-group {
		float: none;
	}
	
	#inp {
		border-radius: 7px;
		width: 195px;
	}
	
	#span {
		margin-left: 10px;
		display: inline-block;
	}
	.code{
	background: #FFEA47;
    border: none;
    color: #fff;
	}
	#code {

		border-radius: 7px;
		width: 300px;
		float: none;
	}
	.loginimg{
			position: absolute;
			top: 0;
			left: 0;z-index: -1;
		width: 100%;
		height: 100%;
	}
	#login{
		padding-top: 100px;
		position: fixed;
		width: 100%;
		height: 100%;

	}
	.login {
		width: 300px;
		margin: 0 auto;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
		background: #FFEA47;
    border: none;
    color: #fff;
		border-radius: 5px;
	}
	
	.input-group {
		margin: 0 auto;
	}
</style>