<template>
<div class="page-content">
  <div class="page-header position-relative">
      <div class="header-title">
          <h1>
              <i class="fa fa-home"></i>
              当前位置：应用注册 / 角色管理
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
                    <router-link :to="{path:'/application/register/parameter/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>                                 
                        <i class='glyphicon glyphicon-tags margin-right-5'></i>系统参数
                    </router-link>
                    <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'><i class='glyphicon glyphicon-pencil'></i>应用信息</router-link>
                </ul>

                <router-link :to="{path:'/application/register/role/add/'+$route.query.appCode,query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class="btn btn-blue margin-top-10 margin-bottom-10">                                 
                    <i class="fa fa-plus"></i>新增
                </router-link>
                                
                <div class="row">
                    <div class="col-xs-12 col-md-12">
                        <div class="table-scrollable">
                          <table class="table table-striped table-bordered table-hover">
                            <thead class="bordered-blue">
                              <tr>
                                  <th width='20%'>角色名称</th>
                                  <th width='15%'>角色编码</th>
                                  <th width='30%'>角色描述</th>
                                  <th width='10%'>角色类别</th>
                                  <th width='10%'>是否可用</th>
                                  <th class="text-align-center" width='15%'>操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for='item in roleData'>
                                  <td>{{item.roleName}}</td>
                                  <td>{{item.roleCode}}</td>
                                  <td>{{item.remark}}</td>
                                  <td>应用级</td>
                                  <td v-bind:class="{'red':parseInt(item.isUse), 'blue':!parseInt(item.isUse)}">{{parseInt(item.isUse)?"否":"是"}}</td>
                                  <td>
                                    <router-link :to="{path:'/application/register/role/edit',query:{appCode:$route.query.appCode,appId:$route.query.appId,roleId:item.roleId}}" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i>编辑</router-link>
                                    <button class="btn btn-info btn-xs margin-right-10" data-toggle="modal" data-target="#modal-danger" @click="fuquan(item.roleId)"><i class="fa fa-plus"></i>赋权</button>
                                    <router-link :to="{path:'/application/register/role/assigne',query:{appCode:$route.query.appCode,appId:$route.query.appId,roleId:item.roleId}}" class="btn btn-info btn-xs"><i class='fa fa-glass'></i>分配</router-link>
                                    <router-link :to="{path:'/application/register/role/jurisdiction',query:{appCode:$route.query.appCode,appId:$route.query.appId,roleId:item.roleId}}" class="btn btn-info btn-xs"><i class='fa fa-wrench'></i>权限配置</router-link>
                                    
                                    <!--
                                    <router-link to="../data" class='btn btn-info btn-xs margin-right-10'><i class='fa fa-glass'></i>数据权限</router-link>
                                    <router-link to="../service" class='btn btn-info btn-xs'><i class='fa fa-glass'></i>服务权限</router-link>
                                    -->
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

  <!--角色菜单赋权 Modal Templates-->
  <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">×</button>
                  <h4 class="modal-title">角色菜单赋权</h4>
              </div>
              <div class="modal-body" style="height:488px;overflow-y:auto;">
                  <!-- tree template -->
                  <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                  <template>
                      <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :ischeckbox="true" :activeid="activeId"></tree-view>
                  </template>
                  <!-- /tree template -->
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-info" data-dismiss="modal" @click="saveRoleModule()">确定</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
              </div>
          </div>
          <!-- /.modal-content -->
      </div>
  </div>
  <!--End 角色菜单赋权 Modal Templates-->
</div>    
</template>

<script>
require('pagination');
import tree from './tree.vue';
export default {
  components: {
      'tree-view': tree
  },  
  data() {
    return { 
      //树结构数据           
      treeData: [],
      //选中项数据
      activeData: [],
      //所有checkbox选中项ID
      activeId:[],      
      vm: {},               
      //列表
      queryData: Object.assign({}, this.$route.query),
      roleData: {
        roleId: ''
      },
      roleId:"",
    }
  },
  created: function() {
    this.getList();
    this.$watch('$route.fullPath', this.getList); 

    //将树的顶级目录传进去用于分发事件
    this.vm = this;
    this.$on('handleCallback', item =>{
        //更新选中项
        let idx = this.activeId.indexOf(item.moduleId);
        if(idx !== -1){
            this.activeId.splice(idx,1);
        }
        else{
            this.activeId.push(item.moduleId);               
        }
    });    
  },
  methods: {
    getList(){
      let token = localStorage.getItem('token');
      //列表数据的渲染和分页的处理      
      $.post(window.config.api + "/role/queryListByPage.do?token=" + token, this.queryData)
      .then(data => {
        if (!data.success) {
          return false
        }
        this.roleData = data.obj.records;

        if(this.roleData == undefined){
            $(".pageBox").html('<div class="noData">抱歉，暂无数据！</div>');
        }
        else{
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
        pageIndex: isNaN(this.queryData.currentPage-1) ? 0 : this.queryData.currentPage-1,
        pageSize: isNaN(this.queryData.pageSize) ? 10 : this.queryData.pageSize,
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
        that.updatePage(data);
      }).on("pageSizeChanged", function(event, data) {
        that.updatePage(data);
      }).on("jumpClicked", function(event, data){
        that.updatePage(data);
      });
    },
    updatePage: function(data, flag){
        //更新queryData
        Object.assign(this.queryData, {
          currentPage: data.pageIndex+1,
          pageSize: data.pageSize,
        });
        this.refreshRouter();
    },
    refreshRouter(){
      //切换分页
      this.$router.push(this.$route.path  + '?' + util.serialize(this.queryData));
    },
    fuquan(roleId){
      this.roleId = roleId;
      //点击赋权时根据应用和角色查询菜单树      
      let token = localStorage.getItem('token');
      $.post(window.config.api + "/roleModule/queryModuleTreeList.do?token="+token,{appCode:this.$route.query.appCode,roleId:roleId})
      .then(data=>{
          if(!data.success){
              //返回错误状态                    
              return false;
          }
          this.treeData = data.obj;           
          $(".treeListLoad").remove();

          //供根据某应用某角色查询可用菜单树所用（返回已进行角色赋权菜单操作的菜单id集合）
          let token = localStorage.getItem('token');
          $.get(window.config.api + "/roleModule/queryModuleIdsByParams.do?token="+token,{appCode:this.$route.query.appCode, roleId:roleId})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                console.log(JSON.stringify(data));
                if(data.obj){
                    this.activeId = data.obj || [];
                }else{
                    this.activeId = [];
                }  
            });                      
      });


    },
    saveRoleModule(){
      let token = localStorage.getItem('token');
      $.post(window.config.api + "/roleModule/saveRoleModule.do?token="+token,{appCode:this.$route.query.appCode,roleId:this.roleId,moduleIds:(this.activeId).join()})
      .then(data=>{
          if(!data.success){
            $.dialog(data.msg);
            return false
          }
          $.dialog(data.msg);
      });      
    }     
               
  }  
}
</script>

