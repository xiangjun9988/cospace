<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：应用使用分析
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
		    	<div class="col-lg-6 col-xs-12">
		    		<Column></Column>
		  		</div>
		  		<div class="col-lg-6 col-xs-12">
		    		<Chart></Chart>
		  		</div>
	    	</div>
	    </div>
	</div>
</template>



<script>
import Chart from './use/Chart.vue';
import Column from './use/Column.vue';
export default {
    components: {
        Chart,
        Column
    },
	data : function(){
		return {

		}
	},
	created : function(){

	},
	mounted: function(){       
       
    },   
	computed : {
		
	},
	methods : {
		
	}
}
</script>

<style scoped>
	
</style>

