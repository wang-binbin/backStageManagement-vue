<template>
	<div id="home" class="home tab-pane active">
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
						<li class="searchNickname"  @click="searchNickname">
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
    						性别 <span class="caret"></span></button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="allgender">
							<a>全部状态</a>
						</li>
						<li class="genderm">
							<a>男性用户</a>
						</li>
						<li class="genderf">
							<a>女性用户</a>
						</li>
						
					</ul>
				</div>
				<!--<select class="selected" v-model="selected">
					<option v-for="item in items" v-bind:value="item.value">{{item.text}}</option>
				</select>
				<span>已选:{{selected}}</span>-->
				<!--按审核状态查询-->
				<span class="staTus">审核状态:</span>
				<div class="btn-group staTusclick">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						 审核状态 <span class="caret"></span>
						</button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="allstaTus">
							<a>全部状态</a>
						</li>
						<li class="passstaTus">
							<a>审核通过</a>
						</li>
						<li class="rejectstaTus">
							<a>审核拒绝</a>
						</li>
						<li class="awaitstaTus">
							<a>审核等待</a>
						</li>
						<li class="onwall">
							<a>上墙</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2" style="background: none;">
				<thead>
					<tr>
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
					<tr v-for="items in users" :key="" :data-id="items.id">
						<th>{{items.nickName}}</th>
						<th class="red">{{items.gender=='m'?'男':(items.gender=='f'?'女':'')}}</th>
						<th>{{items.mobile}}</th>
						<th class="red">{{items.regDate}}</th>
						<th class="red">{{items.lastGeo.time}}</th>
						<th class="red">{{items.status==1?'审核通过':(items.status==2?'审核拒绝':items.status == 0?'未审核':'')}}</th>
						<th>
							<span class="blue" @click="banned">封禁</span> 
							<span class="blue look">查看</span>
						</th>
					</tr>
					<p class="nodata" v-show="noData">暂无数据</p>
				</tbody>
			</table>
			<p class="clee"></p>
		</div>

		<v-pagination @change="loadPage" :total="parseInt(totalElements)" :value="1" :show-total="showTotal" show-quick-jumper>
		</v-pagination>
	</div>
</template>

<script>
	export default {
		//		props:["paging","userss"],
		name: "home",
		data() {
			return {
				users: [{
					nickName: 'zik',
					mobile: '15892333333',
					status: '0',
					gender: 'm',

					regDate: '21018',
					lastGeo: {
						time: '201888'
					},

				}],
				mobilee: '',
				totalElements: '',
				phone: [],
				phoneblock: false,
				noData: false,
				items: [{
					text: '男',
					value: 'm'
				}, {
					text: '女',
					value: 'f'
				}],
				selected: '',
				searchnickname:'',
				searchphone:''

			}
		},
		mounted: function() {
			this.getData();
		},
		methods: {
			banned() {
				console.log("你被封了!")
			},
			getData: function() {
				var that = this
				//				that.users = "{nickName: 'zik',mobile: '15892333333',status: '0',gender: 'm'}";
				//				that.totalElements =1
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: 0,
						page: 1,
						infoCheckStatus: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						console.log(result);
						if(result.status == '0000') {
							that.users = result.data.users
							that.totalElements = result.data.totalElements

						}
					}
				})
			},
			loadPage(pageIndex) {
				var that = this;
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: true,
					data: {
						status: that.checkStatus,
						page: pageIndex,
						pageSize: 10,
						nickName:that.searchnickname,
						mobile:that.searchphone
					},
					dataType: "json",
					success: function(result) {
						//						console.log(result);
						if(result.status == "0000") {
							that.users = result.data.users
							that.totalElements = result.data.totalElements

						} else {
							alert(result.msg);

						}
					}
				})
				console.log('请求' + pageIndex + "页");
				console.log(screen1);
			},
			showTotal(total) {
				return `共 ${total} 条`;
			},
			searchPhone: function() {
				let that = this;
				if(that.mobilee == '') {
					alert("输入不能为空!")
				} else {
					$.ajax({
						type: "post",
						url: "/user/findUserByMobile",
						async: true,
						data: {
							mobile: that.mobilee
						},
						dataType: "json",
						success: function(result) {
							if(result.status == '0000') {
								that.mobilee = ''
						that.phoneblock = true
							that.noData = false
							that.phone = result.data.users
							that.totalElements = 1
							} else {
								alert(result.msg);
							}
						}
					})
				}
			},
			searchNickname: function() {
				let that = this;
				if(that.mobilee == '') {
					alert("输入不能为空!")
				} else {
					$.ajax({
						type: "post",
						url: "/user/findUserByMobile",
						async: true,
						data: {
							nickName: that.mobilee
						},
						dataType: "json",
						success: function(result) {
							if(result.status == '0000') {

							} else {
								alert(result.msg);
							}
						}
					})
				}
			},
		},
	}
</script>

<style>
	#conn span{
		padding: 6px 11px;
    color: #fff;
    border-radius: 10px;
    background: #fb6643;
	}
	#conn .look{
		background: #50a8f9;
	}
	.selected{
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
		margin-left: 20px;
	}
	
	.usermanagement {
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 20px;
		text-indent: 1.5em;
		border-top: 1px solid #c5c4c5;
		border-bottom: 1px solid #c5c4c5;
	}
	
	.sousuo {
		margin-top: 20px;
		margin-left: 0;
		background: none;
	}
	
	.row {
		margin-left: 0;
		margin-right: 0;
	}
	
	.btn-group {}
	
	.table>tbody>tr>td,
	.table>tbody>tr>th,
	.table>tfoot>tr>td,
	.table>tfoot>tr>th,
	.table>thead>tr>td,
	.table>thead>tr>th {
		border-left: 1px solid #ddd;
		border-top: none;
	}
	
	.table2 tr {
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	
	.blue {
		cursor: pointer;
	}
	
	.nodata {
		text-align: center;
	}
	
	#home {
		background: none;
	}
</style>