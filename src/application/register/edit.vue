<template>
<div class="page-content">
    <div class="page-header position-relative">
        <div class="header-title">
            <h1>
                <i class="fa fa-home"></i>
                当前位置：应用注册 / 应用信息
            </h1>
        </div>
    </div>
	<div class="page-body">
        <div class="widget-body">  
            <div class="row">          
                <ul class="no-padding-left margin-bottom-20 margin-left-10">
                    <router-link to="/application/register" class='btn btn-info'>
                      <i class='glyphicon glyphicon-circle-arrow-left'></i>返回列表
                    </router-link>
                    <router-link :to="{path:'/application/register/menu/index',query:{appCode:applyData.appCode,appId:applyData.appId}}" class='btn btn-danger'>
                        <i class='glyphicon glyphicon-list margin-right-5'></i>菜单管理    
                    </router-link> 
                    <router-link :to="{path:'/application/register/role/list',query:{appCode:applyData.appCode,appId:applyData.appId}}" class='btn btn-danger'>                                       
                        <i class='glyphicon glyphicon-user margin-right-5'></i>角色管理
                    </router-link>
                    <router-link :to="{path:'/application/register/parameter/list',query:{appCode:applyData.appCode,appId:applyData.appId}}" class='btn btn-danger'>                                 
                        <i class='glyphicon glyphicon-tags margin-right-5'></i>系统参数
                    </router-link>                    
                </ul>
                <div class='col-lg-offset-3 col-lg-6'>
                    <h5>应用信息</h5>
                    <hr class="margin-top-10">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <form class='form-horizontal'>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用编码<i class="red margin-left-5">*</i></label>
                                    <div class="col-lg-9">
                                        <input type="text" class="form-control" v-model="applyData.appCode" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用名称<i class="red margin-left-5">*</i></label>
                                    <div class="col-lg-9">
                                        <input type="text" class="form-control" v-model="applyData.appName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用管理员<i class="red margin-left-5">*</i></label>
                                    <div class="col-lg-9">
                                        <span class="input-icon icon-right inverted" data-toggle="modal" data-target="#modal-danger">
                                            <input type="text" class="form-control" v-model='userName' readonly>
                                            <i class="fa fa-user bg-darkorange"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用地址<i class="red margin-left-5">*</i></label>
                                    <div class="col-lg-9">
                                        <input type="text" class="form-control" v-model='applyData.appUrl'>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用类型</label>
                                    <div class="col-lg-9">
                                        <select class="form-control" v-model='applyData.appType'>
                                            <option :value="item.dictId" v-for="item in typeList">{{item.dictName}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用鉴权类型<i class="red margin-left-5">*</i></label>
                                    <div class="col-lg-9">
                                        <select class="form-control" v-model='applyData.appLinkType'>
                                            <option :value="item.dictId" v-for="item in detailRows">{{item.dictName}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用图标</label>
                                    <div class="col-lg-9">
                                        <select class="form-control" v-model="applyData.appIcon">
                                            <option v-for="item in applyIconData" v-bind:value="item.icon">{{item.icon.split("/").pop()}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">排序</label>
                                    <div class="col-lg-6 spinner">
                                        <button type="button" class="increase blue" @click="sort(1)"><i class="fa fa-chevron-up"></i></button>
                                        <button type="button" class="decrease danger" @click="sort(-1)"><i class="fa fa-chevron-down"></i></button>
                                        <input type="text" class="form-control" v-model="applyData.isOrder">
                                    </div>                                       
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">应用描述</label>
                                    <div class="col-lg-9">
                                        <textarea class="form-control" rows='4' v-model="applyData.remark"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-3 control-label">是否可用</label> 
                                    <div class="col-lg-9 clearfix">
                                        <div class="radio pull-left">
                                            <label class="no-padding-left">
                                                <input type="radio" class="colored-blue" value="0" v-model="applyData.isUse"> 
                                                <span class="text">是</span>
                                            </label>
                                        </div> 
                                        <div class="radio pull-left">
                                            <label>
                                                <input type="radio" class="colored-blue" value="1" v-model="applyData.isUse"> 
                                                <span class="text">否</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-3 col-lg-6">
                                        <button class="btn btn-info margin-right-10" type="button" @click="confirm()">确定</button>
                                        <router-link to="/application/register" class="btn btn-danger">取消</router-link>
                                    </div>
                                </div>            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>                                 
    </div>

    <!--选择部门人员 Modal Templates-->
    <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title">选择部门人员</h4>
                </div>
                <div class="modal-body" style="height:488px;overflow-y:auto;">
                    <!-- tree template -->
                    <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>                        
                    <template>
                        <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :isradio="true"></tree-view>
                    </template>
                    <!-- /tree template -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <!--End 选择部门人员 Modal Templates-->     
</div>
</template>

<script>
import tree from './editTree.vue';
export default {
    components: {
        'tree-view' : tree
    },
    data(){
        return{
            applyData: {
                appType:'02',
                isOrder: 0,
            },
            //应用管理员
            userName:'',
            //应用图标
            applyIconData: [],
            //应用分类
            typeList:'',
            //树结构数据
            treeData: [],
            //选中项数据
            activeData: [],
            vm: {},
            //应用管理员id
            appManagerId:'',
            //应用鉴权类型
            detailRows:''           
        }
    },
    created:function(){
        let token = localStorage.getItem('token');
        //应用类型数据
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token +"&dictCode=1002",{})
        .then(data=>{
            if(!data.success){
                return false
            }
            //alert(data.msg);
            this.typeList = data.obj;
        });

        //应用鉴权类型
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"5002"})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            //console.log(JSON.stringify(data));
            this.detailRows = data.obj;
        });  

        //这里获取树结构的数据
        $.get(window.config.api + "/dept/queryDeptUserTreeList.do?token="+token)
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.treeData = data.obj;
            $(".treeListLoad").remove();
        }); 
        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        this.$on('handleCallback', item=>{
            this.userName = item.name;
            this.appManagerId = item.id;                        
        });

        //获取应用图标下拉框的数据
        $.get(window.config.api + "/sysIcon/queryList.do?token=" + token)
        .then(data => {
        if (!data.success) {
          return false;
        }
        this.applyIconData = data.obj;
        });   

        setTimeout(()=>{
            //通过appId获取相对应的每条应用信息
            $.post(window.config.api + "/app/findInfoByParams.do?token=" + token, {appId:this.$route.params.id})
            .then(data => {
            if (!data.success) {
              return false;
            }
                this.applyData = data.obj;
                this.userName = this.applyData.userName;
            }); 
        })
        
    },
    methods: {
        sort: function(num){
            if(this.applyData.isOrder+num<0) return false;
            this.applyData.isOrder += num
        },
        //修改并保存应用信息
        confirm(){
            if(!this.applyData.appName){
                $.dialog('请输入应用名称');
                return false;
            }
            if(!this.userName){
                $.dialog('请选取应用管理员');
                return false;
            }
            if(!this.applyData.appUrl){
                $.dialog('请输入应用地址');
                return false;
            } 
            if(!this.applyData.appLinkType){
                $.dialog('请输入应用鉴权类型');
                return false;
            }
            
          let token = localStorage.getItem('token');
          $.post(window.config.api + "/app/saveAppOfAll.do?token=" + token,{appId:this.applyData.appId, appCode:this.applyData.appCode, appName:this.applyData.appName,userName:this.userName, appUrl:this.applyData.appUrl, appType:this.applyData.appType, appLinkType:this.applyData.appLinkType, appIcon:this.applyData.appIcon, isOrder:this.applyData.isOrder, remark:this.applyData.remark, isUse:this.applyData.isUse, appManagerId:this.appManagerId,  })
          .then(data => {
            if (!data.success) {
                return false
            }
            history.go(-1);
            $.dialog(data.msg);
          });
        }
    }
}
</script>

<style lang="sass">
.inverted .form-control[readonly], .inverted i{
    cursor: pointer;
}
</style>