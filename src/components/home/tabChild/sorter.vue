<template>
	<!--分页器-->
	<div style="">
		<v-pagination v-show="show"  @change="loadPage" :total="totalElements" :value="1" :show-total="showTotal" show-quick-jumper>
		</v-pagination>
		<v-pagination v-show="show1"  @change="loadPage1" :total="totalElements" :value="2" :show-total="showTotal" show-quick-jumper>
		</v-pagination>
		<v-pagination v-show="show2" @change="loadPage2" :total="totalElements" :value="3" :show-total="showTotal" show-quick-jumper>
		</v-pagination>
		<v-pagination v-show="show3" @change="loadPage3" :total="totalElements" :value="4" :show-total="showTotal" show-quick-jumper>
		</v-pagination>

	</div>
</template>

<script>

	import Vue from 'vue'
	//import css
	import 'vue-beauty/package/style/vue-beauty.min.css'
	//import components
	import vueBeauty from 'vue-beauty'
	Vue.use(vueBeauty)
	export default {
		props: ['totalElements', 'checkStatus'],
		data() {
			return {
				show:true,
				show1:true,
				show2:true,
				show3:true,
			}
		},
		methods: {
			loadPage(pageIndex) { 
				var that = this;
//				console.log(that.value)
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: true,
					data: {
						checkStatus: that.checkStatus,
						page: pageIndex,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
//						console.log(result);
						if(result.status == "0000") {

							that.$emit("PagingData", result)

						} else {
							alert(result.msg);
							//							dconfirm();
						}
					}
				})
				console.log('请求' + pageIndex + "页");
			},
			loadPage1(pageIndex) { 
				var that = this;
//				console.log(that.value)
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: true,
					data: {
						checkStatus: that.checkStatus,
						page: pageIndex,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
//						console.log(result);
						if(result.status == "0000") {

							that.$emit("PagingData", result)

						} else {
							alert(result.msg);
							//							dconfirm();
						}
					}
				})
				console.log('请求' + pageIndex + "页");
			},
			loadPage2(pageIndex) { 
				var that = this;
//				console.log(that.value)
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: true,
					data: {
						checkStatus: that.checkStatus,
						page: pageIndex,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
//						console.log(result);
						if(result.status == "0000") {

							that.$emit("PagingData", result)

						} else {
							alert(result.msg);
							//							dconfirm();
						}
					}
				})
				console.log('请求' + pageIndex + "页");
			},
			loadPage3(pageIndex) { 
				var that = this;
//				console.log(that.value)
				$.ajax({
					type: "post",
					url: "/user/getUsersListByStatus",
					async: true,
					data: {
						checkStatus: that.checkStatus,
						page: pageIndex,
						pageSize: 10
					},
					dataType: "json",
					success: function(result) {
//						console.log(result);
						if(result.status == "0000") {

							that.$emit("PagingData", result)

						} else {
							alert(result.msg);
							//							dconfirm();
						}
					}
				})
				console.log('请求' + pageIndex + "页");
			},
			
			showTotal(total) {
				return `共 ${total} 条`;
			}
		},

	}
</script>

<style>
	.ant-pagination {
		margin-left: 60px;
	}
</style>