<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用注册 / 角色管理 / 编辑
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
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

                <h5>角色信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="roleData.roleName"  v-on:change="checkName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色编号<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="roleData.roleCode" readonly>
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色描述</label>
                                <div class="col-lg-6">
                                    <textarea rows="4" class="form-control" v-model="roleData.remark"></textarea>
                                </div>
                            </div>                          
                            <div class="form-group">
                                <label class="col-lg-3 control-label">是否可用</label> 
                                <div class="col-lg-9 clearfix">
                                    <div class="radio pull-left">
                                        <label class="no-padding-left">
                                            <input type="radio" class="colored-blue" value="0" v-model="roleData.isUse"> 
                                            <span class="text">是</span>
                                        </label>
                                    </div> 
                                    <div class="radio pull-left">
                                        <label>
                                            <input type="radio" class="colored-blue" value="1" v-model="roleData.isUse"> 
                                            <span class="text">否</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button" @click="confirm()">确定</button>
                                    <button class="btn btn-danger" type="button" onclick="history.go(-1);">取消</button>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div> 
            </div>                                 
        </div> 
    </div>
</template>

<script>
export default{
    data() {
        return {
           roleData: {},
           infoName:"",
        }
    },
    created: function(){ 
        let token = localStorage.getItem('token');
        $.post(window.config.api + "/role/findInfoByParams.do?token="+token,{roleId:this.$route.query.roleId,appId:this.$route.query.appId})
        .then(data=>{
            if(!data.success){
                //返回错误状态 
                $.dialog(data.msg);                   
                return false;
            } 
            this.roleData = data.obj;   
            this.infoName = this.roleData.roleName;      
            //this.roleData = data.obj.filter(item=>item.roleId === this.$route.params.id)[0]; 

        });           
    },
    methods: {
        checkName(){
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleName:this.roleData.roleName,appCode:this.roleData.appCode})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    $.dialog(data.msg);                   
                    return false;
                }
            })
        },
        //修改角色信息并保存
        confirm(){
            if(!this.roleData.roleName){
                $.dialog('请输入角色名称');
                return false;
            } 
            let token = localStorage.getItem('token');
            if(this.infoName == this.roleData.roleName){
                //编辑角色信息请求
                $.post(window.config.api + "/role/save.do?token="+token,{roleId:this.roleData.roleId,roleName:this.roleData.roleName,roleCode:this.roleData.roleCode,remark:this.roleData.remark,isUse:this.roleData.isUse,appCode:this.roleData.appCode})            
                .then(data=>{
                    if(!data.success){                    
                        return false;
                    }
                    $.dialog({
                        content : '系统角色编辑成功！',
                        ok : function() {
                            history.go(-1);
                        }
                    });
                })      
            }else{
                $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleName:this.roleData.roleName, appCode:this.roleData.appCode})            
                .then(data=>{
                    if(!data.success){
                        //返回错误状态 
                        $.dialog(data.msg);                   
                        return false;
                    }

                    //编辑角色信息请求
                    $.post(window.config.api + "/role/save.do?token="+token,{roleId:this.roleData.roleId,roleName:this.roleData.roleName,roleCode:this.roleData.roleCode,remark:this.roleData.remark,isUse:this.roleData.isUse,appCode:this.roleData.appCode})            
                    .then(data=>{
                        if(!data.success){                    
                            return false;
                        }
                        $.dialog({
                            content : '系统角色编辑成功！',
                            ok : function() {
                                history.go(-1);
                            }
                        });
                    })      
                })

            }

                            
        }
    }
}
</script>


