<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：应用图标管理
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
		    	<div class='col-xs-12'>
		    		<span class="btn btn-azure" data-toggle="modal" data-target="#modal-danger"><i class="fa fa-plus"></i>新增</span>
		    		<div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                	<div class="table-scrollable">
	                                    <table class="table table-striped table-bordered table-hover" id="vueTable">
	                                        <thead class="bordered-blue">
	                                             <tr>
							                        <th class="text-center" width='15%'>序号</th>
			                        				<th class="text-center" width='30%'>应用图标名称</th>
													<th class="text-center" width='40%'>应用图标</th>
			                        				<th class="text-center" width='15%'>操作</th>
							                    </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for='(item,index) in iconmessage'>
							                        <td class="text-center">{{item.ROW_ID}}</td>
							                        <td class="text-center">{{item.icon.split("/").pop().split(".")[0]}}</td>
													<td class="text-center"><img v-bind:src="api+'/'+ item.icon +'?token=' + token" class='img'></td>
							                        <td class="text-center"><button type="button" class="btn btn-danger delete btn-sm"  v-on:click="deleteIcon(item.icon)"><i class="fa fa-trash-o"></i>删除</button></td>
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


	    <!--选择文件 Modal Templates-->
        <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
	                <!-- 应用图标上传 -->
	                <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">附件信息</h4>
                    </div>
                    <div class="modal-body" style="height:200px; overflow-y:auto;">
                        <div class="form-group">  
							<form id= "uploadForm">  
							    <p>指定文件名： <input type="text" name="filename" value= ""/></p>  
							    <p class="margin-bottom-10">上传文件： <input type="file" name="datafile"/></p>  
							    
							</form>  																					
                       </div>                    
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="doUpload" >上传</button>
						<button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="canceldoUpload">取消</div> 
                    </div>
                    
                </div>
                <!-- /.modal-content -->
            </div> 
        </div>
        <!--End 选择文件 Modal Templates--> 
	</div>
</template>



<script>
require('pagination');
export default {

	data : function(){
		return {
			api: '',
			//源数据
			token: '',
			iconmessage: [],
			currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）
		}
	},
	created : function(){
		this.api = window.config.api;
		this.refresh(); 
	},
	computed : {},
	methods : {
		refresh(){
			//展示应用图标信息
			let token = localStorage.getItem('token');
			this.token = token;

	        $.get(window.config.api + "/sysIcon/queryListByPage.do?token="+token,{currentPage:this.currentPage,pageSize:this.pageSize})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态                    
	                return false;
	            }
	            //console.log(JSON.stringify(data.obj))
	            this.iconmessage = data.obj.records;
	            //console.log(this.iconmessage == undefined)
	            if(this.iconmessage == undefined && this.currentPage != 1){
	            	this.currentPage = this.currentPage-1;
	            	this.refresh(); 
	            }
	            if(this.iconmessage == undefined && this.currentPage == 1){
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
            total: parseInt(total) || 0,
            //指定当前页数，索引从0开始，默认第1页 
            pageIndex: that.currentPage-1 || 0,
            pageSize: that.pageSize || 0,
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
		//上传图标
		doUpload() {  
			var _this = this;
			if($("#uploadForm input[type='text']").val() == ''){
				$.dialog('请输入应用图标名称');
				return false;
			}
			if($("#uploadForm input[type='file']").val() == ''){
				$.dialog('请导入应用图标图片');
				return false;
			}
			let token = localStorage.getItem('token');
            //新增应用图标请求 
			var formData = new FormData($( "#uploadForm" )[0]);  
			//alert($( "#uploadForm input[type='file']").val())
			$.ajax({  
			  	url: window.config.api + "/sysIcon/uploadIcon.do?token="+token,  
			  	type: 'POST',  
			  	data: formData,  
			  	async: false,  
			  	cache: false,  
			  	contentType: false,  
			  	processData: false,  
			  	success: function (returndata) {  
			  		$.dialog(returndata.msg);
			  		$("#uploadForm input[type='text']").val("");
			  		$("#uploadForm input[type='file']").val("") ;
	                _this.refresh();  	
			  	},  
			  	error: function (returndata) { 
			  		$.dialog('图标上传失败');
			  	}  
			});  
		},
		canceldoUpload(){
			$("#uploadForm input[type='text']").val("");
			$("#uploadForm input[type='file']").val("") ;
		},
		//删除图标
		deleteIcon(deleteIcon){
			let _this = this;
        	$.dialog({
                content : "是否删除应用图标？",
                reverse: true,
                ok : function() {
                	let token = localStorage.getItem('token');
			    	$.post(window.config.api + "/sysIcon/delete.do?token="+token,{icon:deleteIcon})
			        .then(data=>{
			            if(!data.success){
			                //返回错误状态 
			                //alert(1) 
			                $.dialog("操作失败");                  
			                return false;
			            }
			           
		                $.dialog(data.msg);
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

<style scoped  lang="sass">
	table tbody img{
		width: 40px;
		height: 40px;
	}
	table tbody td{
		line-height: 55px;
	}
</style>


