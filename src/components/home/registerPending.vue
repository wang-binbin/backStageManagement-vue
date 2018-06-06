<template>
	<div id="home" class="home tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->
		<!--表格-->
		<div class="biaoge" style="margin-top: 30px;">
			<table class="table table2" style="background: none;">
				<thead>
					<tr>
						<th>昵称</th>
						<th>性别</th>
						<th>手机号</th>
						<th>注册时间</th>
						<th>最后登录时间</th>
						<th>状态</th>
						<th>审核信息</th>
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
						<th class="blue">未定义</th>
						<th>
							<span class="blue" @click="banned">封禁</span> |
							<span class="blue">查看</span>
						</th>
					</tr>
					<!--<tr v-show="phoneblock" v-for="item in phone" :key="">
						<th>{{item.nickName}}</th>
						<th class="red">{{item.gender=='m'?'男':(item.gender=='f'?'女':'')}}</th>
						<th>{{item.mobile}}</th>
						<th class="red">查看</th>
						<th class="red">查看</th>
						<th class="red">{{item.status==1?'审核通过':(item.status==2?'审核拒绝':item.status == 0?'未审核':'')}}</th>
						<th class="blue">查看详情</th>
					</tr>-->
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
					lastGeo:{
						time:'201888'
					},
					
				}],
				totalElements: '',
				phone: [],
				phoneblock: false,
				noData: false,

			}
		},
		mounted: function() {
			this.getData();
		},
		methods: {
			banned(){
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
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						//						console.log(result);
						if(result.status == "0000") {
							that.phoneblock = false
							that.noData = false
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

			mobile: function(data) {
				let that = this;
				//				console.log(data.data.user.nickName)
				if(data.data.user == null) {
					that.totalElements = 0
					that.noData = true
					that.users = ''
					that.phoneblock = false
				} else {
					that.totalElements = 1
					that.phone = data.data.user
					that.users = ''
					that.phoneblock = true
					that.noData = false
				}

			},

		},
	}
</script>

<style>
	.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
		border-left:1px solid #ddd ;
		border-top:none;
	}
	.table2 tr{
		border-top:1px solid #ddd ;
		border-bottom:1px solid #ddd ;
	}
	.blue{
		cursor:pointer;
	}
	.nodata {
		text-align: center;
	}
	
	#home {
		background: none;
	}
</style>