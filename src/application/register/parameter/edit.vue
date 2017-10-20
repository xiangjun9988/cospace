<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用注册 / 系统参数 / 修改
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                <!-- 顶部固定部分 -->
                <ul class="no-padding-left margin-bottom-20">
                    <router-link :to="{path:'/application/register/menu/index',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                      <i class='glyphicon glyphicon-list'></i>菜单管理
                    </router-link>
                    <router-link :to="{path:'/application/register/role/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                            <i class='glyphicon glyphicon-user'></i>角色管理
                        </router-link>
                    <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'><i class='glyphicon glyphicon-pencil'></i>应用信息</router-link>
                </ul>

                <h5>系统参数</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-push-1 col-md-push-1 col-sm-push-1 col-xs-push-1">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>参数键：</label>
                                <div class="col-lg-4">
                                    <div style="margin-top: 7px;">{{parameter.paramKey}}</div>
                                </div>
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>应用编码：</label>
                                <div class="col-lg-4">
                                    <div style="margin-top: 7px;">{{parameter.appCode}}</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>参数名称:</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="请输入参数名称" v-model="parameter.paramName">
                                </div>
                            </div>  
                            <div class="form-group">
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>参数值:</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="请输入参数值" v-model="parameter.paramValue">
                                </div>
                            </div>                           
                            <div class="form-group">
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>排序号:</label>
                                <div class="col-lg-4">
                                    <input type="number" min="0" class="form-control" v-model="parameter.isOrder">
                                </div>
                                <label class="col-lg-2 control-label"><i class="red margin-left-5">*</i>是否可用:</label> 
                                <div class="col-lg-4 clearfix">
                                    <div class="radio pull-left">
                                        <label class="no-padding-left">
                                            <input type="radio" class="colored-blue" value="0" v-model="parameter.isUse"> 
                                            <span class="text" value="0">启用</span>
                                        </label>
                                    </div> 
                                    <div class="radio pull-left">
                                        <label>
                                            <input type="radio" class="colored-blue" value="1" v-model="parameter.isUse"> 
                                            <span class="text" value="1">停用</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">备注:</label>
                                <div class="col-lg-10">
                                    <textarea rows="4" class="form-control" placeholder="请输入备注" v-model="parameter.remark"></textarea>
                                </div>
                            </div> 
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button" @click="confirm()">保存</button>
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
            parameter : {
                paramName : "",   //参数名称    
                paramKey : "",   //参数键 
                paramValue : "",   //参数值 
                isOrder : 0,   //排序号（0：启用 ；1：禁用） 
                isUse : "0",   //是否可用    
                remark : "",  //备注  
                //id : "",  //参数ID（编辑时必填）
            },
        }
    },
    created: function() {
        let token = localStorage.getItem('token');
        $.post(window.config.api + "/sysParameterConfig/findInfoById.do?token="+token,{id:this.$route.query.paramId})    
        .then(data=>{ 
            if(!data.success){
                //返回错误状态 
                return false;
            }
            //console.log(JSON.stringify(data))
            this.parameter = data.obj;
        })
    },
    methods: {
        confirm(){
            if(!this.parameter.paramName){
                $.dialog('请输入参数名称');
                return false;
            } 
            if(!this.parameter.paramValue){
                $.dialog('请输入参数值');
                return false;
            }
                       
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/sysParameterConfig/save.do?token="+token,{paramKey:this.parameter.paramKey, appCode:this.$route.query.appCode, paramName:this.parameter.paramName, paramValue:this.parameter.paramValue, isOrder:this.parameter.isOrder, isUse:this.parameter.isUse, remark:this.parameter.remark, id:this.$route.query.paramId})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    $.dialog(data.msg);                   
                    return false;
                }
                $.dialog({
                    content : data.msg,
                    ok : function() {
                        history.go(-1);
                    }
                });
            })                    
        }
    }
}
</script>


