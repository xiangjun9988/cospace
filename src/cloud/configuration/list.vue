<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：流程配置
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
                                                <th width="10%">
                                                    序号
                                                </th> 
                                                <th width="25%">
                                                    申请单
                                                </th> 
                                                <th width="20%">
                                                    申请单单编码
                                                </th> 
                                                <th width="20%">
                                                    流程key
                                                </th> 
                                                <th width="25%" class="text-align-center">
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in applyRows">
                                                <td>{{item.num}}</td>
                                                <td>{{item.applyName}}</td>
                                                <td>{{item.applyCode}}</td>
                                                <td>{{item.process}}</td>
                                                <td>   
                                                    <router-link :to="'edit/'+item.id" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i>编辑</router-link>
                                                    <a href="javascript:;" class="btn btn-danger btn-xs margin-right-10 delete" @click="removeItem()"><i class="fa fa-trash-o"></i>删除</a>
                                                    <a href="javascript:;" class="btn btn-blue btn-xs view"><i class="fa fa-picture-o"></i>查看流程图</a>
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
	data: function(){
		return{
			applyRows: [
				{
					"id": "1",
					"num": "1",
					"applyName": "数据采集申请",
					"applyCode": "DATA_COLLECT",
					"process": "process1472196017303"
				},
				{
					"id": "2",
					"num": "2",
					"applyName": "资源授权",
					"applyCode": "DATA_AUTHO",
					"process": "process1472201199683"
				},
				{
					"id": "3",
					"num": "3",
					"applyName": "资源审批",
					"applyCode": "DATA_VIEW",
					"process": "process1472201082895"
				},
				{
					"id": "4",
					"num": "4",
					"applyName": "数据采集申请",
					"applyCode": "DATA_COLLECT",
					"process": "process1472196017303"
				},
				{
					"id": "5",
					"num": "5",
					"applyName": "资源授权",
					"applyCode": "DATA_AUTHO",
					"process": "process1472201199683"
				},
				{
					"id": "6",
					"num": "6",
					"applyName": "资源审批",
					"applyCode": "DATA_VIEW",
					"process": "process1472201082895"
				}												
			]			
		}
	},
	mounted: function(){
		$('#vueTable').DataTable({
    		lengthChange: false,
			searching: false			
		});
		$('#vueTable').wrap('<div class="table-scrollable"></div>'); 
	},
    methods: {  
        removeItem: function (index) {  
            this.applyRows.splice(index, 1);  
        }  
    }	
};

$(function(){
	$('.view').on('click', function(){
		$.dialog('<img src="../bootstrap/img/logo_icons/icon1.png">');
	});	
})
</script>