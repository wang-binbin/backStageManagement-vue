<template>
	<div class="CreateTemplate">
		<p class="placeholder"></p>
		<div class="content">
			<p style="font-size: 22px;">
				新建审核拒绝原因
			</p>
			<div class="Vinput">
				拒绝原因:
				<v-input style='width: 400px;float: right;' placeholder="请输入模板!" v-model="value"></v-input>
				<p>推送类型:审核拒绝原因</p>
			</div>
			<div class="save">
				<ul @click="save">
					保存
				</ul>
				<ul @click="cancel">
					取消
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CreateTemplate",
		inject: ["reload"],
		data() {
			return {
				value: ''
			}
		},
		mounted: function() { //进入页面钩子调取
		},
		methods: {
						cancel: function() {
							var that = this //返回上一级
							that.$router.go(-1)
						},
			save: function() {
				var that = this //保存数据库
				console.log(that.value)
				if(that.value != '') {
					$.ajax({
						type: "post",
						url: "/admin/addInfoAuditReason",
						async: false,
						data: {
							content: that.value
						},
						dataType: "json",
						
						success: function(result) {
								 	if (result.msg=='未登录') {
								alert(result.msg)
								that.$router.push('/')
							}else {
							if(result.status == '0000') {
								alert(result.msg)
								
								that.value=''
								that.$router.push('/templateList')
								that.reload();
							} else {
								alert(result.msg)
							}}
						}
					})
					
				} else {
alert('不能为空!')
					

				}
			},
		},

	}
</script>

<style scoped>
	.placeholder {
		height: 52px;
	}
	
	.CreateTemplate {
 position: fixed!important;
		left: 10%;
		width: 90%;
		height: 100%;
		background: #fff;
		top: 0px;
		padding-top: 80px;

    overflow-y: hidden;
	}
	
	.content {
		width: 700px;
		height: 360px;
		margin: 0 auto;
		background: #D5D5D5;
	}
	
	.content p {
		text-align: center;
		margin-bottom: 50px;
		padding-top: 30px;
	}
	
	.Vinput {
		width: 500px;
		margin: 0 auto;
		line-height: 30px;
	}
	
	.save {
		width: 280px;
		margin: 0 auto;
	}
	
	.save ul {
		float: left;
		cursor: pointer;
		width: 100px;
		font-size: 20px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		background: #FB6643;
		margin: 0 auto;
		color: #fff;
		border-radius: 5px;
	}
	
	.save ul:nth-child(2) {
		float: right;
		color: #080808;
		background: #A9A9A9;
	}
</style>