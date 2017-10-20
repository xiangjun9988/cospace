<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据字典
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                	<div class="row">
	                	<div class="col-xs-12 col-md-12 clearfix">
	                		<button type="button" class="btn btn-danger" onclick="history.go(-1);"><i class="fa fa-arrow-left"></i> 返回 </button>
		                    <router-link :to="'../detail_add/'+ $route.params.id" class="btn btn-azure"><i class="fa fa-plus"></i>新增</router-link>
		                    <span class="pull-right padding-top-5">字典分类：{{dictName}}</span>
	                    </div>             		
                	</div>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
									<div class="table-scrollable">
	                                    <table class="table table-striped table-bordered table-hover" id="vueTable">
	                                        <thead class="bordered-blue">
	                                            <tr>
									                <th width="10%">
									                    序号
									                </th>
									                <th width="15%">
									                    字典编号
									                </th>
									                <th width="15%">
									                    字典简称
									                </th>
									                <th width="20%">
									                    字典名称
									                </th>
									                <th width="15%">
									                	排序
									                </th>					                
									                <th width="15%">
									                    是否可用
									                </th>
									                <th width="10%">
									                    操作
									                </th>	                
									            </tr>
		                                    </thead>
	                                        <tbody>
	                                            <tr v-for="(item,index) in detailRows">
								                <td>{{item.ROW_ID}}</td>
								                <td>{{item.dictId}}</td>
								                <td>{{item.simplyName}}</td>
								                <td>{{item.dictName}}</td>
								                <td>{{item.isOrder}}</td>
								                <td v-bind:class="{'red':parseInt(item.isUse), 'blue':!parseInt(item.isUse)}">{{parseInt(item.isUse)?"否":"是"}}</td>
								                </td>
								                <td>
													<router-link :to="'../detail_edit/'+ $route.params.id +'-'+ item.dictId" class="btn btn-info btn-xs"><i class="fa fa-edit"></i> 编辑 </router-link>
												</td>
							                </tr>
	                                        </tbody>
	                                    </table> 
	                                </div>   

	                                <!-- 分页信息 -->
                                    <div class="pageBox">
                                        <div id="page" class="m-pagination"></div>
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
require('pagination');
export default {

	data : function(){
		return {
			//
			detailRows: [],
			dictCode:'',		//字典分类编码
			dictName:'',		//字典分类名称
			currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）
		}
		
	},
	created : function(){
		let routerId = (this.$route.params.id).split("-");
		this.dictCode = routerId[0];
		this.dictName = routerId[1];
		//console.log(routerId)
		this.refresh(); 
	},
	computed : {

	},
	methods : {
		refresh(){
			let token = localStorage.getItem('token');
	        $.get(window.config.api + "/dictInfo/queryListByPage.do?token="+token,{currentPage:this.currentPage,pageSize:this.pageSize,dictCode:this.dictCode})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态                    
	                return false;
	            }
	            //console.log(JSON.stringify(data));
	            this.detailRows = data.obj.records;

	            //console.log(this.bookRows == undefined)
	            if(this.detailRows == undefined){
	            	if(this.currentPage != 1){
	            		this.currentPage = this.currentPage-1;
	            		this.refresh(); 
	            	}
	            }
	            if(this.detailRows == undefined && this.currentPage == 1){
	            	//alert(1)
	            	$(".pageBox").html('<div class="noData">抱歉，没有搜索到相关数据！</div>');
	            }else{
	            	//console.log(JSON.stringify(data.obj.records));
	            	$(".pageBox").html('<div id="page" class="m-pagination"></div>');
                	this.initPage(data.obj.total);
	            }
	        });  
		},
		initPage: function(total) {
          let that = this;
          $("#page").pagination({
            //总数据数，生成分页则必须配置该属性以生成分页
            total: parseInt(total),
            //指定当前页数，索引从0开始，默认第1页 
            pageIndex: that.currentPage-1,
            pageSize: that.pageSize,
            firstBtnText: '&laquo;',
            lastBtnText: '&raquo;',
            prevBtnText: '&lsaquo;',
            nextBtnText: '&rsaquo;',
            //显示分页按钮数，包括首页尾页和上一页下一页按钮，推荐设置为基数
            pageBtnCount: 10,
            //是否显示分页信息
            showInfo: true,
            //是否显示跳转页
            showJump: true,
            //跳转按钮显示文字
            jumpBtnText:'GO',
            //是否显示选择每页数量
            showPageSizes: true,
            //配置可选每页数量
            pageSizeItems: [5, 10, 15, 20, 30],
            infoFormat: '共<span class="num">{total}</span>条数据，共<span class="num">{pageSize}</span>页，当前第<span class="num">{index}</span>页'
          }).on("pageClicked", function(event, data) {
            //分页按钮点击事件
            that.currentPage = data.pageIndex + 1;
            //alert(data.pageIndex + 1)
            that.refresh();
          }).on("pageSizeChanged", function(event, data) {
            //页面大小切换事件
            that.currentPage = 1;
            that.pageSize = data.pageSize;
            that.refresh();
          }).on("jumpClicked", function(event, data){
            //跳转按钮点击事件
            that.currentPage = data.pageIndex + 1;
            //alert(data.pageIndex + 1)
            that.refresh();
          });
        },
        

		
	}
}
</script>

<style scoped lang="sass">

</style>