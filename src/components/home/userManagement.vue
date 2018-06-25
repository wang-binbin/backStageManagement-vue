<template>
	<div class="Home tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			用户管理
		</div>
		<div class="row">
			<div class="wid">
				<!--搜索手机号或者昵称-->
				<div class="btn-group sousuo">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   							 查询方式 <span class="caret"></span>
 								 </button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="searchPhone" @click="searchPhone">
							<a>查询手机号</a>
						</li>
						<li class="searchNickname" @click="searchNickname">
							<a>查询昵称</a>
						</li>
					</ul>
				</div>

				<div class="input-group">
					<input type="tel" class="form-control" v-model="mobilee" placeholder="搜索用户手机号/或昵称">
				</div>

				<!--按性别查询-->
				<span class="sex">性别:</span>
				<div class="btn-group sexclick">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{changgender=='m'?'男性用户':(changgender=='f'?'女性用户':changgender == ''?'全部用户':'')}}<span class="caret"></span></button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="allgender" @click="changeGender('')">
							<a>全部用户</a>
						</li>
						<li class="genderm" @click="changeGender('m')">
							<a>男性用户</a>
						</li>
						<li class="genderf" @click="changeGender('f')">
							<a>女性用户</a>
						</li>

					</ul>
				</div>
				<!--按审核状态查询-->
				<span class="staTus">审核状态:</span>
				<div class="btn-group staTusclick">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{changStatus=='1001'?'审核通过(未上墙)':(changStatus=='2000'?'审核拒绝':changStatus == '0000'?'等待审核':changStatus == '1000'?'上墙':changStatus == ''?'全部状态':'')}}<span class="caret"></span>
						</button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="allstaTus" @click="changeStatus('')">
							<a>全部状态</a>
						</li>
						<li class="passstaTus" @click="changeStatus('1001')">
							<a>审核通过(未上墙)</a>
						</li>
						<li class="rejectstaTus" @click="changeStatus('2000')">
							<a>审核拒绝</a>
						</li>
						<li class="awaitstaTus" @click="changeStatus('0000')">
							<a>审核等待</a>
						</li>
						<li class="onwall" @click="changeStatus('1000')">
							<a>上墙</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2">
				<thead>
					<tr class="tabhead">
						<th>序号</th>
						<th>昵称</th>
						<th>性别</th>
						<th>手机号</th>
						<th>注册时间</th>
						<th>最后登录时间</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="(items,index) in users" :key="" :data-id="items.id">
						<th>{{index+1}}</th>
						<th class="cursor" @click="Examine(items.id)">{{items.nickName}}</th>
						<th class="red">{{items.gender=='m'?'男':(items.gender=='f'?'女':'')}}</th>
						<th class="cursor" @click="Examine(items.id)">{{items.mobile}}</th>
						<th class="">{{items.regDate}}</th>
						<th class="">{{items.lastGeo.time}}</th>
						<th class="red">{{items.status=='1001'?'审核通过(未上墙)':(items.status=='2000'?'审核拒绝':items.status == '0000'?'等待审核':items.status == '1000'?'上墙':'')}}</th>
						<th>
							<span class="blue" @click="banned">封禁</span>
							<span class="blue look" @click="Examine(items.id)">查看</span>
						</th>
					</tr>
					<p class="nodata" v-show="noData">暂无数据</p>
				</tbody>
			</table>
			<p class="clee"></p>
		</div>
		<div class="paging">

			<v-pagination @change="loadPage" :total="parseInt(totalElements)" :value="parseInt(index)" :show-total="showTotal" show-quick-jumper>
			</v-pagination>
		</div>
		<router-view style=''></router-view>
	</div>
</template>

