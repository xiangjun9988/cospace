<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：节假日管理 / 查询分类
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                	<div class="row">
	                	<div class="col-xs-12 col-md-12">
	                		<button type="button" class="btn btn-danger" onclick="history.go(-1);"><i class="fa fa-arrow-left"></i> 返回 </button>
		                    <router-link to="../add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
	                    </div>             		
                	</div>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
									<div class="table-scrollable">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead class="bordered-blue">
                                                <tr>
                                                    <th width="20%">
									                    序号
									                </th>
									                <th width="30%">
									                    分类名称
									                </th>
									                <th width="25%">
									                    分类编号
									                </th>
									                <th width="25%">
									                    操作
									                </th>                 
	                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in classifyList">
                                                    <td>{{item.ROW_ID}}</td>
                                                    <td>{{item.typeDesc}}</td>
                                                    <td>{{item.typeCode}}</td>
                                                    <td class="text-center">
                                                        <a href="javascript:;" class="btn btn-danger btn-xs margin-right-10" v-on:click="holidayDelete(item.typeId)"><i class="fa fa-trash-o"></i> 删除 </a>
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
    </div> 
</template>

<script>
require('pagination');
export default{
	data() {
		return{
			classifyList: [],
			currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）
		}
	},
	created: function(){
        this.refresh(); 
    }, 
	mounted: function(){
    	
	},
    methods: {  
        refresh(){
            let token = localStorage.getItem('token');
            //console.log(this.roleName)
            $.get(window.config.api + "/holidaysType/queryListByPage.do?token="+token,{currentPage:this.currentPage,pageSize:this.pageSize})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //alert(JSON.stringify(data.obj));
                this.classifyList = data.obj.records;
                //console.log(JSON.stringify(data));
                if(this.classifyList == undefined && this.currentPage != 1){
                    this.currentPage = this.currentPage-1;
                    this.refresh(); 
                }
                if(this.classifyList == undefined && this.currentPage == 1){
                    //alert(1)
                    $(".pageBox").html('<div class="noData">抱歉，没有搜索到相关数据！</div>');
                }else{
                    //console.log(JSON.stringify(data.obj.records));
                    $(".pageBox").html('<div id="page" class="m-pagination"></div>');
                    this.initPage(data.obj.total);
                }
                 
                //}
                
            });  
        },
        initPage: function(total) {
          let that = this;
          $("#page").pagination({
            //总数据数，生成分页则必须配置该属性以生成分页
            total: parseInt(total) || 0,
            //指定当前页数，索引从0开始，默认第1页 
            pageIndex: this.currentPage-1 || 0,
            pageSize: this.pageSize || 0,
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

        //删除节假日分类
        
        holidayDelete(typeId){
        	let _this = this;
        	$.dialog({
                content : "是否删除此节假日分类",
                reverse: true,
                ok : function() {
                	let token = localStorage.getItem('token');
			    	//查询节假日分类
			        $.get(window.config.api + "/holidaysType/delete.do?token="+token,{id:typeId })
			        .then(data=>{
			            if(!data.success){
			                //返回错误状态 
			                //alert(1)                   
			                return false;
			            }
			            _this.refresh();
			        }); 
                },
                cancel : function() {
                   
                }
            });
        	
        }
    }			
}
</script>

<style lang="sass">

</style>