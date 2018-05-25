<template>
  <div class="hello">
  			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand"  style="margin-left: 0!important;">
							<img alt="Brand" src="https://maggie-public.oss-cn-beijing.aliyuncs.com/official/logo.png">
						</a>

					</div>
					<div class="title">
						<ul>
							麦苗iMaggie后台管理系统V1.0
						</ul>
						<ul class="user">
							<li>{{msg}}</li>
							<li>退出</li>
						</ul>
					</div>
				</div>

			</nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '15201621057'
    }
  }
}
</script>

<style scoped>
	.navbar{
		border: none;
		margin-bottom: 2px;
	}

</style>
