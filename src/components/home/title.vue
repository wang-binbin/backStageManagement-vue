<template>
  <div class="tab hello">
  			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand"  style="margin-left: 0!important;">
							<img alt="Brand" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/backStageManagement/logo.png">
						</a>
	<ul class="title">
							<li>欢迎，管理员&nbsp;&nbsp;&nbsp;{{msg}}</li>
							<li class="blue tui" @click="quit">退出</li>
						</ul>
					</div>
				</div>

			</nav>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
			quit:function(){
				var that=this
				that.$router.push('/')
							
			},
			}
}
</script>

<style scoped>

	.hello{
		position: fixed;
	 width: 100%;
	 z-index: 5;
	}
	.navbar-header{
		width: 100%;
	}
	.navbar{
		border: none;
		border-radius: 0;
		margin-bottom: 2px;
		background: #FFEA47;
	}
	
.title{
	float: right;
	color: #fff;
	margin-right: 30px;
}
.title li{
	color: rgba(0,0,0,1);
	float: left;
	margin-right: 20px;
}
.title	.tui{
		color: rgba(1,51,255,0.59);
	}
</style>
