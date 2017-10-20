<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：消息中心 / 我发送的消息
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
		    	<div class='col-xs-12'>
		    		<router-link to="sendMessage" class="btn btn-info"><i class="fa fa-plus"></i>发消息</router-link>
		    		<span class="pull-right">
                        <input type="text" class="form-control" placeholder="消息内容查询" style="width:180px;" v-model="messageContent">
                        <a href="javascript:;" class="btn btn-info" v-on:click="refresh"><i class="fa fa-search"></i>搜索</a>               
                    </span>
		    		<div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                	<div class="table-scrollable">
	                                    <table class="table table-striped table-bordered table-hover" id="vueTable">
	                                        <thead class="bordered-blue">
	                                             <tr>
	                                             	<th class="text-center"  width='10%'>序号</th>
							                        <th class="text-center"  width='15%'>消息标题</th>
													<th class="text-center"  width='25%'>消息内容</th>
							                        <th class="text-center"  width='10%'>接收者姓名</th>
							                        <th class="text-center"  width='20%'>发送时间</th>
							                        <th class="text-center"  width='10%'>消息来源</th>
							                                   
							                    </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for='(item, index) in receiveMessages'>
							                        <td class="text-center">{{item.ROW_ID}}</td>
							                        <td class="text-center">{{item.messageTitle}}</td>
													<td class="text-center">{{item.messageContent}}</td>
													<td class="text-center">{{item.messageRecName}}</td>
													<td class="text-center">{{item.sendDate}}</td>
													<td class="text-center">{{item.messageSource}}</td>
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
export default {
    components: {
        
    },
	data : function(){
		return {
			//我收到的消息
			receiveMessages : [],
			currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）
            messageContent: '',
		}
		
	},
	created : function(){
		this.refresh();
	},
	mounted: function(){
       
    },   
	methods : {
		refresh(){
			//展示应用评价信息
			let token = localStorage.getItem('token');
			//http://192.168.2.69:8080/cospace2017
			let messageAuthorId='';
			$.get(window.config.api + "/login/getUserInfoByToken.do?token="+token,{})
	        .then(data=>{
	        	//console.log(JSON.stringify(data))
	        	messageAuthorId = data.obj.userMap.userId;
	        	$.get(window.config.api + "/sorMessage/queryListByPage.do?token="+token,{currentPage:this.currentPage,pageSize:this.pageSize, messageAuthorId : messageAuthorId,  messageContent: this.messageContent})
		        .then(data=>{
		            if(!data.success){
		                //返回错误状态 
		                //alert(1)                   
		                return false;
		            }
		            this.receiveMessages = data.obj.records;
		            //console.log(JSON.stringify(data))
		            if(this.receiveMessages == undefined && this.currentPage != 1){
		            		this.currentPage = this.currentPage-1;
		            		this.refresh(); 
		            }
		            if(this.receiveMessages == undefined && this.currentPage == 1){
		            	//alert(1)
		            	$(".pageBox").html('<div class="noData">抱歉，没有搜索到相关数据！</div>');
		            }else{
		            	//console.log(JSON.stringify(data.obj.records));
		            	$(".pageBox").html('<div id="page" class="m-pagination"></div>');
	                	this.initPage(data.obj.total);
		            }

		            
		        });
	        })
	          
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
	}
}
</script>

<style scoped lang="sass">
.form-control{
    display: inline-block;
    vertical-align: middle;
} 
	
</style>

