<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据源
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
				<div class="col-xs-12 col-md-12">
                    <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">                                
									<table class="table table-striped table-bordered table-hover" id="vueTable">
								        <thead class="bordered-blue">
								            <tr>
								                <th width="5%">
								                    序号
								                </th>
								                <th width="15%">
								                    数据源名称
								                </th>
								                <th width="10%">
								                    名称
								                </th>
								                <th width="10%">
								                    类型
								                </th>
								                <th width="20%">
								                    地址
								                </th>
								                <th width="10%">
								                    创建时间
								                </th>
								                <th width="15%">
								                    数据源描述
								                </th>
								                <th width="15%" class="text-align-center">
								                    操作
								                </th>	                
								            </tr>
								        </thead>
			 					        <tbody>
								            <tr v-for="item in sourceRows">
								                <td>{{item.num}}</td>
								                <td>{{item.sourceName}}</td>
								                <td>{{item.name}}</td>
								                <td>{{item.type}}</td>
								                <td>{{item.location}}</td>
								                <td>{{item.createDate}}</td>
								                <td>{{item.remark}}</td>
								                <td>
													<router-link :to="'edit/'+item.id" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i> 编辑 </router-link>
													<a href="javascript:;" class="btn btn-danger btn-xs"><i class="fa fa-dribbble"></i> 测试 </a>
												</td>
							                </tr>
								        </tbody>
								    </table>
                                </div>
                            </div>
                        </div>
                    </div>								
				</div>
			</div>
	    </div>
	</div>
</template>

<script>
export default{
	data() {
		return {
			sourceRows: [
				{
					"id": "1",
					"num": "1",
					"sourceName": "硚口一门式",
					"name": "orclQKKF",
					"type": "oracle",
					"location": "jdbc:oracle:thin:@10.72.0.78:1521:orclQKKF",
					"createDate": "2016-08-16",
					"remark": ""
				},
				{
					"id": "2",
					"num": "2",
					"sourceName": "硚口大数据",
					"name": "qkods",
					"type": "mysql",
					"location": "jdbc:mysql://10.72.0.79:3306/qkods",
					"createDate": "2016-03-03",
					"remark": ""
				}				
			]
		}			
	},
	mounted: function(){
		$('#vueTable').DataTable({
			lengthChange: false
		});
		$('#vueTable').wrap('<div class="table-scrollable"></div>'); 
	}		
}
</script>



