<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：应用注册 / 角色管理 / 权限配置
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
            <!-- 顶部固定部分 -->
            <ul class="no-padding-left margin-bottom-20">
                <router-link :to="{path:'/application/register/role/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-info'>
                    <i class='glyphicon glyphicon-circle-arrow-left'></i>返回角色列表
                </router-link>
                <router-link :to="{path:'/application/register/menu/index',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                      <i class='glyphicon glyphicon-list'></i>菜单管理
                </router-link>
                <router-link :to="{path:'/application/register/parameter/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>                                 
                    <i class='glyphicon glyphicon-tags margin-right-5'></i>系统参数
                </router-link>
                <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'><i class='glyphicon glyphicon-pencil'></i>应用信息</router-link>
            </ul>
			<div class="row">
	            <div class="col-lg-4 col-sm-4 col-xs-12 margin-bottom-20">
	                <div class="widget flat radius-bordered">
	                    <div class="widget-header bg-lightred">
	                        <span class="widget-caption">系统菜单</span>
	                    </div>
	                    <div class="widget-body h350">
                            <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
	                    	<!-- tree template -->
							<template>
							    <tree-view :treedata="treeData" :activedata="activeData" :fuquanmoduleidlist="fuquanModuleIdList" :vm="vm"></tree-view>
							</template>
							<!-- /tree template -->
	                    </div>
	                </div>
	            </div>
	            <div class="col-lg-8 col-sm-8 col-xs-12">
                    <div>
                        <div class="widget flat radius-bordered">
                            <div class="widget-header bg-blue">
                                <span class="widget-caption">数据访问范围</span>
                            </div>
                            <div class="widget-body">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">当前模块<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-6">
                                            <input type="text" class="form-control" v-model="currentModule" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">访问范围<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-6">
                                            <select class="form-control" v-model="rangeCode">
                                                <option  class="form-control" value="system">全部</option>
                                                <option  class="form-control" value="subdepartment">部门及下级部门</option>
                                                <option  class="form-control" value="department">本人所在部门</option>
                                                <option  class="form-control" value="user">个人</option>
                                                <option  class="form-control" value="custom">自定义</option>
                                            </select>
                                            <div class="margin-top-10" style="margin:10px 0; padding:20px 10px; border:solid 1px #ddd; max-height:300px; overflow-y:auto;" v-show="rangeCode == 'custom'">
                                                <div class="col-lg-12 col-xs-12 treeListLoad2">数据正在加载中...</div>
                                                <!-- tree template -->
                                                <template>
                                                    <tree-view2 :treedata="treeData2" :activedata="activeData2" :vm="vm" :ischeckbox="true" :activeid="activeId"></tree-view2> 
                                                </template>
                                                <!-- /tree template -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-offset-3 col-lg-6">
                                           <button class="btn btn-info margin-right-10" type="button" v-on:click="confirm">保存</button>
                                            <button class="btn btn-danger" type="button" v-on:click="reset">重置</button>
                                        </div>
                                    </div>
                                </form>         
                            </div>
                        </div>
                    </div>
                    <div class="margin-top-20  margin-bottom-20">
                        <div class="widget flat radius-bordered">
                            <div class="widget-header bg-blue">
                                <span class="widget-caption">按钮操作权限</span>
                            </div>
                            <div class="widget-body">
                                <div class="btn btn-info btn-xs margin-bottom-10" data-toggle="modal" data-target="#modal-danger"><i class="fa fa-plus"></i>新增</div>
                                <div class="row">
                                    <div class="col-xs-12 col-md-12">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-bordered table-hover">
                                                <thead class="bordered-blue">
                                                    <tr>
                                                        <th class="text-align-center" with='30%'>按钮标题</th>
                                                        <th class="text-align-center" width='40%'>按钮编码</th>
                                                        <th class="text-align-center" width='30%'>操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for='item in buttonList'>
                                                        <td class="text-align-center">{{item.optName}}</td>
                                                        <td class="text-align-center">{{item.optCode}}</td>
                                                        <td class="text-align-center">
                                                            <a href="javascript:;" class="btn btn-danger btn-xs delete" v-on:click="cancelBtn(item)"><i class="fa fa-trash-o"></i>移除</a>
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
	    </div>

        <!--角色菜单赋权 Modal Templates-->
        <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                     <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">新增按钮操作</h4>
                      </div>
                      <div class="modal-body" style="height:350px;overflow-y:auto;">
                          <div class="table-scrollable">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead class="bordered-blue">
                                        <tr>
                                            <th class="text-align-center" width='20%'></th>
                                            <th class="text-align-center" with='40%'>按钮标题</th>
                                            <th class="text-align-center" width='40%'>按钮编码</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='item in buttonList2'>
                                            <td class="text-align-center">
                                                <label class="no-padding-left">
                                                    <input name="department" type="checkbox" class="colored-blue" v-on:click="addBtn(item)" :checked="addOptCodetnList.indexOf(item.optCode) != -1">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td class="text-align-center">{{item.optName}}</td>
                                            <td class="text-align-center">{{item.optCode}}</td>
                                        </tr>
                                    </tbody>
                                </table>                                  
                            </div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="confirmAddBtn">确定</button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="cancelAddBtn">取消</button>
                      </div>
                  </div>
                  <!-- /.modal-content -->
              </div>
          </div>
          <!--End 角色菜单赋权 Modal Templates-->
	</div>
