<template>
	<div class="feedback tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			合伙人报名列表
		</div>
		
		<!--表格-->
				<div class="row">
			<div class="wid">
				<!--搜索手机号或者昵称-->
				<div class="btn-group sousuo">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   							 查询方式 <span class="caret"></span>
 								 </button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="searchPhone" @click="searchPhone" data-index = "0">
							<a>查询活动</a>
						</li>
						<li class="searchNickname" @click="searchPhone" data-index = "1">
							<a>查询用户</a>
						</li>
					</ul>
				</div>
					<div class="input-group">
					<input type="tel" class="form-control" v-model="mobilee" placeholder="搜索活动ID或用户ID">
				</div>
							<span class="sex">性别:</span>
				<div class="btn-group sexclick">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{status=='0'?'未中签':(status=='1'?'已中签':status == '2'?'已退款':status=='3'?'已补款':status == '4'?'未补款资格取消':status == ''?'全部状态':'')}}<span class="caret"></span></button>
					<ul class="dropdown-menu" style="min-width: 100px">
						<li class="allgender" @click="changeGender('')">
							<a>全部状态</a>
						</li>
						<li class="genderm" @click="changeGender('0')">
							<a>未中签</a>
						</li>
						<li class="genderf" @click="changeGender('1')">
							<a>已中签</a>
						</li>
							<li class="allgender" @click="changeGender('2')">
							<a>已退款</a>
						</li>
						<li class="genderm" @click="changeGender('3')">
							<a>已补款</a>
						</li>
						<li class="genderf" @click="changeGender('4')">
							<a>未补款资格取消</a>
						</li>

					</ul>
				</div>
				</div>
				</div>
		<div class="biaoge" style="margin-top: 0px;">
			<table class="table table2" style="background: none;">
				<thead>
					<tr class="tabhead">
						<th>序号</th>
						<th>活动ID</th>
						<th>状态</th>
						<th>用户ID</th>

					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="(items,index) in users" :key="" :data-id="items.id">
						<th>{{index+1}}</th>
						<th>{{items.activitiesId}}</th>
						<th >{{items.status=='0'?'未中签':(items.status=='1'?'已中签':items.status == '2'?'已退款':items.status=='3'?'已补款':items.status == '4'?'未补款资格取消':'')}}</th>
						<th >{{items.userId}}</th>
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
mobilee:'',
search:'',
status:'',
			}
		},
		mounted: function() {//页面开始调用
			this.getData();
		},
		methods: {

			getData: function() { //页面开始刷新第一版数据在上面的mounted调用
				var that = this

				$.ajax({
					type: "post",
					url:" /partner/getPartnerRegRecord",
					async: false,
					data: {
						page: 0,
						pageSize: 10,
						status:'',
					},
					dataType: "json",
					success: function(result) {
												console.log(result);	
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
			},
		changeGender: function(Gen) { //更改性别获取数据
				var that = this
	
				console.log(Gen)
				that.status = Gen
				$.ajax({
					type: "post",
					url: "/partner/getPartnerRegRecord",
					async: false,
					data: {
						status: Gen,
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
								that.users = []
								that.totalElements = result.data.totalElements
							} else {
								that.users = result.data.content
								that.totalElements = result.data.totalElements
							}

						} else {
							alert(result.data.msg)
						}}
					}
				})
			},
			loadPage(pageIndex) { //分液器获取数据
				var that = this;
				let data;
				that.index = 1
					if(that.search==1){
					data={
							userId: that.mobilee,
							page:  pageIndex - 1,
							 status: that.status,
							pageSize: 10,
						}
				}else if(that.search==0){
					data={
							activitiesId: that.mobilee,
							page:  pageIndex - 1,
								 status: that.status,
							pageSize: 10,
						}
				}else{
				data={
							page:  pageIndex - 1,
								 status: that.status,
							pageSize: 10,
						}	
				}
				$.ajax({
					type: "post",
					url: "/partner/getPartnerRegRecord",
					async: true,
					data: data,
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
				searchPhone: function(e) { //查询手机号
				let that = this;
				console.log(e.path[1].dataset.index)
				that.index = 1
				let mobile;
				if(e.path[1].dataset.index==1){
					that.search=1
					mobile={
							userId: that.mobilee,
							page: 0,
								 status: that.status,
							pageSize: 10,
						}
				}else if(e.path[1].dataset.index==0){
						that.search=0
					mobile={
							activitiesId: that.mobilee,
							
							 status: that.status,
							page: 0,
							pageSize: 10,
						}
				}
				console.log(mobile)
				if(that.mobilee == '') {
					alert("输入不能为空!")
				} else {
					$.ajax({
						type: "post",
						url: "/partner/getPartnerRegRecord",
						async: true,
						data:mobile,
						dataType: "json",
						success: function(result) {
							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							}else {
							if(result.status == '0000') {

								that.index = 1
								if(result.data.content[0] == null) {
								
									that.users = []
									that.totalElements = result.data.totalElements
								} else {
							
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