<script>
	export default {

		name: "Home",
		data() {
			return {
				users: [],
				mobilee: '',
				totalElements: '',
				noData: false,
				searchnickname: '',
				searchphone: '',
				changgender: '',
				changStatus: '',
				index: '1',

			}
		},
		mounted: function() { //开局一个钩子，数据全靠调取
			this.getData(); //执行调取数据的方法
		},
		methods: {
			banned() { //封禁操作
				console.log("你被封了!")
			},
			Examine: function(id) { //查看详情页
				var that = this
				that.$router.push({
					path: '/examine',
					query: {
						examin: id
					}
				})
			},
			changeGender: function(Gen) { //更改性别获取数据
				var that = this
				that.index = 1
				console.log(Gen)
				that.changgender = Gen
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: false,
					data: {
						gender: Gen,
						status: that.changStatus,
						page: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						}else {
						if(result.status == '0000') {

							if(result.data.content[0] == null) {
								that.noData = true
								that.users = []
								that.totalElements = result.data.totalElements
							} else {
								that.mobilee = ''
								that.noData = false
								that.users = result.data.content
								that.totalElements = result.data.totalElements
							}

						} else {
							alert(result.data.msg)
						}}
					}
				})
			},
			changeStatus: function(Sta) { //更改状态获取数据
				var that = this

				that.changStatus = Sta
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: false,
					data: {
						status: Sta,
						gender: that.changgender,
						page: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						}else {
						if(result.status == '0000') {

							that.index = 1
							if(result.data.content[0] == null) {
								that.noData = true
								that.users = []
								that.totalElements = result.data.totalElements
							} else {
								that.mobilee = ''
								that.noData = false
								that.users = result.data.content
								that.totalElements = result.data.totalElements
							}

						}}
					}
				})
			},
			getData: function() { //页面开始刷新第一版数据在上面的mounted调用
				var that = this
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: false,
					data: {
						page: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						that.index = 1
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						}else {
						if(result.status == '0000') {

							if(result.data.content[0] == null) {
								that.noData = true
								that.users = []
								that.totalElements = result.data.totalElements
							} else {
								that.mobilee = ''
								that.noData = false
								that.users = result.data.content
								that.totalElements = result.data.totalElements
							}
						}}
					}
				})
			},
			loadPage(pageIndex) { //分液器获取数据
				var that = this;
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: true,
					data: {
						status: that.changStatus,
						page: pageIndex - 1,
						pageSize: 10,
						gender: that.changgender,
						nickName: that.searchnickname,
						mobile: that.searchphone
					},
					dataType: "json",
					success: function(result) {
						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						}else {
						if(result.status == "0000") {

							that.users = result.data.content
							that.totalElements = result.data.totalElements
						} else {
							alert(result.msg);

						}}
					}
				})
				console.log('请求' + pageIndex + "页");
			},
			showTotal(total) { //显示数据条数
				return `共 ${total} 条`;
			},
			searchPhone: function() { //查询手机号
				let that = this;
				that.index = 1
				that.changStatus = ''
				that.changgender = '' //将组合查询制空，只查询手机号，下面一样只查询昵称
				if(that.mobilee == '') {
					alert("输入不能为空!")
				} else {
					$.ajax({
						type: "post",
						url: "/user/getUsersListByCondition",
						async: true,
						data: {
							mobile: that.mobilee,
							page: 0,
							pageSize: 10,
						},
						dataType: "json",
						success: function(result) {
							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							}else {
							if(result.status == '0000') {

								that.index = 1
								if(result.data.content[0] == null) {
									that.noData = true
									that.users = []
									that.totalElements = result.data.totalElements
								} else {
									that.mobilee = ''
									that.noData = false
									that.users = result.data.content
									that.totalElements = result.data.totalElements
								}
							} else {
								alert(result.msg);
							}}
						}
					})
				}
			},
			searchNickname: function() { //查询昵称
				let that = this;
				that.index = 1
				that.changStatus = ''
				that.changgender = ''
				if(that.mobilee == '') {
					alert("输入不能为空!")
				} else {
					$.ajax({
						type: "post",
						url: "/user/getUsersListByCondition",
						async: true,
						data: {
							nickName: that.mobilee,
							page: 0,
							pageSize: 10,
						},
						dataType: "json",
						success: function(result) {
							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							}else {
							if(result.status == '0000') {

								that.index = 1
								that.mobilee = ''
								if(result.data.content[0] == null) {
									that.noData = true
									that.users = []
									that.totalElements = result.data.totalElements
								} else {

									that.noData = false
									that.users = result.data.content
									that.totalElements = result.data.totalElements
								}
							} else {
								alert(result.msg);
							}}
						}
					})
				}
			},
		},
	}
</script>

<style scoped>
	#conn span {
		color: #fff;
		width: 50px;
		padding: 3px 10px;
		border-radius: 10px;
		list-style: none;
		background: #F28879;
	}
	
	#conn .look {
		background: #7ABFEF;
	}
	
	.selected {
		width: 75px;
		height: 32px;
		border-radius: 3px;
		border-color: #e5e5e5;
	}
	
	.sex,
	.staTus {
		float: left;
		line-height: 72px;
		margin-left: 20px;
	}
	
	.sexclick,
	.staTusclick {
		float: left;
		margin-top: 20px;
		margin-left: 10px;
	}
	
	.usermanagement {
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 20px;
		text-indent: 1.5em;
		margin-top: 50px;
	}
	
	.sousuo {
		margin-top: 20px;
		margin-left: 0;
		background: none;
	}
	
	.table>thead>tr>th {
		border-bottom: none;
	}
	
	.row {
		margin-left: 0;
		margin-right: 0;
		background: #f7f7f7;
		border: 1px solid rgba(229, 229, 229, 1);
		margin-bottom: 30px;
	}
	
	#conn tr {
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	
	.blue {
		cursor: pointer;
	}
	
	.cursor {
		cursor: pointer;
	}
	
	.nodata {
		text-align: center;
	}
	
	#home {
		background: none;
	}
	
	.tabhead {
		background: #f7f7f7;
		color: rgba(145, 145, 145, 1);
		border: 1px solid rgba(229, 229, 229, 1);
	}
	
	.table {
		width: 96%;
		margin: 0 2%;
		background: #fff;
	}
	
	.tab-pane {
		width: 90%;
		background: #fff;
		border-left: none;
	}
	
	.paging {
		width: 96%;
		margin: 0 auto;
		margin-top: 20px;
		background: #f7f7f7;
		color: rgba(145, 145, 145, 1);
		border: 1px solid rgba(229, 229, 229, 1);
		padding: 15px 10px;
	}
</style>