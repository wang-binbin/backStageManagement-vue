<template>
	<div id="login">
		<div class="row">
			<div>
				<div class="input-group">
					<input type="tel" class="form-control" id="code" maxlength="11" placeholder="请输入手机号">
					<p style="clear: both;"></p>
					<input type="tel" class="form-control" id="inp" placeholder="请输入验证码">
					<span class="input-group-btn" id="span">
<button class="btn code btn-default" type="button" @click="getcode">获取验证码</button></span>
					<p style="clear: both;"></p>
					<div class="login" @click="login">登录</div>
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
			getcode: function() {
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
			login: function() {
				let that = this;
				console.log(this)
				that.$router.push('/home')
				
				var mobile = $("#code").val();
				var verifyCode = $("#inp").val();
				console.log(mobile + verifyCode)
				if(mobile != "") {
					$.ajax({
						type: "post",
						url: "/admin/login",
						async: true,
						//		Content-Type:"application/x-www-form-urlencoded",
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
								console.log(that)
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
	p {
		height: 20px;
	}
	
	.input-group {
		float: none;
	}
	
	#inp {
		border-radius: 20px;
		width: 200px;
	}
	
	#span {
		margin-left: 10px;
		display: inline-block;
	}
	
	#code {
		border-radius: 20px;
		width: 300px;
		float: none;
	}
	
	.login {
		width: 80px;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		text-align: center;
		background: #5099FF;
		border-radius: 15px;
	}
	
	.row {
		margin-top: 80px;
	}
	
	.input-group {
		margin: 0 auto;
	}
</style>