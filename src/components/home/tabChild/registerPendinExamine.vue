<template>
	<div>
	<div class="examine registerPendinExamine">
		<div class="examineCon">
			<div class="tielee">注册审核
				<p class="cancel" @click="cancel">X</p>
			</div>
			<div class="photo">
				<ul>
					<li v-for="items in photoArry" :key=''><img :src="items.pic"></li>
					<li v-for="item in photoArryRedPack" :key=''><img :src="item.redPkgPic">
						<img style="position: absolute;top: 0px;left: 0px;width: 20%;height: 20%;" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/redbao.png" />
					</li>
					<p style="clear: both;"></p>
				</ul>
			</div>
			<div class="particularss">
				<ul>
					<li>昵称:{{nickName}}</li>
					<li>性别:{{gerden=='m'?'男':gerden=='f'?'女':''}}</li>
					<li>年龄:{{age}}</li>
				</ul>
				<ul>
					<li>个人信息</li>
					<li><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/signature.png">个性签名:{{introduction==''?"未填写":introduction}}</li>
					<li><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/industry.png">行业:{{industry==''?"未填写":industry}}</li>
					<li><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/education.png">学历:{{education==''?"未填写":education}}</li>
					<li><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/home.png">常去地点:{{place==''?"未填写":place}}</li>
				</ul>

			</div>
			<div class="presentStatus">
				<ul>
					<li>当前状态:{{status=='1001'?'审核通过(未上墙)':(status=='2000'?'审核拒绝':status == '0000'?'等待审核':status == '1000'?'上墙':'')}}</li>
				</ul>

				<ul class="audit" v-if="status=='0000'">
					<li class="hand" @click="auditPass">审核通过</li>
					<li class="hand" @click="auditRefuse">审核拒绝</li>
					<p style="clear: both;"></p>
				</ul>

			</div>
		</div>

	</div><router-view style=''></router-view></div>
</template>

<script>
	export default {
		name: "registerPendinExamine",
		inject: ["reload"],
		data() {
			return {
				nickName: '',
				gerden: '',
				age: '',
				status: '0000',
				introduction: '',
				industry: '',
				education: '',
				place: '',
				photoArryRedPack: [],
				photoArry: [],
				content: []
			}
		},
		mounted: function() { //进入页面钩子调取
			this.getExamine();
		},
		methods: {
			getExamine: function() {
				var that = this;
				$.ajax({ //通过id拿到详情数据
					type: "post",
					url: "/user/getUserInfo",
					async: false,
					data: {
						userId: that.$route.query.registerPendinExamine
					},
					dataType: "json",
					success: function(result) {
						if(result.status == '0000') {
							that.introduction = result.data.userInfo.introduction
							that.industry = result.data.userInfo.industry
							that.education = result.data.userInfo.education
							that.place = result.data.userInfo.place
							console.log(that.introduction + that.industry)
							that.status = result.data.userInfo.status
							that.nickName = result.data.userInfo.nickName
							that.age = result.data.userInfo.age
							that.gerden = result.data.userInfo.gender
							for(var i = 0; i < result.data.userInfo.mediaList.length; i++) {
								if(result.data.userInfo.mediaList[i].type == 'redPkgPic') {
									$.ajax({ //在oss获取图片如果是红包照片存到photoArryRedPack
										type: "post",
										url: "/admin/getPicURL",
										async: false,
										data: {
											ossRef: result.data.userInfo.mediaList[i].ossRef
										},
										dataType: "json",
										success: function(result) {
											if(result.status == '0000') {
												that.photoArryRedPack.push({
													'redPkgPic': result.data.url
												})
											} else {
												alert(result.msg)
											}
										}
									})
								} else {
									$.ajax({ //在oss获取图片如果不是红包照片photoArryRedPack
										type: "post",
										url: "/admin/getPicURL",
										async: false,
										data: {
											ossRef: result.data.userInfo.mediaList[i].ossRef
										},
										dataType: "json",
										success: function(result) {
											if(result.status == '0000') {
												that.photoArry.push({
													"pic": result.data.url
												})
											} else {
												alert(result.msg)
											}
										}
									})
								}

							}
						} else {
							alert(result.msg)
						}
					}
				})
			},
			cancel: function() {
				var that = this //取消调回原来页面
				that.$router.push('/registerPending')
			},
			auditPass: function() {//跳转通过页面
				var that = this
				that.$router.push({
					path: '/pass',
					query: {
						registerPendinExamine: that.$route.query.registerPendinExamine
					}
				})
//				var that = this
//				$.ajax({ //审核通过
//					type: "post",
//					url: "/admin/updateCheckStatus",
//					async: false,
//					data: {
//						userId: that.$route.query.registerPendinExamine,
//						status: '1000'
//					},
//					dataType: "json",
//					success: function(result) {
//						if(result.status == '0000') {
//							that.$router.push('/userManagement')
//							that.reload();
//						} else {
//							alert(result.msg)
//						}
//					}
//				})
			},
			auditRefuse: function() {//跳转拒绝页面
				var that = this
				that.$router.push({
					path: '/refuse',
					query: {
						registerPendinExamine: that.$route.query.registerPendinExamine
					}
				})
//				$.ajax({ 
//					type: "post",
//					url: "/admin/updateCheckStatus",
//					async: false,
//					data: {
//						userId: that.$route.query.examin,
//						status: '1000'
//					},
//					dataType: "json",
//					success: function(result) {
//						if(result.status == '0000') {
//							that.$router.push('/userManagement')
//							that.reload();
//						} else {
//							alert(result.msg)
//						}
//					}
//				})
			},
		},
	}
