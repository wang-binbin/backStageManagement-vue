<template>
	<div class="refuse">
		<div class="refuseReason">
			<div class="tielee">拒绝理由
				<p class="cancel" @click="cancel"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/close.png"/></p>
			</div>
			<div class="refuseReasonOption">
				<v-radio v-for="(item,index) in values" v-model="radio" :label="item.id" >{{item.content}}</v-radio>

			</div>
			<!--<div class="establishTem blue" @click="establishTem">
				
				创建模板
			</div>-->
			<div class="submit " @click="submit">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pass",
		inject: ["reload"],//注入依赖
		data() {
			return {
				radio: '',
				values: []
			}
		},
		mounted: function() { //进入页面钩子调取
			this.getdata();
		},
		methods: {
			getdata:function(){
				var that=this
					$.ajax({
						type: "post",
						url: "/user/getAllInfoAuditReason",
						async: false,
						data: {},
						dataType: "json",
						success: function(result) {
								if (result.msg=='未登录') {
								alert(result.msg)
								that.$router.push('/')
							}	else{
							if(result.status == '0000') {
							
//								console.log(result)
								that.values=result.data
							} else {
								alert(result.msg)
							}}
						}
					})
			},
			cancel: function() {
				var that = this //取消调回原来页面
				that.$router.push('/registerPendinExamine')
			},
			establishTem: function() {
				var that = this //去创建模板
				that.$router.push('/CreateTemplate')
			},
			submit: function() { //跳转拒绝页面
				var that = this
				if(that.radio != '') { //不能为空
					$.ajax({
						type: "post",
						url: "/admin/updateCheckStatus",
						async: false,
						data: {
							userId: that.$route.query.registerPendinExamine,
							status: '2000',
							reasonId: that.radio
						},
						dataType: "json",
						success: function(result) {
								if (result.msg=='未登录') {
								alert(result.msg)
								that.$router.push('/')
							}	else{
							if(result.status == '0000') {
								that.$router.push('/registerPending')
								that.reload();//路由跳转刷新
								that.status = ''
							} else {
								alert(result.msg)
							}}
						}
					})
				} else {
					alert('请选择拒绝理由!')
				}

			},

		},

	}
</script>

<style scoped>
	.tielee {
		text-align: center;
		height: 40px;
		position: relative;
		font-size: 20px;
		line-height: 40px;
		border-bottom: 1px solid #122B40;
	}
	
	.refuse {
		position: fixed;
		z-index: 2;
		width: 100%;
		top: 50px;
		background: rgba(0, 0, 0, 0);
		height: 100%;
	}
	
	.refuseReason {
		width: 442px;
		height: 500px;
		background: #fff;
		    border-radius: 5px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -221px;
		margin-top: -250px;
	}
	
	.refuseReasonOption {
		height: 320px;
		overflow-y: auto;
	}
	
	.cancel {
		cursor: pointer;
		position: absolute;
		    right: 10px;
    top: 13px;
	}
	
	.refuseReasonOption label {
		height: 30px;
		margin-right: 0;
		padding: 0 10px;
		line-height: 30px;
		width: 100%;
		float: left;
	}
	
	.establishTem {
		padding: 0 50px;
		text-align: right;
		margin: 20px;
	}
	
	.submit {
		cursor: pointer;
		width: 150px;
		height: 46px;
		border: 1px solid #888888;
		border-radius: 15px;
		margin: 0 auto;
		margin-top: 50px;
		text-align: center;
		line-height: 46px;
		font-size: 22px;
	}
</style>