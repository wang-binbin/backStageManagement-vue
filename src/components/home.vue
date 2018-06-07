<template>
	<div class="homepage">
		<Title/>
		<div class="content">
			<div id="jquery-accordion-menu" class="jquery-accordion-menu red">
				<!--<div class="jquery-accordion-menu-header" id="form"></div>-->
				<ul id="demo-list">
					<li class="active">
						<router-link to="/userManagement"><i class="fa fa-suitcase"></i>用户管理</router-link>
					</li>
					<li>
						<a href="#"><i class="fa fa-cog"></i>审核管理</a>
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
							<li>
								<a href="#">审核通过</a>
							</li>
							<li>
								<a href="#">审核拒绝</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#"><i class="fa fa-suitcase"></i>Portf</a>
						<ul class="submenu">
							<li>
								<a href="#">Web D</a>
							</li>
							<!--<li><a href="#">Graphics </a><span class="jquery-accordion-menu-label">10 </span></li>-->
							<li>
								<a href="#">Photos</a>
							</li>
							<li>
								<a href="#">Program</a>
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
	import registerPending from './home/registerPending'
	import InformationPending from './home/InformationPending'
import Title from './home/title'
	export default {
		inject: ["reload"],
		name: "homepage",
		components: {
			registerPending,
			InformationPending,
			Title
		},
		data() {
			return {

			}
		},
		mounted: function() {

			this.go();
			//			this.reload();

		},
		methods: {
			go: function() {
				this.$router.push("/userManagement");
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
	
	body {
		background: #f0f0f0;
		padding: 0;
		margin: 0;
	}
	
	.content {
		width: 10%;
		position: fixed;
		height: 100%;
		background: #414956;
		overflow-y: auto;
	}
	
	.filterinput {
		background-color: rgba(249, 244, 244, 0);
		border-radius: 15px;
		width: 90%;
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