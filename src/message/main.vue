<template>
	<div class="cloud-router">
		<header-view :fromdata="fromdata" :userdata="userdata"></header-view>     <!--头部-->
		<div class="main-container container-fluid">
	        <div class="page-container">
			    <div class="page-sidebar" id="sidebar">
			        <ul class="nav sidebar-menu">
			            <li class="open">
			                <a href="javascript:;" class="menu-dropdown">
			                    <i class="menu-icon glyphicon glyphicon-cog"></i>
			                    <span class="menu-text">
			                        消息中心
			                    </span>
			                    <i class="menu-expand"></i>
			                </a>
			                <ul class="submenu">
			                    <li v-for="item in menus" v-bind:class="{'active' : $route.path.indexOf(item.link) !== -1}">
			                        <router-link :to="item.link">
			                        	<span class="menu-text">{{item.name}}</span>
			                        </router-link>       
			                    </li>			                                        
			                </ul>
			            </li>
			        </ul>
			    </div>
			 	<router-view :userdata="userdata"></router-view>   
	        </div>        
	    </div> 	
	</div>    	
</template>

<script>
import vHeader from '../components/header.vue';
export default {
	components:{
		'header-view': vHeader
	},
	props: ['userdata'],
	data(){
		return {
			fromdata: {
				type: 'message'
			},
			activeMenu: true,
			menus: [
				{
					name: '我收到的消息',
					link: '/message/receive'
				},
				{
					name: '我发送的消息',
					link: '/message/send'
				}							
			]
		}
	},
	mounted(){
		//展开折叠左侧的导航
		$('#sidebar-collapse').on('click', function(){
			$("#sidebar").is(":visible") || $("#sidebar").toggleClass("hide");
			$("#sidebar").toggleClass("menu-compact");
			$(".sidebar-collapse").toggleClass("active");            
        });
	},
	// created(){
	// 	console.log(this.$route)
	// }
}
</script>