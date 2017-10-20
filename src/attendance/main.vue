<template>
	<div class="attendance-router">
		<header-view :fromdata="fromdata" :userdata="userdata"></header-view>
		<div class="main-container container-fluid">
	        <div class="page-container">
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
				type: 'attendance'
			},
			activeMenu: true
		}
	}
}
</script>