<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：节假日管理
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="widget-body">
                <h5>新增分类</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<form class="form-horizontal">
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">分类名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="classifyName" v-model="typeDesc">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">分类编号<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="classifyCode"  v-model="typeCode">
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
           typeDesc : '',
           typeCode : '',
        }
    },
    created: function(){
        
    },
    methods: {
        confirm(){
            if(!this.typeDesc){
                $.dialog('请输入分类名称');
                return false;
            }
            if(!this.typeCode){
                $.dialog('请输入分类编号');
                return false;
            }
            //console.log(this.roleData)
            //新增角色信息请求
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/holidaysType/save.do?token="+token,{typeDesc:this.typeDesc,typeCode:this.typeCode})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //alert(data.success);
                let _this = this;
                $.dialog({
                    content : '添加分类成功，是否继续添加',
                    reverse: true,
                    ok : function() {
                        //document.location.reload();
                        _this.typeDesc = '';
                        _this.typeCode = '';
                    },
                    cancel : function() {
                        history.go(-1);
                    }
                });
            })                                   
        },
        
    }
}
</script>
