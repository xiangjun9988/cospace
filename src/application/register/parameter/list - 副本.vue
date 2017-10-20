<template>
<div class="page-content">
  <div class="page-header position-relative">
      <div class="header-title">
          <h1>
              <i class="fa fa-home"></i>
              当前位置：应用注册 / 系统参数
          </h1>
      </div>
  </div>
  <div class="page-body">
      <div class="widget-body">
          <div class="row">  
              <div class="col-xs-12 col-md-12">
                <!-- 顶部固定部分 -->
                <ul class="no-padding-left">
                    <router-link to="/application/register" class='btn btn-info'>
                      <i class='glyphicon glyphicon-circle-arrow-left'></i>返回列表
                    </router-link>
                    <router-link :to="{path:'/application/register/menu/index',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                      <i class='glyphicon glyphicon-list'></i>菜单管理
                    </router-link>
                    <router-link :to="{path:'/application/register/role/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                            <i class='glyphicon glyphicon-list'></i>角色管理
                        </router-link>
                    <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'><i class='glyphicon glyphicon-pencil'></i>应用信息</router-link>
                </ul>
                <router-link :to="{path:'/application/register/parameter/add',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class="btn btn-blue margin-top-10 margin-bottom-10"><i class='fa fa-plus'></i>新增</router-link> 
                <div class="search m-search">
                    <input type="text" class="form-control m-personnel-right"  placeholder="请输入参数名称" style="width:180px;" v-model="searchName">
                    <a href="javascript:;" class="btn btn-info" v-on:click="searchList"><i class="fa fa-search"></i>搜索</a>
                    <a href="javascript:;" class="btn btn-danger" v-on:click="reset"><i class="fa fa-refresh"></i>重置</a>                        
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-12">
                        <div class="table-scrollable">
                          <table class="table table-striped table-bordered table-hover">
                            <thead class="bordered-blue">
                              <tr>
                                  <th class="text-align-center" width='20%'>参数名称</th>
                                  <th class="text-align-center" width='10%'>参数键</th>
                                  <th class="text-align-center" width='20%'>参数值</th>
                                  <th class="text-align-center" width='10%'>应用编码</th>
                                  <th class="text-align-center" width='20%'>修改时间</th>
                                  <th class="text-align-center" width='15%'>操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for='item in dataList'>
                                  <td class="text-align-center">{{item.paramName}}</td>
                                  <td class="text-align-center">{{item.paramKey}}</td>
                                  <td class="text-align-center">{{item.paramValue}}</td>
                                  <td class="text-align-center">{{item.appCode=="COSPACE"?"系统缺省参数":item.appCode}}</td>
                                  <td class="text-align-center">{{item.updateDate}}</td>
                                  <td>
                                  <router-link :to="{path:'/application/register/parameter/edit',query:{appCode:$route.query.appCode,appId:$route.query.appId,roleId:item.roleId, paramId:item.paramId}}" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i>编辑</router-link>
                                    <button type="button" class="btn btn-danger delete btn-sm"  v-on:click="deleteData(item)" v-if="item.appCode!='COSPACE'"><i class="fa fa-trash-o"></i>删除</button>
                                  </td>
                              </tr>
                            </tbody>
                          </table>                                  
                        </div>
                        <!-- 分页信息 -->
                        <div class="pageBox"></div>
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
  data() {
    return { 
      dataList: [],
      searchName:'',       //模糊搜索参数名称    
      currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
      pageSize:10,       //每页显示多少条记录数（默认为10）
    }
  },
  created: function() {
    this.refresh(); 
  },
  methods: {
    refresh(){
      let token = localStorage.getItem('token');
      //console.log(this.roleName)
      $.get(window.config.api + "/sysParameterConfig/queryListByPage.do?token="+token,{paramName:this.searchName,currentPage:this.currentPage,pageSize:this.pageSize})
      .then(data=>{
          if(!data.success){
              //返回错误状态                    
              return false;
          }
          this.dataList = data.obj.records;
          console.log(JSON.stringify(data.obj.records));
          if(this.dataList == undefined && this.currentPage != 1){
              this.currentPage = this.currentPage-1;
              this.refresh(); 
          }
          if(this.dataList == undefined && this.currentPage == 1){
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
    //角色关键词搜索
    searchList(){
        this.currentPage = 1;
        this.refresh(); 
    },
    reset(){
        this.searchName = "",
        this.pageSize = 10;
        this.currentPage = 1;
        this.refresh(); 
    },

    //删除
    deleteData(item){
        let _this = this,
            token = localStorage.getItem('token');
        //删除角色信息请求
        $.dialog({
            content : "您是否确认删除此条信息？",
            reverse: true,
            ok : function() {
                $.post(window.config.api + "/sysParameterConfig/delete.do?token="+token,{id:item.paramId})            
                .then(data=>{
                    if(!data.success){
                        //返回错误状态                    
                        return false;
                    }
                    $.dialog(data.msg),
                    _this.refresh();
                })    
            },
            cancel : function() {
               
            }
        });
                
    },
                 
  }  
}
</script>

<style lang="sass">
.search{
  float: right;
  text-align: right;
  .form-control{
    display: inline-block;
    vertical-align: middle;
  } 
}
</style>

