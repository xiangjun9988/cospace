<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：角色管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                <h5>角色信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="roleName"  v-model="roleData.roleName" v-on:change="checkName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色编码<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="roleCode"  v-model="roleData.roleCode"  v-on:change="checkCode">
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">角色描述</label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control"  v-model="roleData.remark"></textarea>
                                </div>
                            </div>                          
                            <div class="form-group">
                                <label class="col-lg-3 control-label">是否可用</label> 
                                <div class="col-lg-9 clearfix">
                                    <div class="radio pull-left">
                                        <label class="no-padding-left">
                                            <input name="is_use" type="radio" checked="checked" class="colored-blue" value="0" v-model="roleData.isUse"> 
                                            <span class="text">是</span>
                                        </label>
                                    </div> 
                                    <div class="radio pull-left">
                                        <label>
                                            <input name="is_use" type="radio" class="colored-blue"  value="1" v-model="roleData.isUse"> 
                                            <span class="text">否</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                    <button class="btn btn-info margin-right-10" type="button" v-on:click="confirm()">确定</button>
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
    data(){
        return {
            roleData: {
                "isUse": "0",
            },
        }
    },
    created: function(){
        
    },
    methods: {
        checkName(){
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleName:this.roleData.roleName})            
            .then(data=>{
                
                if(!data.success){
                    //返回错误状态 
                    $.dialog(data.msg);                   
                    return false;
                }
            })
        },
        checkCode(){
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleCode:this.roleData.roleCode})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    $.dialog(data.msg);                   
                    return false;
                }
            })
        },
        confirm(){
            if(!this.roleData.roleName){
                $.dialog('请输入角色名称');
                return false;
            }
            if(!this.roleData.roleCode){
                $.dialog('请输入角色编码');
                return false;
            }
            //console.log(this.roleData)
            
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleName:this.roleData.roleName})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    $.dialog(data.msg);                   
                    return false;
                }

                $.post(window.config.api + "/role/queryRoleByParams.do?token="+token,{roleCode:this.roleData.roleCode})            
                .then(data=>{
                    if(!data.success){
                        //返回错误状态 
                        $.dialog(data.msg);                   
                        return false;
                    }

                    //新增角色信息请求
                    $.post(window.config.api + "/role/save.do",{token,roleName:this.roleData.roleName,roleCode:this.roleData.roleCode,remark:this.roleData.remark,isUse:this.roleData.isUse,appCode:'COSPACE'})            
                    .then(data=>{
                        if(!data.success){
                            //返回错误状态                    
                            return false;
                        }
                        //alert(data.success);
                        let _this = this;
                        $.dialog({
                            content : '添加角色成功，是否继续添加',
                            reverse: true,
                            ok : function() {
                                //document.location.reload();
                                _this.roleData={"isUse": "0"};
                            },
                            cancel : function() {
                                history.go(-1);
                            }
                        });
                    })  
                })
            })
     
        },
    }
}
</script>