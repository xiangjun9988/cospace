<template>
	<div class="widget-body">
		<div class="row">
			<div class="col-xs-12 col-md-12">
				<a href="javascript:;" class="btn btn-blue">一键初始化</a>
				<router-link to="synchro" class="btn btn-blue">同步</router-link>
				<router-link to="resolved" class="btn btn-blue">解决冲突</router-link>
		        <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增数据表</router-link>
		        <a class="btn btn-darkorange" href="javascript:;"><i class="fa fa-download"></i>导出Excel</a>
		        <div class="row margin-top-10">
		            <div class="col-xs-12 col-md-12">
						<table class="table table-striped table-bordered table-hover" id="vueTable">
					        <thead class="bordered-blue">
					            <tr>
					                <th width="10%">
					                    序号
					                </th>
					                <th width="30%">
					                   中文表名
					                </th>
					                <th width="16%">
					                    英文表名
					                </th>
					                <th width="12%">
					                    创建时间
					                </th>
					                <th width="20%">
					                    描述
					                </th>
					                <th width="12%" class="text-align-center">
					                    操作
					                </th>	                
					            </tr>
					        </thead>
						        <tbody>
					            <tr v-for="item in sheetRows">
					                <td>{{item.num}}</td>
					                <td>{{item.chineseName}}</td>
					                <td>{{item.englishName}}</td>
					                <td>{{item.createDate}}</td>
					                <td>{{item.remark}}</td>
					                <td>
										<router-link :to="'edit/'+item.id" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i> 编辑 </router-link>
										<router-link :to="'property/'+item.id" class="btn btn-danger btn-xs"><i class="fa fa-dribbble"></i> 属性管理 </router-link>
									</td>
				                </tr>
					        </tbody>
					    </table>
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
					"id": "1",
					"num": "1",
					"chineseName": "发改委行政许可表",
					"englishName": "xzxk_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "2",
					"num": "2",
					"chineseName": "发改委行政处罚表",
					"englishName": "xzcf_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "3",
					"num": "3",
					"chineseName": "统计局固定资产投资项目情况表",
					"englishName": "tjjgdzctzxmb",
					"createDate": "2016-11-16",
					"remark": ""
				},
				{
					"id": "4",
					"num": "4",
					"chineseName": "财政局代理记账机构登记表",
					"englishName": "caizjdljzjgdjb",
					"createDate": "2016-11-15",
					"remark": ""
				},
								{
					"id": "5",
					"num": "5",
					"chineseName": "发改委行政许可表",
					"englishName": "xzxk_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "6",
					"num": "6",
					"chineseName": "发改委行政处罚表",
					"englishName": "xzcf_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "7",
					"num": "7",
					"chineseName": "统计局固定资产投资项目情况表",
					"englishName": "tjjgdzctzxmb",
					"createDate": "2016-11-16",
					"remark": ""
				},
				{
					"id": "8",
					"num": "8",
					"chineseName": "财政局代理记账机构登记表",
					"englishName": "caizjdljzjgdjb",
					"createDate": "2016-11-15",
					"remark": ""
				},
				{
					"id": "9",
					"num": "9",
					"chineseName": "财政局代理记账机构登记表",
					"englishName": "caizjdljzjgdjb",
					"createDate": "2016-11-15",
					"remark": ""
				},
								{
					"id": "10",
					"num": "10",
					"chineseName": "发改委行政许可表",
					"englishName": "xzxk_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "11",
					"num": "11",
					"chineseName": "发改委行政处罚表",
					"englishName": "xzcf_1",
					"createDate": "2016-12-08",
					"remark": ""
				},
				{
					"id": "12",
					"num": "12",
					"chineseName": "统计局固定资产投资项目情况表",
					"englishName": "tjjgdzctzxmb",
					"createDate": "2016-11-16",
					"remark": ""
				},
				{
					"id": "13",
					"num": "13",
					"chineseName": "财政局代理记账机构登记表",
					"englishName": "caizjdljzjgdjb",
					"createDate": "2016-11-15",
					"remark": ""
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


