<template>
	<div class="registerPending tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			拒绝原因列表
		</div>
		<div class="new cursor" @click="New">
			<ul>新建</ul>

		</div>
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2" style="background: none;">
				<thead>
					<tr class="tabhead">
						<th>序号</th>
						<th>内容</th>
						<th>推送类型</th>
						<th>创建时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="(items,index) in users" :key="">
						<th>{{index+1}}</th>
						<th>{{items.content}}</th>
						<th>审核拒绝原因</th>
						<th>{{items.createTime}}</th>
						<th>
							 <v-popconfirm class="blue" title="确定删除吗?" @confirm="Delete(items.id)" >
      <a href="javascript:;">删除</a>
  </v-popconfirm>
							<!--<span >删除</span>-->
						</th>
					</tr>
				</tbody>
			</table>
			<p class="clee"></p>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {

		name: "registerPending",
		inject: ["reload"],//注入依赖，用于跳转后刷新页面
		data() {
			return {
				users: [],

			}
		},
		mounted: function() { //进入页面钩子调取
			this.getdata();
		},
		methods: {
			getdata: function() {
				var that = this
				$.ajax({
					type: "post",
					url: "/user/getAllInfoAuditReason",
					async: false,
					data: {

					},
					dataType: "json",
					success: function(result) {
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						}
						if(result.status == '0000') {
							that.users = result.data
						} else {
							alert(result.msg)
						}
					}
				})
			},
			Delete: function(id) {
				var that = this
					$.ajax({
						type: "post",
						url: "/admin/delInfoAuditReason",
						async: false,
						data: {
							reasonId: id
						},
						dataType: "json",
						success: function(result) {
							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							}
							if(result.status == '0000') {

								alert(result.msg)
								that.reload();//跳转后刷新页面
							} else {
								alert(result.msg)
							}
						}
					})

			},
			New: function() {
				var that = this
				that.$router.push({
					path: '/CreateTemplate'

				})
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
	
	.new {
		width: 96%;
		background: #f7f7f7;
		margin: 0 2%;
		padding: 10px 0;
		margin-bottom: 20px;
	}
	
	.new ul {
		width: 80px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background: #4CAE4C;
		border-radius: 5px;
		font-size: 18px;
		color: #fff;
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