<template>
	<div class="registerPending tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			注册待审
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
				<span class="sex">按时间排列:</span>
				<div class="btn-group sexclick">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{sortDirection=='ASC'?'按时间升序':sortDirection=='DESC'?'按时间降序':''}}<span class="caret"></span></button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="genderm" @click="changeGender('ASC')">
							<a>按时间升序</a>
						</li>
						<li class="genderf" @click="changeGender('DESC')">
							<a>按时间降序</a>
						</li>

					</ul>
				</div>

			</div>
		</div>
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2" style="background: none;">
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

		name: "registerPending",
		data() {
			return {
				users: [],
				mobilee: '',
				totalElements: '',
				noData: false,
				index: '1',
				sortDirection: 'ASC',
				Status: '',
				infoCheckStatus: '1'

			}
		},
		mounted: function() {//页面开始调用
			this.getData();
		},
		methods: {
			Examine: function(id) {
				var that = this
				that.$router.push({
					path: '/registerPendinExamine',
					query: {
						registerPendinExamine: id
					}
				})
			},
			changeGender: function(sort) { //按时间排序
				var that = this
				that.index = 1
				that.Status = '0000'
				that.infoCheckStatus = '1'
				console.log(sort)
				that.sortDirection = sort
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: false,
					data: {
						status: that.Status,
						infoCheckStatus: that.infoCheckStatus,
						sortDirection: sort,
						page: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
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
							}
						}
					}
				})
			},
			getData: function() { //页面开始刷新第一版数据在上面的mounted调用
				var that = this
				that.Status = '0000'
				that.infoCheckStatus = '1'
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: false,
					data: {
						status: that.Status,
						infoCheckStatus: that.infoCheckStatus,
						sortDirection: that.sortDirection,
						page: 0,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						//						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
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
							}
						}
					}
				})
			},
			loadPage(pageIndex) { //分液器获取数据
				var that = this;
				that.index = 1
				$.ajax({
					type: "post",
					url: "/user/getUsersListByCondition",
					async: true,
					data: {
						status: that.Status,
						infoCheckStatus: that.infoCheckStatus,
						page: pageIndex - 1,
						mobile: that.mobilee,
						nickName: that.mobilee,
						sortDirection: that.sortDirection,
						pageSize: 10,
					},
					dataType: "json",
					success: function(result) {
						//						console.log(result);
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
							if(result.status == "0000") {

								that.users = result.data.content
								that.totalElements = result.data.totalElements
							} else {
								alert(result.msg);

							}
						}
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
				that.Status = ''
				that.infoCheckStatus = ''
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
							} else {
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
									alert(result.msg);
								}
							}
						}
					})
				}
			},
			searchNickname: function() { //查询昵称
				let that = this;
				that.index = 1
				that.Status = ''
				that.infoCheckStatus = ''
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
							} else {
								if(result.status == '0000') {

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
								}
							}
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
		padding: 3px 10px;
		width: 50px;
		border-radius: 10px;
		list-style: none;
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
	
	.table>thead>tr>th {
		border-bottom: none;
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