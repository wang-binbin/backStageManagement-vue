<template>
	<div>
		<div class="examine registerPendinExamine">
			<div class="examineCon">
				<div class="tielee">资料审核
					<p class="cancel" @click="cancel"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/close.png" /></p>
				</div>
				<div class="photo">
					<ul>
						<li v-for="item1 in photoArry" :key=''>
							<img :src="item1.pic">
							<img v-show="item1.isNew" style="position: absolute;top: 0px;right: 0px;width:15%;height: 8%;" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/new.png" />
						</li>
						<li v-for="item2 in photoArryRedPack" :key=''><img :src="item2.redPkgPic">
							<img style="position: absolute;top: 0px;left: 0px;width: 15%;height: 8%;" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/redbao.png" />
							<img v-show="item2.isNew" style="position: absolute;top: 0px;right: 0px;width: 15%;height: 8%;" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/new.png" />

						</li>
						<p style="clear: both;"></p>
					</ul>
				</div>
				<div class="particularss">
					<ul>
						<li :class="{ active: isActive }">昵称:{{nickName}}</li>
						<li :class="{ active: isActive0 }">性别:{{gerden=='m'?'男':gerden=='f'?'女':''}}</li>
						<li :class="{ active: isActive1 }">年龄:{{age}}</li>
					</ul>
					<ul>
						<li style="font-size: 20px;">个人信息</li>
						<li :class="{ active: isActive2,signature:signature}"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/signature.png">个性签名:{{introduction==''?"未填写":introduction==null?"未填写":introduction}}</li>
						<li :class="{ active: isActive3 }"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/industry.png">行业:{{industry==''?"未填写":industry==null?"未填写":industry}}</li>
						<li :class="{ active: isActive4 }"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/education.png">学历:{{education==''?"未填写":education==null?"未填写":education}}</li>
						<li :class="{ active: isActive5 }"><img src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/home.png">常去地点:{{place==''?"未填写":place==null?"未填写":place}}</li>
					</ul>

				</div>
				<div class="presentStatus">
					<ul>
						<li>当前状态:{{status=='1'?'审核通过(未上墙)':(status=='2'?'审核拒绝':status == '0'?'等待审核':'')}}</li>
					</ul>

					<ul class="audit" v-if="status=='0'">
						
						<li class="hand" @click="auditRefuse">审核拒绝</li>
						<li class="hand " @click="auditPass">审核通过</li>
						
						<p style="clear: both;"></p>
					</ul>

				</div>
			</div>

		</div>
		<router-view style=''></router-view>
	</div>
</template>

<script>
	export default {
		name: "registerPendinExamine",
		inject: ["reload"],
		data() {
			return {
				signature: true,
				isActive: false,
				isActive0: false,
				isActive1: false,
				isActive2: false,
				isActive3: false,
				isActive4: false,
				isActive5: false,
				nickName: '',
				gerden: '',
				age: '',
				status: '',
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
			getExamine: function() { //通过id拿到详情数据
				var that = this;
				that.userData = that.$route.query.userData;
				that.introduction = that.userData.userInfoApply.introduction
				that.industry = that.userData.userInfoApply.industry
				that.education = that.userData.userInfoApply.education
				that.place = that.userData.userInfoApply.place
				that.status = that.userData.userInfoApply.status
				that.nickName = that.userData.userInfoApply.nickName
				that.age = that.userData.userInfoApply.age
				that.gerden = that.userData.userInfoApply.gender
				if(that.userData.userInfoApply.introduction != that.userData.user.introduction) {
					that.isActive2 = true
				}
				if(that.userData.userInfoApply.industry != that.userData.user.industry) {
					that.isActive3 = true
				}
				if(that.userData.userInfoApply.education != that.userData.user.education) {
					that.isActive4 = true
				}
				if(that.userData.userInfoApply.place != that.userData.user.place) {
					that.isActive5 = true
				}
				if(that.userData.userInfoApply.nickName != that.userData.user.nickName) {
					that.isActive = true
				}
				if(that.userData.userInfoApply.gender != that.userData.user.gender) {
					that.isActive0 = true
				}
				if(that.userData.userInfoApply.age != that.userData.user.age) {
					that.isActive1 = true
				}

				for(var i = 0; i < that.userData.userInfoApply.mediaList.length; i++) {
					var flag = false;
					for(var j = 0; j < that.userData.user.mediaList.length; j++) {
						if(that.userData.userInfoApply.mediaList[i].ossRef != that.userData.user.mediaList[j].ossRef) {
							flag = true;

						} else {
							flag = false;
							break;

						}
					}
					if(that.userData.userInfoApply.mediaList[i].type == 'redPkgPic') {
						$.ajax({ //在oss获取图片如果是红包照片存到photoArryRedPack
							type: "post",
							url: "/admin/getPicURL",
							async: false,
							data: {
								ossRef: that.userData.userInfoApply.mediaList[i].ossRef
							},
							dataType: "json",
							success: function(result) {
								if(result.status == '0000') {
									that.photoArryRedPack.push({
										'redPkgPic': result.data.url,
										'isNew': flag
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
								ossRef: that.userData.userInfoApply.mediaList[i].ossRef
							},
							dataType: "json",
							success: function(result) {
								if(result.status == '0000') {
									that.photoArry.push({
										"pic": result.data.url,
										'isNew': flag
									})
									
								} else {
									alert(result.msg)
								}
							}
						})
					}

				}
			},
			cancel: function() {
				var that = this //取消调回原来页面
				that.$router.push('/InformationPending')

			},
			auditPass: function() { //跳转通过页面
				var that = this

				$.ajax({
					type: "post",
					url: "/admin/auditUserInfoApply",
					async: false,
					data: {
						userId: that.userData.userInfoApply.id,
						status: '1'
					},
					dataType: "json",
					success: function(result) {
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
						if(result.status == '0000') {
							$.ajax({
								type: "post",
								url: "/user/getUserInfo",
								async: false,
								data: {
									userId: that.userData.userInfoApply.id
								},
								dataType: "json",
								success: function(result) {
									if(result.status == '0000') {
										console.log(result.data.userInfo.status)
										if(result.data.userInfo.status == '1001') {
											that.$router.push({
												path: '/passI',
												query: {
													registerPendinExamine: that.userData.userInfoApply.id
												}
											})
										} else if(result.data.userInfo.status == '1000') {
											that.$router.push('/InformationPending')
											that.reload();
								that.status = ''
										}

									} else {
										alert(result.msg)
									}
								}
							})
						} else {
							alert(result.msg)
						}}
					}
				})

			},

			auditRefuse: function() { //跳转拒绝页面
				var that = this
				console.log(that.userData)
				console.log(that.userData.userInfoApply.id)
				that.$router.push({
					path: '/refuseI',
					query: {
						registerPendinExamine: that.userData.userInfoApply.id
					}
				})
			},
		},
	}
</script>

<style scoped>
	.active {
		color: greenyellow;
	}
	
	.hand {
		cursor: pointer;
	}
	
	.audit {
		margin-top: 50px;
	}
	
	.audit li {
		float: left;
		width: 150px;
		background: #7ABFEF ;
		text-align: center;
		border-radius: 5px;
	}
	
	.audit li:nth-child(1) {
		margin-left: 234px;
		margin-right: 50px;
		background: #F28879 ;
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
		/*margin-top: 60px;*/
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
		height: 50px;
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
	
	.cancel img {
		width: 50%;
		margin-left: 15px;
		margin-top: 10px;
	}
	
	.examine {
		position: fixed;
		z-index: 2;
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
	
	.signature {
		overflow-y: auto;
		height: 90px;
	}
</style>