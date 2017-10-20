<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：流程管理
	            </h1>
	        </div>
	    </div>
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="widget">
                        <div class="widget-body">
                            <table class="table table-striped table-bordered table-hover" id="vueTable">
                                <thead class="bordered-blue">
                                    <tr>
                                        <th width="20%">
                                            任务ID
                                        </th>
                                        <th width="10%">
                                            任务名称
                                        </th>
                                        <th width="20%">
                                            应用编码
                                        </th>
                                        <th width="35%">
                                            绑定地址
                                        </th>
                                        <th width="15%" class="text-align-center">
                                            操作
                                        </th>                   
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in bindRows">
                                        <td>{{item.taskID}}</td>
                                        <td>{{item.taskName}}</td>
                                        <td>{{item.code}}</td>
                                        <td>{{item.bindURL}}</td>
                                        <td>
                                        	<router-link to="page_upload" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-upload"></i> 主页上传</router-link>
                                            <router-link to="subpage_upload" class="btn btn-blue btn-xs"><i class="fa fa-upload"></i> 子页上传 </router-link>
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
</template>

<script>
export default{
	data(){
		return{
			bindRows: [
				{
					"id": "1",
					"taskID": "task1488272639203",
					"taskName": "开始",
					"code": "WISDOMGOV",
					"bindURL": ""
				},
				{
					"id": "2",
					"taskID": "task1488272640990",
					"taskName": "结束",
					"code": "WISDOMGOV",
					"bindURL": ""
				}												
			]
		}
	},
	mounted(){
		$('#vueTable').DataTable({
			ordering: false,
			info: false,
			paging: false,
			searching: false
		});
	}
}
</script>