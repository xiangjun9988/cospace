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
                    <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
                    <router-link to="upload" class="btn btn-danger margin-right-20"><i class="fa fa-upload"></i>上传</router-link>
                    应用名称：	<select>
				                    <option>请选择</option>
				                    <option>排队叫号管理</option>
				                    <option>智慧政务</option>
			                    </select>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                    <table class="table table-striped table-bordered table-hover" id="vueTable">
                                        <thead class="bordered-blue">
                                            <tr>
                                                <th width="20%">
                                                    工作流名称
                                                </th>
                                                <th width="15%">
                                                    应用名称
                                                </th>
                                                <th width="20%">
                                                    流程关键字
                                                </th>
                                                <th width="10%">
                                                    版本号
                                                </th>
                                                <th width="15%">
                                                    部署时间
                                                </th>
                                                <th width="20%" class="text-align-center">
                                                    操作
                                                </th>                   
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in processRows">
                                                <td>{{item.workName}}</td>
                                                <td>{{item.applyName}}</td>
                                                <td>{{item.keyword}}</td>
                                                <td>{{item.version}}</td>
                                                <td>{{item.time}}</td>
                                                <td>
                                                    <router-link to="edit" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i> 编辑 </router-link>
                                                    <a href="javascript:;" class="btn btn-danger btn-xs margin-right-10"><i class="fa fa-trash-o"></i> 删除 </a>
                                                	<router-link to="binding" class="btn btn-blue btn-xs"><i class="fa fa-lock"></i> 表单绑定</router-link>
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
	data(){
		return{
			processRows: [
				{
					"id": "1",
					"workName": "电子监察1",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				},
				{
					"id": "2",
					"workName": "电子监察2",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				},
				{
					"id": "3",
					"workName": "电子监察3",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				},
				{
					"id": "4",
					"workName": "电子监察4",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				},
				{
					"id": "5",
					"workName": "电子监察5",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				},
				{
					"id": "6",
					"workName": "电子监察6",
					"applyName": "智慧政务",
					"keyword": "process1488272635587",
					"version": "1",
					"time": "2017-02-28"
				}												
			]
		}
	},
	mounted(){
		$('#vueTable').DataTable();
		$('#vueTable').wrap('<div class="table-scrollable"></div>'); 
	}
}
</script>