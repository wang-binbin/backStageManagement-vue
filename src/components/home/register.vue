<template>
	<div id="home" class="home tab-pane active">

		<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />
		<!--表格-->
		<div class="biaoge" style="background: #fff;">
			<table class="table table2">
				<thead>
					<tr>
						<th>昵称</th>
						<th>性别</th>
						<th>电话</th>
						<!--<th>详情</th>-->
						<th>账户</th>
						<th>邀请</th>
						<th>审核</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="items in users" :key="">
						<th>{{items.nickName}}</th>
						<th class="red">{{items.gender=='m'?'男':(items.gender=='f'?'女':'')}}</th>
						<th>{{items.mobile}}</th>
						<th class="red">查看</th>
						<th class="red">查看</th>
						<th class="red">{{items.infoAudit==1?'审核通过':(items.infoAudit==2?'审核拒绝':items.infoAudit == 0?'未审核':'')}}</th>
						<th class="blue">查看详情</th>
					</tr>
					<tr v-show="phoneblock">
						<th>{{phone.nickName}}</th>
						<th class="red">{{phone.gender=='m'?'男':(phone.gender=='f'?'女':'')}}</th>
						<th>{{phone.mobile}}</th>
						<th class="red">查看</th>
						<th class="red">查看</th>
						<th class="red">{{phone.infoAudit==1?'审核通过':(phone.infoAudit==2?'审核拒绝':phone.infoAudit == 0?'未审核':'')}}</th>
						<th class="blue">查看详情</th>
					</tr>
					<p class="nodata" v-show="noData">暂无数据</p>
				</tbody>
			</table>
			<p class="clee"></p>
		</div>
		<sorter :totalElements="parseInt(totalElements)" :checkStatus="status" :value="1" v-on:PagingData="PagingData" />
		<!--{{checkStatu}}-->
	</div>
</template>

<script>
				$(".ant-pagination li").click(function(){
				$(".activee").css({"background-color":"red!important",
   "border-color":"red!important"})
				alert("s")
})
	//每次刷新默认的请求
	import sorter from './tabChild/sorter'
	import search from './tabChild/search'
	export default {
		data() {
			return {
				users: [{
					nickName:"555",
					mobile:"15201621057",
					infoAudit:0,
					gender:"m",
				},],
				totalElements: "",
				status: 0,
				phone:[],
				phoneblock:false,
				noData:false,
				
			}
		},
		components: {
			sorter,
			search
		},
		computed: {
			isempty: function() { //监测是否有数据
				if($("#conn").children().length == 0) {
					return '暂无数据';
				} else {
					return;
				}
			}
		},
		methods: {
			mobile: function(data) {
				let that = this;
//				console.log(data.data.user.nickName)
				if (data.data.user==null) {
					that.totalElements=0
					that.noData=true
					that.users=''
					that.phoneblock=false
				}else{
				that.totalElements=1	
				that.phone = data.data.user
				that.users=''
				that.phoneblock=true
				that.noData=false
				}
				
				
			},
			PagingData: function(data) {

				let that = this;
				that.phoneblock=false
				that.noData=false
				that.users = data.data.users
				that.totalElements = data.data.totalElements
				that.status = data.data.users[0].infoAudit

			},
			PagingData1: function(data) {

				let that = this;
				that.noData=false
				that.phoneblock=false
				that.users = data.data.users
				that.totalElements = data.data.totalElements
				that.status = data.data.users[0].infoAudit

			},
			PagingData2: function(data) {

				let that = this;
				that.noData=false
				that.phoneblock=false
				that.users = data.data.users
				that.totalElements = data.data.totalElements
				that.status = data.data.users[0].infoAudit

			},
			PagingData3: function(data) {

				let that = this;
				that.noData=false
				that.phoneblock=false
				that.users = data.data.users
				that.totalElements = data.data.totalElements
				that.status = data.data.users[0].infoAudit

			},
		},

		mounted() {
			this.$nextTick(() => {				
				let that = this;
				that.totalElements=50
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: false,
					data: {
						status: that.status,
						page: 1,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						//		console.log(result);
						if(result.status == '0000') {
							//								console.log(result);
							that.users = result.data.users
							that.totalElements = result.data.totalElements
							that.status = result.data.users[0].infoAudit

						}
					}
				})
			})
		},
	}
</script>

<style scoped="scoped">
	.nodata{
		text-align: center;
	}
	/*#home{
		background: blue;
	}*/
</style>