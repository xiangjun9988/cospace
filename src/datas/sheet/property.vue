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
	    <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    硚口大数据
                    <small>
                        <i class="fa fa-angle-right"></i>
                        发改委行政许可表
                    </small>
                </h1>
            </div>
        </div>
	    <div class="page-body">
			<div class="row">
				<div class="col-xs-12 col-md-12">
                    <router-link to="../property_add" class="btn btn-azure"><i class="fa fa-plus"></i>新增</router-link>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">                                
									<table class="table table-striped table-bordered table-hover" id="vueTable">
								        <thead class="bordered-blue">
								            <tr>
								                <th width="15%">
								                    名称
								                </th>
								                <th width="15%">
								                    字段名称
								                </th>
								                <th width="12%">
								                    字段类型
								                </th>
								                <th width="8%">
								                    长度
								                </th>
								                <th width="10%">
								                    是否为主键
								                </th>
								                <th width="10%">
								                    允许为空
								                </th>
								                <th width="10%">
								                    默认值
								                </th>
												<th width="10%">
								                    注释
								                </th>
								                <th width="10%" class="text-align-center">
								                    操作
								                </th>	                
								            </tr>
								        </thead>
			 					        <tbody>
								            <tr v-for="item in propRows">
								                <td>{{item.name}}</td>
								                <td>{{item.fieldName}}</td>
								                <td>{{item.fieldType}}</td>
								                <td>{{item.length}}</td>
								                <td>{{item.isKey}}</td>
								                <td>{{item.isEmpty}}</td>
								                <td>{{item.default}}</td>
								                <td>{{item.note}}</td>
								                <td>
													<router-link :to="'../property_edit/'+item.id" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i> 编辑 </router-link>
													<a href="javascript:;" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> 删除 </a>
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
			propRows: [
				{
					"id": "1",
					"name": "营业收入（元）",
					"fieldName": "yysr",
					"fieldType": "decimal",
					"length": "30",
					"isKey": "否",
					"isEmpty": "不允许",
					"default": "",
					"note": ""
				},
				{
					"id": "2",
					"name": "单位工作人员数",
					"fieldName": "dwgzrys",
					"fieldType": "int",
					"length": "11",
					"isKey": "否",
					"isEmpty": "不允许",
					"default": "",
					"note": ""
				}								
			]
		}			
	},
	mounted: function(){
		$('#vueTable').DataTable({
			lengthChange: false
		});
	}		
}
</script>



