<template>
	<div class="feedback tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			意见反馈
		</div>
		
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2" style="background: none;">
				<thead>
					<tr class="tabhead">
						<th>序号</th>
						<th>内容</th>
						<th>反馈时间</th>
					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="(items,index) in users" :key="" :data-id="items.id">
						<th>{{index+1}}</th>
						<th class="cursor" @click="examine(items)">{{items.content}}</th>
						<th >{{items.reportTime}}</th>
					</tr>
					
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
inject: ["reload"],
		name: "feedback",
		data() {
			return {
				users: [],
				totalElements: '',
				index: '1',


			}
		},
		mounted: function() {
			this.getData();
		},
		methods: {
			examine: function(data) {
				var that = this
				that.$router.push({
					path: '/feedbackcontent',
					query: {
						data: data
					}
				})
			},
			getData: function() { //页面开始刷新第一版数据在上面的mounted调用
				var that = this

				$.ajax({
					type: "get",
					url:"/user/getUserReportList",
					async: false,
					data: {
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
									that.users = []
									that.totalElements = result.data.totalElements
								} else {
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
					type: "get",
					url: "/user/getUserReportList",
					async: true,
					data: {
						page: pageIndex - 1,
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
