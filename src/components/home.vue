<template>
	<div class="homepage">
		<Title/>
		<div class="content">
			<div id="jquery-accordion-menu" class="jquery-accordion-menu red">
				<!--<div class="jquery-accordion-menu-header" id="form"></div>-->
				<ul id="demo-list">
					<li class="active">
						<router-link  to="/userManagement"><v-icon type="user"></v-icon>用户管理</router-link>
					</li>
					<li>
						<a href="#home"><v-icon type="bars"></v-icon>审核管理</a>
						<ul class="submenu">

							<li>
								<router-link to="/registerPending">注册待审</router-link>
							</li>
							<li>
								<router-link to="/InformationPending">资料待审</router-link>
							</li>
							<!--<li><a href="#">Design </a>
						<ul class="submenu">
							<li><a href="#">Graphics </a></li>
							<li><a href="#">Vectors </a></li>
							<li><a href="#">Photoshop </a></li>
							<li><a href="#">Fonts </a></li>
						</ul>
					</li>-->
		
						</ul>
					</li>
					<li>
						<a href="#home"><v-icon type="message"></v-icon>消息推送</a>
						<ul class="submenu">
							<li>
								<router-link to="/templateList">拒绝模板</router-link>
							</li>
							<li>
								<router-link to="/feedback">意见反馈</router-link>
							</li>
							<li>
								<router-link to="/messageList">合伙人活动列表</router-link>
							</li>
							<li>
								<router-link to="/bidList">出价列表</router-link>
							</li>
								<li>
								<router-link to="/userjoin">合伙人报名列表</router-link>
							</li>
									<li>
								<router-link to="/bannerList">banner列表</router-link>
							</li>
						</ul>
					</li>
				</ul>

			</div>
		</div>
		<router-view style='margin-left: 10%;'></router-view>
	</div>
</template>

<script>
	import $ from 'jquery'

	import '../assets/css/jquery-accordion-menu.css'
	import '../assets/js/jquery-accordion-menu.js'
	import Title from './home/title'
	export default {
		inject: ["reload"],
		name: "homepage",
		components: {
			Title
		},
		data() {
			return {

			}
		},
		mounted: function() {

			this.go()

		},
		methods: {
			go: function() {
				jQuery(document).ready(function() {
					jQuery("#jquery-accordion-menu").jqueryAccordionMenu();

				});
				$(function() {
					//顶部导航切换
					$("#demo-list li").click(function() {
						$("#demo-list li.active").removeClass("active")
						$(this).addClass("active");
					})
				})
			},
		},
	}
</script>

<style scoped="scoped">
	* {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.jquery-accordion-menu ul li a i{
		width: 27px;
	}
	body {
		background: #f0f0f0;
		padding: 0;
		margin: 0;
	}
	
	.content {
		width: 10%;
		position: fixed;
		height: 100%;
		margin-top: 50px;
		background: #414956;
		overflow-y: auto;
	}
	
	.filterinput {
		background-color: rgba(249, 244, 244, 0);
		border-radius: 15px;
		width: 86%;
		height: 30px;
		border: thin solid #FFF;
		text-indent: 0.5em;
		font-weight: bold;
		color: #FFF;
	}
	
	#demo-list a {
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}
	
	.active a:nth-child(1) {
		/*padding: 0;*/
	}
</style>