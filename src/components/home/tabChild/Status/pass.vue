<template>
	<div class="pass">
		<div class="conn">
			<ul class="titlle">
				<li>选择上墙</li>
				<li>该用户是否可以上墙？</li>
			</ul>
			
			<ul class="wall">
				<li @click="onwall">上墻</li>
				<li @click="downframe">不上墻</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pass",
		inject: ["reload"],
		data() {
			return {
	
			}
		},
		mounted: function() { //进入页面钩子调取
		},
		methods: {
			onwall: function() {//上墙
				var that = this
				$.ajax({ 
					type: "post",
					url: "/admin/updateCheckStatus",
					async: false,
					data: {
						userId: that.$route.query.registerPendinExamine,
						status: '1000'
					},
					dataType: "json",
					success: function(result) {
							if (result.msg=='未登录') {
								alert(result.msg)
								that.$router.push('/')
							}
						if(result.status == '0000') {
							that.$router.push('/registerPending')
							that.reload();
							that.status=''
						} else {
							alert(result.msg)
						}
					}
				})
			},
			downframe: function() {//不上墙
				var that = this
				$.ajax({ 
					type: "post",
					url: "/admin/updateCheckStatus",
					async: false,
					data: {
						userId: that.$route.query.registerPendinExamine,
						status: '1001'
					},
					dataType: "json",
					success: function(result) {
							if (result.msg=='未登录') {
								alert(result.msg)
								that.$router.push('/')
							}	else{
						if(result.status == '0000') {
							that.$router.push('/registerPending')
							that.reload();
							that.status=''
						} else {
							alert(result.msg)
						}}
					}
				})
			},
		},
	}
</script>

<style >
	.pass {
		position: fixed;
		width: 100%;z-index: 2;
		top: 50px;
		background: rgba(0, 0, 0, 0);
		height: 100%;
	}
	.conn{
		width: 365px;
		height: 210px;
		background: #fff;
		    border-radius: 5px;
		position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -180px;
    margin-top: -110px;

	}
	.titlle li{
		text-align: center;
		line-height: 30px;
		font-size: 20px;
	}
	.titlle li:nth-child(2){
		margin: 40px auto;
	}
	.wall li{
		width: 90px;
		height: 35px;
		border-radius: 10px;
		float: left;
		text-align: center;
		line-height: 35px;
		border: 1px solid #C0C0C0;		
		margin-left: 30px;
		
		margin-top: 20px;
	}
	.wall li:nth-child(1){
		border: none;
			background: #1ACBFC;
	margin-left:80px ;	
	}
</style>