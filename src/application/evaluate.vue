<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：应用评价
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
		    	<div class="col-xs-12">
		    		<router-link to="evaluate/add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
		    		<div class="search">
		    			<select v-model="symbol">
                            <option value="">请选择满意度范围</option>
                            <option value="<">&lt;</option>
                            <option value=">">&gt;</option>
                            <option value="=">=</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select>
                        <select v-model="star">
                            <option value="">请选择满意度</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <table class="dateTable">
							<thead>
								<tr>
									<th><input type="text" class="span2 form-control" id="dpd1"></th> 
									<th>--<input type="text" class="span2 form-control" id="dpd2"></th>
								</tr>
							</thead>
						</table>
			            <select v-model="appcode">
                            <option value="">请选择应用名称</option>
                            <option  v-for="item in appList" :value="item.appCode">{{item.appName}}</option>
                        </select>
			            <input type="text" class="form-control" placeholder="请输入评价人" v-model="userName">
			            <a href="javascript:;" class="btn btn-info" v-on:click="searchDatas"><i class="fa fa-search"></i>搜索</a>
			            <a href="javascript:;" class="btn btn-danger" v-on:click="reset"><i class="fa fa-refresh"></i>重置</a>
			        </div>
		    		<div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                	<div class="table-scrollable">
	                                    <table class="table table-striped table-bordered table-hover" id="vueTable">
	                                        <thead class="bordered-blue">
	                                             <tr>
							                        <th class="text-center" width='6%'>序号</th>
			                        				<th class="text-center" width='10%'>评价人</th>
													<th class="text-center" width='10%'>应用系统名称</th>
			                        				<th class="text-center" width='10%'>菜单名称</th>
			                        				<th class="text-center" width='6%'>满意度</th>
			                        				<th class="text-center" width='28%'>内容</th>
			                        				<th class="text-center" width='20%'>时间</th>
			                        				<th class="text-center" width='10%'>操作</th>
							                    </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for='(item,index) in evaluateDatas'>
							                        <td class="text-center">{{item.ROW_ID}}</td>
							                        <td class="text-center">{{item.userName}}</td>
													<td class="text-center">{{item.appName}}</td>
													<td class="text-center">{{item.moduleName}}</td>
													<td class="text-center">{{item.star}}</td>
													<td class="text-center">{{item.content}}</td>
													<td class="text-center">{{item.rtimes}}</td>
							                        <td class="text-center"><router-link :to="{path: 'evaluate/reply', query: { appcode:item.appcode,appId:item.appId, rtype:item.rtype, rstatus:item.rstatus, id:item.id, replyid:item.replyid}}" class="btn btn-info btn-xs margin-right-10"><i class="fa  fa-comment-o"></i> 回复 </router-link></td>
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
import '../bootstrap/js/foundation-datepicker.js';
require('pagination');
export default {
    components: {
      
    },
	data : function(){
		return {
			appList:'',		//查询所有应用应用
			evaluateDatas: [],
			currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）

			symbol:'',			//页面传字符串：'>' '<' '='等
			star:'',			//评论星级 最多5（5颗星）
			starttime:'',		//评论起始时间	
			endtime:'',			//评论截止时间	
			appcode: '',		//应用分类
			userName:'',		//评价人姓名
		}
	},
	created : function(){
		//查询所有应用应用
		let token = localStorage.getItem('token');
        $.get(window.config.api + "/app/queryList.do?token="+token,{})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.appList = data.obj;
        });  

		this.refresh();
	},
	mounted: function(){ 
		//起始日期选择插件  
		setTimeout(()=>{
			var nowTemp = new Date();
			var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
			var checkin = $('#dpd1').fdatepicker({
				onRender: function (date) {
					//return date.valueOf() < now.valueOf() ? 'disabled' : '';
				}
			}).on('changeDate', function (ev) {
				if (ev.date.valueOf() > checkout.date.valueOf()) {
					var newDate = new Date(ev.date)
					newDate.setDate(newDate.getDate() + 1);
					checkout.update(newDate);
				}
				checkin.hide();
				$('#dpd2')[0].focus();
			}).data('datepicker');
			var checkout = $('#dpd2').fdatepicker({
				onRender: function (date) {
					return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
				}
			}).on('changeDate', function (ev) {
				checkout.hide();
			}).data('datepicker');
		})    
       
    },   	
	methods : {
		refresh(){
			//展示应用评价信息
			let token = localStorage.getItem('token');
			//http://192.168.2.69:8080/cospace2017
	        $.get(window.config.api + "/appRetroaction/queryListByPage.do?token="+token,{currentPage:this.currentPage,pageSize:this.pageSize, symbol:this.symbol,	star:this.star,	starttime:this.starttime, endtime:this.endtime,	appcode: this.appcode,	userName:this.userName})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态 
	                //alert(1)                   
	                return false;
	            }
	            this.evaluateDatas = data.obj.records;
	            //console.log(this.evaluateDatas)
	            if(this.evaluateDatas == undefined){
	            	if(this.currentPage != 1){
	            		this.currentPage = this.currentPage-1;
	            		this.refresh(); 
	            	}
	            }
	            if(this.evaluateDatas == undefined && this.currentPage == 1){
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
        //条件初始化
        reset(){
        	this.currentPage = 1;    //当前显示页码（第几页，不传值，默认为1）    
            this.pageSize =10;       //每页显示多少条记录数（默认为10）

			this.symbol ='';			//页面传字符串：'>' '<' '='等
			this.star ='';			//评论星级 最多5（5颗星）
			this.starttime ='';		//评论起始时间	
			this.endtime ='';			//评论截止时间	
			this.appcode = '';		//应用分类
			this.userName ='';		//评价人姓名
			$("#dpd1").val("");
			$("#dpd2").val("");
			this.refresh();
        },
        searchDatas(){
        	//console.log($("#dpd1").val())
        	//console.log(this.starttime)
        	if($("#dpd1").val() != ""){
        		let arr1 = $("#dpd1").val().split("/");
        		this.starttime = arr1[2]+"-"+arr1[0]+"-"+arr1[1];
        		//console.log(this.starttime)
        	}
        	if($("#dpd2").val() != ""){
        		let arr2 = $("#dpd2").val().split("/");
        		this.endtime = arr2[2]+"-"+arr2[0]+"-"+arr2[1];
        		//console.log(this.endtime)
        	}
        	this.refresh();
        },
	}
}
</script>

<style scoped lang="sass">
.search{
  float: right;
  position: relative;
  top: -11px;
  text-align: right;
  .form-control{
    display:inline-block;
    vertical-align: middle;
    width: 150px;
  }
}
.dateTable{
	display: inline-block;
	position: relative;
	top: 11px;
	input{
		width: 120px !important;
		background: #fbfbfb url(../bootstrap/img/datePicker.gif) no-repeat right center;
	}
}
</style>
