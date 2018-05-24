<template>
	<!--分页器-->
	<div style="background: #fff;">
		<v-pagination v-model="value" @change="loadPage" :total=totalElements :show-total="showTotal" show-quick-jumper>
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

			}
		},
		methods: {
			loadPage(pageIndex) { 
				var that = this;
//				console.log(that.checkStatus)
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