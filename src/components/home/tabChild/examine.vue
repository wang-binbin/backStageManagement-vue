<template>
	<div class="examine">
		<div class="examineCon">
		<div class="tielee">用户信息
		<p class="cancel" @click="cancel">X</p>
		</div>
			<div class="photo">
			<ul>
				<li v-for="item in photoArry" :key='' ><img :src="item"></li>
			</ul>
			</div>
			<div class="particularss">
				<ul>
					<li>昵称:{{nickName}}</li>
					<li>性别:{{gerden}}</li>
					<li>年龄:{{age}}</li>
				</ul>
				<ul >
					<li>个人信息</li>
					<li><img src="../../../../build/logo.png">个性签名:{{introduction}}</li>
					<li><img src="../../../../build/logo.png">行业:{{industry}}</li>
					<li><img src="../../../../build/logo.png">学历:{{education}}</li>
					<li><img src="../../../../build/logo.png">常去地点:{{place}}</li>
					
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "examine",
//		props: ["examinEE"],
		data() {
			return {
				nickName:'',
				gerden:'',
				age:'',
				introduction:'',
				industry:'',
				education:'',
				place:'',
				photoArry:[],
				content:[]
			}
		},
		mounted: function() {
			this.getExamine();
		},
		methods: {
			getExamine: function() {
				
				var that = this;
				that.introduction="ssss"
				console.log(that.$route.query.examin)
				$.ajax({ //通过id拿到详情数据
					type: "post",
					url: "/user/getUserInfo",
					async: false,
					data: {
						userId:that.$route.query.examin
					},
					dataType: "json",
					success: function(result) {
						if(result.status == '0000') {
							that.introduction=result.data.userInfo.introduction
							that.industry=result.data.userInfo.industry
							that.education=result.data.userInfo.education
							that.place=result.data.userInfo.place
							that.nickName=result.data.userInfo.nickName
							that.age=result.data.userInfo.age
							if (result.data.userInfo.gender=='m') {
								that.gerden='男'
							} else if(result.data.userInfo.gender=='f'){
								that.gerden='女'
							}
							for(var i = 0; i < result.data.userInfo.mediaList.length; i++) {
							$.ajax({
									type: "post",
									url: "/admin/getPicURL",
									async: false,
									data: {
										ossRef:result.data.userInfo.mediaList[i].ossRef
									},
									dataType: "json",
									success: function(result) {
									console.log(result.data.url);
										if(result.status == '0000') {
										that.photoArry.push(result.data.url)
										} else {
										alert(result.msg)
										}
									}
								})
							}
						} else {
							alert(result.msg)
						}
					}
				})
			},
			cancel:function(){
				var that=this
				that.$router.push('/userManagement')
			}
		},
	}
</script>

<style >
	.particularss img{
		width: 25px;
		height: 25px;
		float: left;
	}
	.particularss ul li{
		clear: both;
		line-height: 30px;
	}
	.particularss ul:nth-child(2){
		margin-top: 60px;
	}
	.particularss{
		
		float: right;
		margin-top: 50px;
		width: 225px;
	}
	.photo ul li{
		width: 160px;
		height: 160px;
		float: left;
		margin-top: 20px;
	}
	.photo ul li img{
		width: 100%;
		height: 100%;
	}
	.photo ul li:nth-child(2) {
		margin: 20px 25px 0 25px;
	}
	.photo ul li:nth-child(5) {
		margin: 20px 25px 0 25px;
	}
	.photo{
		float: left;
		width: 530px;
		height: 340px;
		margin-left: 30px ;
	}
	.cancel{
		cursor:pointer;
		font-size: 26px;
		width: 60px;
		text-align: center;
		font-weight: bold;
		color: #000;
		position: absolute;
		right: 0px;
		top: 0;
	}
	.tielee{
		position: relative;
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		border-bottom: 1px solid #5E5E5E;
	}
	.examine {
		position: fixed;
		z-index: 2;
		width: 100%;
		top: 0;
		background: rgba(0,0,0,0.3);
		height: 100%;
	}
	
	.examineCon {
		position: fixed;
		left: 50%;
		top: 5%;
		margin-left: -415px;
		width: 830px;
		height: 560px;
		background: #F5F5F5;
		border: 1px solid #5E5E5E;
	}
</style>