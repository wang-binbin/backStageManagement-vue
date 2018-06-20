<template>
	<div class="CreateTemplate">
		<p class="placeholder"></p>
		<div class="content">
			<p style="font-size: 22px;">
				意见反馈
			</p>
			<div class="Vinput">
				<ul>
					<li>内容:</li>
					<li>{{data.content}}</li>
					<li  style="clear:both;margin-bottom: 50px;"></li>
					
				</ul>
<li  style="clear:both;list-style: none;"></li>
			</div>
			<div class="save">
				<ul @click="cancel">
					确定
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
				data: ''
			}
		},
		mounted: function() { //进入页面钩子调取
			this.getdata();
		},
		methods: {
			cancel: function() {
				var that = this //返回上一级
				that.$router.go(-1)
			},
			getdata:function(){
				var that = this
				
				that.data=that.$route.query.data
				console.log(that.$route.query.data)
				console.log(that.data.content)
			},
		},

	}
</script>

<style scoped>
	.placeholder {
		height: 52px;
	}
	
	.CreateTemplate {
		position: absolute;
		left: 10%;
		width: 90%;
		height: 100%;
		background: #fff;
		top: 0px;
		padding-top: 80px;
		/*background: #f5f1f5;*/
	}
	
	.content {
		width: 700px;
		height: 360px;
		margin: 0 auto;
		background: #f3f1f1;
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

	.Vinput ul li{
		float: left;
text-align: right;
width: 100px;
	}
	.Vinput ul li:nth-child(2){
		width: 400px;
		word-wrap: break-word;
		height: 90px;
		overflow-y: auto;
		text-align: left;
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