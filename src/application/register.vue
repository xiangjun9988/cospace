 <template>
    <div class="page-content">
		    <div class="page-header position-relative">
		        <div class="header-title">
		            <h1>
		                <i class="fa fa-home"></i>
		                当前位置：应用注册
		            </h1>
		        </div>
		    </div>	
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="row margin-bottom-30">
                        <div class="col-lg-6 col-xs-12">
										    		<router-link to="register/add" class="btn btn-info"><i class="fa fa-plus"></i>新增</span></router-link>
										    		<span class="margin-left-20" >应用分类：
											    			<select v-model='appType' v-on:change="changeType">
                                    <option value="">请选择</option>
                                    <template v-for="item in applyData">
                                        <option :value="item.dictId">{{item.dictName}}</option>
                                    </template>
						                    </select>
										    		</span>
                        </div>
                        <div class="col-lg-6 col-xs-12 text-align-right">
                            <input type="text" class="form-control" v-model="searchKey" placeholder="请输入应用名称" style="display:inline-block; vertical-align:middle; width:50%;">
                            <button type="button" class="btn btn-blue" @click="refresh()"><i class="fa fa-search"></i> 搜索 </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-xs-4 module" v-for="(item,index) in modules">
										    		<template v-if="item.isUse == 0">
										    				<router-link :to="'/application/register/edit/'+item.appId"><img class="bg-lightgray padding-20" v-bind:src="api+'/'+ item.appIcon +'?token=' + token"></router-link>
												    		<h4 v-bind:title="item.appName">{{item.appName}}</h4>
                                <router-link :to="'/application/register/edit/'+item.appId" class='btn btn-info'><i class="glyphicon glyphicon-cog"></i>管理</router-link>
                                <span class='btn btn-danger' @click="disabled(item)"><i class='glyphicon glyphicon-remove'></i>停用</span>
                            </template>
										    		<template v-else>
                                <h4 v-bind:title="item.appName">{{item.appName}}</h4>
                                <span  class='btn btn-info' @click="enabled(item)"><i class="glyphicon glyphicon-cog"></i>启用</span>
											    			<span  class='btn btn-danger' @click="removeItem(index,item.appCode,item.appId)"><i class='glyphicon glyphicon-remove'></i>删除</span>
										    		</template>
                        </div>                    		
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
   		return {
        api: '',
        //源数据
        token: '',        
        //应用分类数据
        applyData: [],
        //应用分类type
        appType: '',
        //模糊搜索处理
        searchKey: '',
        //所有应用模块数据
   			modules: []			
   		}	 
    },
    created: function(){
      //通过dictCode获取应用分类下拉框的数据
      this.api = window.config.api;
      let token = localStorage.getItem('token');
      this.token = token; 
      $.post(window.config.api + "/dictInfo/queryList.do?token=" + token,{dictCode:"1002"})
      .then(data => {
        if (!data.success) {
          return false
        }
        this.applyData = data.obj;
      });

      //初始化加载应用模块数据
      this.refresh();			
		},
	  methods : {
        refresh(){
          //获取所有应用,并根据应用分类类型和模糊搜索进行筛选
          let token = localStorage.getItem('token');      
          $.get(window.config.api + "/app/queryList.do?token=" + token)
          .then(data => {
            if (!data.success) {
              return false
            }
            //建立新数组
            let newArray = [];
            $.each(data.obj, (index, value) => { 
              if(value.appName.indexOf(this.searchKey) != -1 && (value.appType == this.appType || this.appType == "")){                  
                  newArray.push(value);
              }
            });
            this.modules = newArray;
            //console.log(JSON.stringify(this.modules));
          });          
        },

        //应用分类类型筛选
        changeType(){
          this.refresh();
        },
        searchKey(){
          this.refresh();
        },
        //点击停用
        disabled(item){
          $.dialog({
              content : '当前应用停用，工作流也将停用，是否继续？',
              ok : function() {
                item.isUse = "";
                item.isUse = !item.isUse;   
                let token = localStorage.getItem('token');
                $.post(window.config.api + "/app/save.do?token=" + token,{isUse:'1',appId:item.appId})
                .then(data => {
                  if (!data.success) {
                    return false;
                  }
                }); 
              },
              cancel : function() {}                  
           })                    
        },
        //点击启用
        enabled(item){
          $.dialog({
              content : '当前应用启用，工作流也将启用，是否继续？',
              ok : function() {
                item.isUse = !item.isUse; 
                let token = localStorage.getItem('token');
                $.post(window.config.api + "/app/save.do?token=" + token,{isUse:'0',appId:item.appId})
                .then(data => {
                  if (!data.success) {
                    return false;
                  }
                });        
              },
              cancel : function() {}                  
           })
        }, 
        removeItem:function(index,appCode,appId){
          var _this = this;
          let token = localStorage.getItem('token');
          $.post(window.config.api + "/app/deleteAppOfAll.do?token=" + token,{appCode:appCode,appId:appId})
          .then(data => {
            if (!data.success) {
              return false
            }
            $.dialog({
              content: "当前应用删除，工作流也将删除，是否继续？",
              ok: function() {
                _this.modules.splice(index,1);
                $.dialog(data.msg);
              },
              cancel: function() {}
            }) 
          });     
        },                      
	  } 
}
</script>

<style lang="sass">
.module{
		height: 224px;
    text-align: center;
    .btn{
        margin: 10px 0 80px;
    }
}
</style>
