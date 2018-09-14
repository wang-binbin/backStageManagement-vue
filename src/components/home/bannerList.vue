<template>
	<div class="feedback tab-pane active">
		<!--<search v-on:PagingData1="PagingData1" v-on:PagingData2="PagingData2" v-on:PagingData3="PagingData3" v-on:mobile="mobile" />-->

		<div class="usermanagement">
			banner列表
		</div>
		<div>
			<table class="table">
				<tbody>
					<tr>
						<th>{{change.id}}</th>
						<th><input placeholder="请输入图片链接" v-model.trim="picUrl"></th>
						<th><input placeholder="请输入下标" v-model.trim="index"></th>
						<th><input placeholder="请输入跳转链接" v-model.trim="toUrl"></th>
						<th><input placeholder="请输入位置" v-model.trim="local"></th>
						<th @click="add" v-bind:hidden="modification">
							<v-button type="success">添加</v-button>
						</th>
						<th v-bind:hidden="!modification" @click="isModification">
								<v-button type="success">更改</v-button>
							</th>
					</tr>
				</tbody>
			</table>
		</div>
		<!--表格-->
		<div class="biaoge" style="margin-top: 0px;clear: both;">
			<table class="table table2 table-hover" style="background: none;">
				<thead>
					<tr class="tabhead">
						<th>序号</th>
						<th>ID</th>
						<th>图片</th>
						<th>下标</th>
						<th>链接</th>
						<th>位置</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="conn">
					<tr v-for="(items,index) in users" :key="" :data-id="items.id" >
						<th>{{index+1}}</th>
						<th>{{items.id}}</th>
						<th><img :src='items.picUrl'></th>
						<th>{{items.index}}</th>
						<th>{{items.toUrl}}</th>
						<th>{{items.local}}</th>
						<th>
							<a @click="mod(items)">修改</a> /
							<v-popconfirm title="确定删除吗?" @confirm="confirm(items.id)" @cancel="cancel">
								<a href="javascript:;">删除</a>
							</v-popconfirm>
						</th>

					</tr>

				</tbody>
			</table>
			<p class="clee"></p>
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
				//				totalElements: '',
				//				index: '1',
				index: '',
				toUrl: '',
				local: '',
				picUrl: '',
				modification: false,
				change: '',
			}
		},
		mounted: function() { //页面开始调用
			this.getData();
		},
		methods: {

			add: function() {
				let that = this
				if(that.index != '' && that.toUrl != '' && that.local != '' && that.picUrl != '') {

					$.ajax({
						type: "post",
						url: "/partner/addBanner",
						async: false,
						data: {
							index: that.index,
							toUrl: that.toUrl,
							local: that.local,
							picUrl: that.picUrl,
						},
						dataType: "json",
						success: function(result) {

							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							} else {
								if(result.status == '0000') {

									that.reload(); //跳转后刷新页面
								} else {
									alert(result.msg)
								}

							}
						}
					})

				} else {
					alert("不能为空!")
				}
			},
			mod: function(e) {
				let that = this
				console.log(e)
				that.change = e
				that.modification = true
				that.index = e.index
				that.toUrl = e.toUrl
				that.local = e.local
				that.picUrl = e.picUrl
			},
			isModification: function() {
				let that = this
				if(that.index != '' && that.toUrl != '' && that.local != '' && that.picUrl != '') {
					$.ajax({
						type: "post",
						url: "/partner/updateBanner",
						async: false,
						data: {
							id: that.change.id,
								index: that.index,
							toUrl: that.toUrl,
							local: that.local,
							picUrl: that.picUrl,
						},
						dataType: "json",
						success: function(result) {
							if(result.msg == '未登录') {
								alert(result.msg)
								that.$router.push('/')
							} else {
								if(result.status == '0000') {
that.modification = false
		that.index = ''
				that.toUrl = ''
				that.local = ''
				that.picUrl = ''
									that.reload(); //跳转后刷新页面
								} else {
									alert(result.msg)
								}
							}
						}
					})
				} else {
					alert("不能为空!")
				}
			},
			confirm: function(e) {
				let that = this
				$.ajax({
					type: "post",
					url: "/partner/deleteBanner",
					async: false,
					data: {
						id: e
					},
					dataType: "json",
					success: function(result) {
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
							if(result.status == '0000') {

								that.reload(); //跳转后刷新页面
							} else {
								alert(result.msg)
							}
						}
					}
				})

			},
			getData: function() { //页面开始刷新第一版数据在上面的mounted调用
				var that = this

				$.ajax({
					type: "post",
					url: "/partner/getBannerList",
					async: false,
					data: {
						//						page: 0,
						//						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
						if(result.msg == '未登录') {
							alert(result.msg)
							that.$router.push('/')
						} else {
							that.users = result.data

						}
					}
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
	
	#conn tr img {
		width: 50px;
		height: 50px;
		margin: 0 auto;
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