</template>

<script>
import tree from './jurisdiction_tree1.vue';
import tree2 from './jurisdiction_tree2.vue';
export default {
    components: {
        'tree-view' : tree,
        'tree-view2' : tree2
    },
    data: ()=>({
        //树结构数据
        treeData: [],
        treeData2: [],
        //选中项数据
        activeData: [],
        activeData2: [],
        vm: {},
        //已经被赋权的id
        fuquanModuleIdList:[],

        //所有选中项ID
        activeId:[],

        //某个返回的item中的所有ID集合
        allIdListData:[],

        //当前模块名称
        currentModule:"",
        //当前模块ID
        currentModuleId:"",
        rangeCode:'system',   //访问范围编码
        //按钮列表
        buttonList:[],
        buttonList2:[],
        //新增按钮列表
        addOptCodetnList:[],
    }),
    created: function(){
        //这里获取树结构的数据
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/roleModule/queryModuleIdsByParams.do?token="+token,{appCode: this.$route.query.appCode,roleId: this.$route.query.roleId})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.fuquanModuleIdList = data.obj || [];
            console.log(JSON.stringify(data))
            $.get(window.config.api + "/module/queryModuleTreeVList.do?token="+token,{appCode: this.$route.query.appCode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.treeData = data.obj;
                //console.log(JSON.stringify(data))
                $(".treeListLoad").remove();
            });
        });


        
        this.deptChoose();

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        let _this = this;
        this.$on('handleCallback', item =>{
            if(this.fuquanModuleIdList.indexOf(item.moduleId) == -1){
                $.dialog("当前角色未赋权该菜单，请先赋权");
                return false;
            }
            //更新选中项
            //this.activeData.length = 0;
            let idx = this.activeData.indexOf(item.moduleId);
            if(idx !== -1){
                this.activeData.splice(idx,1);
            }
            else{
                this.activeData.push(item.moduleId);               
            }

            this.currentModule = item.moduleName;
            this.currentModuleId = item.moduleId;

            this.refresh();
            this.findRecord();
            this.rangeCode = "system";
        });

        //处理选中项数据
        this.$on('handleCallback2', item =>{
            //某个返回的item中的所有ID集合/Name集合
            this.allIdListData = [];
            this.allIdList(item);
            //某项菜单选中后的索引值
            let idx = this.activeId.indexOf(item.id);
            if(idx != -1){
                //此项之前已被选中 -> 将此项的所有数据从之前的数组删除
                $.each(this.allIdListData,function(index,value){
                    let idx0 = _this.activeId.indexOf(value);
                    if(idx0 !== -1){
                        _this.activeId.splice(idx0,1);
                    }
                }); 
            }else{
                //此项之前未被选中 -> 将此项的所有数据添加到之前的数组中 -> 数组合并存在重复数据
                this.activeId = this.arrayNoRepeat(this.activeId.concat(this.allIdListData));
            }
        }) 
    },
    methods: {
        refresh(){
            //根据应用和菜单查询菜单下的按钮信息
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/sysModuleOpt/queryList.do?token="+token,{appCode:this.$route.query.appCode, moduleId:this.currentModuleId, roleId:this.$route.query.roleId})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //console.log(JSON.stringify(data));
                let arr = data.obj || [""];
                this.buttonList = arr.filter(item=>item.checked==true);
                this.buttonList2 = arr.filter(item=>item.checked==false);
            });
        },
        findRecord(){
            //根据参数查询单条角色菜单数据范围中间表记录信息
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/roleModule/getRoleModuleByParams.do?token="+token,{appCode:this.$route.query.appCode, moduleId:this.currentModuleId, roleId:this.$route.query.roleId})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //console.log(JSON.stringify(data));
                if(data.obj){
                    this.activeId = data.obj.depts || [];
                    this.rangeCode = data.obj.rangeCode
                }else{
                    this.activeId = [];
                }  
            });
        },
        deptChoose(){
            //这里获取树结构的数据
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/dept/queryDeptTreeList.do?token="+token)
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //console.log(JSON.stringify(data));
                this.treeData2 = data.obj;
                $(".treeListLoad2").remove();
            });
        },
        //某个返回的item中的所有ID集合/Name集合
        allIdList(item){
            let _this = this;
            this.allIdListData.push(item.id);
            if(item.childrenList){
                $.each(item.childrenList,function(index,value){
                    _this.allIdList(value);
                });
            }
        },
        //数组去重
        arrayNoRepeat(array){
            let arr = array;
            let returnArray = [];
            let obj = {}; //key: value
            for(let i =0; i < arr.length; i++) {
                obj[arr[i]] = arr[i];
            }
            for(var key in obj) {
                returnArray.push(key);
            }//取出key
            return returnArray;
        },

        //访问范围
        confirm(){
            if(this.rangeCode == 'custom' && !this.activeId.length){
                $.dialog('请勾选可以访问的部门');
                return false;
            }
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/roleModule/saveSysRoleModuleRange.do?token="+token,{appCode:this.$route.query.appCode, roleId:this.$route.query.roleId, moduleId:this.currentModuleId, deptIds:this.activeId, rangeCode:this.rangeCode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                $.dialog(data.msg);
            })                                   
        },
        reset(){
            this.activeId = [];
        },

        //按钮移除
        cancelBtn(item){
            let _this = this;
            let token = localStorage.getItem('token');            
            $.post(window.config.api + "/sysRoleModuleOpt/deleteModuleRoleOpt.do?token="+token,{appCode:this.$route.query.appCode, moduleId:this.currentModuleId, roleId:this.$route.query.roleId, optCode:item.optCode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                //console.log(JSON.stringify(data))
                $.dialog(data.msg);
                _this.refresh();
            })    
        },
        //按钮新增
        addBtn(item){
            let idx = this.addOptCodetnList.indexOf(item.optCode);
            if(idx !== -1){
                this.addOptCodetnList.splice(idx,1);
            }
            else{
                this.addOptCodetnList.push(item.optCode);               
            }
        },
        confirmAddBtn(){
            let _this = this;
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/sysRoleModuleOpt/saveModuleRoleOpt.do?token="+token,{appCode:this.$route.query.appCode, moduleId:this.currentModuleId, roleId:this.$route.query.roleId, opts:this.addOptCodetnList})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                //console.log(JSON.stringify(data))
                $.dialog(data.msg);
                _this.refresh();
                _this.addOptCodetnList = [];
            })    
        },
        cancelAddBtn(){
            this.addOptCodetnList = [];
        },
        
    }
}
</script>

<style lang="sass">
.h350{
    min-height: 350px;
    max-height: 943px;
    overflow-y: auto;
}    
</style>

