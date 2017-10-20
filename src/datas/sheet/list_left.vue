<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据表
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
				<div class="col-lg-3 col-sm-3 col-xs-12">
					<div class="widget-body">
						<ul class="tree">
							<li v-for="item in items">
								<a href="javascript:;" >{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-9 col-sm-9 col-xs-12">
					<router-view></router-view>				
				</div>
			</div>
	    </div>
	</div>
</template>

<script>
import vRight from './list_right.vue';
export default{
	components: {
		'router-view': vRight
	},
	data(){
		return{
			items: [
				{		
					"id": "1",
					"name": "硚口一门式"
				},
				{		
					"id": "2",
					"name": "硚口大数据"
				},
				{		
					"id": "3",
					"name": "硚口区政府"
				},
				{		
					"id": "4",
					"name": "硚口大数据"
				},
				{		
					"id": "5",
					"name": "硚口区政府"
				}						
			]
		}
	}
}	
</script>

<style lang="sass">
.tree{
	margin-bottom: 0;
	padding-left: 10px;
	&:before{
		top: 16px;
		bottom: 15px;
	}
	li{
		position: relative;
    	list-style: none;
		&:before{
		    display: inline-block;
		    content: "";
		    position: absolute;
		    top: 15px;
		    left: -13px;
		    width: 17px;
		    height: 0;
		    border-top: 1px dotted #666;
		    z-index: 1;
		}
		a{
			display: block;
			padding: 5px;
			color: #333;
			text-decoration: none;
			&:hover{
				background: #eee;
			}
		}    	
	}
}
</style>
