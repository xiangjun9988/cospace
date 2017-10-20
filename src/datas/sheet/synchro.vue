<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据表/同步
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
										<strong>还未同步到系统中的数据表</strong>
									</div>
									<div class="col-xs-6 col-md-6 text-align-right no-padding-right">
										<button class="btn btn-blue" type="button">同步所勾选数据表到系统中</button>
									</div>												
								</div>
							</div>
							<table class="table table-striped table-bordered table-hover" id="vueTable">
						        <thead class="bordered-blue">
						            <tr>
						                <th width="15%">								
											<div class="checkbox no-margin-top no-margin-bottom">
                                                <label>
                                                    <input type="checkbox" name="checked-all">
                                                    <span class="text"></span>
                                                </label>
                                            </div>
						                </th>
						                <th width="15%">
						                    序号
						                </th>
						                <th width="50%">
						                    表名
						                </th>
						                <th width="20%">
						                    创建时间
						                </th>
						            </tr>
						        </thead>
	 					        <tbody>
						            <tr v-for="item in sheetRows">
						                <td>
											<div class="checkbox no-margin-top no-margin-bottom">
                                                <label>
                                                    <input type="checkbox" name="checked-single">
                                                    <span class="text"></span>
                                                </label>
                                            </div>						                
                                        </td>
   						                <td>{{item.num}}</td>
						                <td>{{item.sheetName}}</td>
						                <td>{{item.createDate}}</td>
					                </tr>
						        </tbody>
						    </table>
						    <hr>
							<div class="row margin-bottom-10">
								<div class="col-xs-12 col-md-12">
									<div class="col-xs-6 col-md-6 no-padding-left padding-top-5">
										<strong>还未同步到数据源中的数据表</strong>
									</div>
									<div class="col-xs-6 col-md-6 text-align-right no-padding-right">
										<button class="btn btn-blue" type="button">同步所勾选数据表到数据源中</button>
									</div>												
								</div>
							</div>
							<table class="table table-striped table-bordered table-hover" id="vueTable2">
						        <thead class="bordered-blue">
						            <tr>
						                <th width="10%">								
											<div class="checkbox no-margin-top no-margin-bottom">
                                                <label>
                                                    <input type="checkbox" name="checked-all">
                                                    <span class="text"></span>
                                                </label>
                                            </div>
						                </th>
						                <th width="10%">
						                    序号
						                </th>
						                <th width="30%">
						                    中文表名
						                </th>
						                <th width="30%">
						                    英文表名
						                </th>						                
						                <th width="20%">
						                    创建时间
						                </th>	                
						            </tr>
						        </thead>
	 					        <tbody>
						            <tr v-for="item in sourceRows">
						                <td>
											<div class="checkbox no-margin-top no-margin-bottom">
                                                <label>
                                                    <input type="checkbox" name="checked-single">
                                                    <span class="text"></span>
                                                </label>
                                            </div>						                
                                        </td>
						                <td>{{item.num}}</td>
						                <td>{{item.chineseName}}</td>
						                <td>{{item.englishName}}</td>
						                <td>{{item.createDate}}</td>
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
					"sheetName": "房管局销售项目表",
					"createDate": "2017-03-08"
				},
				{
					"num": "2",
					"sheetName": "房管局销售项目表",
					"createDate": "2017-03-08"
				}				
			],
			sourceRows: [
				{
					"num": "1",
					"chineseName": "房管局销售项目表",
					"englishName": "fgjxsxmb",
					"createDate": "2017-03-08"
				},
				{
					"num": "2",
					"chineseName": "房管局销售项目表",
					"englishName": "fgjxsxmb",
					"createDate": "2017-03-08"
				}				
			]			
		}
	},
	mounted(){
		$("#vueTable, #vueTable2").DataTable({
			lengthChange: false,
			searching: false
		});
	}
}
</script>