</script>

<style scoped>
	.hand {
		cursor: pointer;
	}
	
	.audit {
		margin-top: 50px;
	}
	
	.audit li {
		float: left;
		width: 150px;
		border: 1px solid #9D9D9D;
		text-align: center;
	}
	
	.audit li:nth-child(1) {
		margin-left: 234px;
		margin-right: 50px;
	}
	
	.presentStatus {
		clear: both;
		text-align: center;
		font-size: 24px;
	}
	
	.particularss img {
		width: 25px;
		margin-right: 10px;
		height: 25px;
		float: left;
	}
	
	.particularss ul li {
		clear: both;
		line-height: 30px;
	}
	
	.particularss ul:nth-child(2) {
		margin-top: 60px;
	}
	
	.particularss {
		float: right;
		margin-top: 50px;
		width: 225px;
	}
	
	.photo ul li {
		width: 160px;
		height: 160px;
		position: relative;
		float: left;
		margin-top: 20px;
	}
	
	.photo ul li img {
		width: 100%;
		height: 100%;
	}
	
	.photo ul li:nth-child(2) {
		margin: 20px 25px 0 25px;
	}
	
	.photo ul li:nth-child(5) {
		margin: 20px 25px 0 25px;
	}
	
	.photo {
		float: left;
		width: 530px;
		/*height: 340px;*/
		margin-left: 30px;
	}
	
	.tielee {
		position: relative;
		padding-left: 20px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		border-bottom: 1px solid #5E5E5E;
	}
	
	.cancel {
		cursor: pointer;
		font-size: 26px;
		width: 60px;
		text-align: center;
		font-weight: bold;
		color: #000;
		position: absolute;
		right: 0px;
		top: 0;
	}
	
	.examine {
		position: fixed;
		width: 100%;
		top: 0;
		background: rgba(0, 0, 0, 0.3);
		height: 100%;
	}
	
	.examineCon {
		position: fixed;
		left: 50%;
		top: 7%;
		margin-left: -415px;
		width: 830px;
		height: 570px;
		background: #F5F5F5;
		border: 1px solid #5E5E5E;
	}
</style>