<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：区划管理 / 新增
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                <h5>新增区划信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">地区名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="areaData.areaName" placeholder="请输入地区名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">区划编码<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="areaData.areaCode" placeholder="请输入区划编码">
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">地区级别<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="areaData.areaLevel" placeholder="请输入地区级别">
                                </div>
                            </div>                          
                            <div class="form-group">
                                <label class="col-lg-3 control-label">父区划编码</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="areaData.parentId" placeholder="请输入父区划编码">
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
        return{
            areaData: {}
        }
    },
    methods: {
        confirm(){
            if(!this.areaData.areaName){
                $.dialog('请输入地区名称');
                return false;
            }
            if(!this.areaData.areaCode){
                $.dialog('请输入区划编码');
                return false;
            } 
            if(!this.areaData.areaLevel){
                $.dialog('请输入地区级别');
                return false;
            }             
            let token = localStorage.getItem('token');           
            $.post(window.config.api + "/areaCode/save.do?token="+token,{areaName:this.areaData.areaName,areaCode:this.areaData.areaCode,areaLevel:this.areaData.areaLevel,parentId:this.areaData.parentId})
            .then(data=>{
                if(!data.success){
                    return false
                }
                $.dialog({
                    content : '保存成功！',
                    ok : function() {
                        history.go(-1);
                    }
                });
            });
        }
    }
}
</script>