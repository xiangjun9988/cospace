<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据表/解决冲突
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
				<div class="col-xs-12 col-md-12">
                    <div class="widget">
                        <div class="widget-body"> 
							<div class="row margin-bottom-10">
								<div class="col-xs-12 col-md-12">
									<div class="col-xs-6 col-md-6 no-padding-left padding-top-5">
										<strong>有冲突的表</strong>
									</div>
									<div class="col-xs-6 col-md-6 text-align-right no-padding-right">
										点击表名查看具体冲突
									</div>												
								</div>
							</div>
							<table class="table table-striped table-bordered table-hover" id="vueTable">
						        <thead class="bordered-blue">
						            <tr>
						                <th width="30%">
						                    序号
						                </th>
						                <th width="70%">
						                    表名
						                </th>
						            </tr>
						        </thead>
	 					        <tbody>
						            <tr v-for="item in sheetRows">
   						                <td>{{item.num}}</td>
						                <td>{{item.sheetName}}</td>
					                </tr>
						        </tbody>
						    </table>						    
                        </div>
                    </div>								
				</div>
			</div>
	    </div>    	    	    
	</div>	
</template>

<script>
export default{
	data(){
		return{
			sheetRows: [
				{
					"num": "1",
					"sheetName": "房管局销售项目表"
				},
				{
					"num": "2",
					"sheetName": "房管局销售项目表"
				}				
			]			
		}
	},
	mounted(){
		$("#vueTable").DataTable({
			lengthChange: false,
			searching: false
		});
	}
}
</script>