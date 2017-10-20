<template>
	<div class="cloud-router">
		<header-view :fromdata="fromdata" :userdata="userdata"></header-view>
		<div class="main-container container-fluid">
      <div class="page-container">
		    <div class="page-sidebar" id="sidebar">
		        <ul class="nav sidebar-menu">
		            <li class="open">
		                <a href="javascript:;" class="menu-dropdown">
		                    <i class="menu-icon glyphicon glyphicon-cog"></i>
		                    <span class="menu-text">
		                        云管理中心
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
				type: 'cloud'
			},
			activeMenu: true,
			menus: [
				{
					name: '组织机构',
					link: '/cloud/zzjg/'
				},
				{
					name: '人员管理',
					link: '/cloud/personnel/list'
				},
				{
					name: '角色管理',
					link: '/cloud/role/list'
				},
				{
					name: '数据字典',
					link: '/cloud/wordbook/list'
				},
				{
					name: '节假日管理',
					link: '/cloud/holidays/index'
				},
				{
					name: '部门人员管理',
					link: '/cloud/department/'
				},
				// {
				// 	name: '流程管理',
				// 	link: '/cloud/process/list'
				// },
				// {
				// 	name: '流程配置',
				// 	link: '/cloud/configuration/list'
				// },
				{
					name: '区划管理',
					link: '/cloud/area/list'
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
	}
}
</script>