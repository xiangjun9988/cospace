<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据字典
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="widget-body">
                <h5>新增字典分类</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<form class="form-horizontal">
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">分类编号<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="bookCode" v-model="wordBookData.dictCode">
                                </div>
                            </div>
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">分类名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="bookName" v-model="wordBookData.dictName">
                                </div>
                            </div>
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">分类说明</label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control" v-model="wordBookData.remark"></textarea>
                                </div>
                            </div>                          
							<div class="form-group">
								<label class="col-lg-3 control-label">是否可用</label> 
								<div class="col-lg-9 clearfix">
									<div class="radio pull-left">
                                        <label class="no-padding-left">
                                            <input name="is_use" type="radio" checked="checked" class="colored-blue" value="0" v-model="wordBookData.isUse"> 
                                            <span class="text">是</span>
                                        </label>
                                    </div> 
                                    <div class="radio pull-left">
                                        <label>
                                            <input name="is_use" type="radio" class="colored-blue"  value="1" v-model="wordBookData.isUse"> 
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
            wordBookData: {
                isUse:0,
                dictCode:'',   //字典分类编码  
                dictName:'',   //字典分类名称  
                remark:'',  
            },
        }
    },
    created: function(){
        
        //this.$route.params.id
    },
    methods: {
        confirm(){
            if(!this.wordBookData.dictCode){
                $.dialog('请输入分类编号');
                return false;
            }
            if(!this.wordBookData.dictName){
                $.dialog('请输入分类名称');
                return false;
            }

            //获取输入字符串字符长度（汉字算两个字符，字母数字算一个）
            function getByteLen(val) {      
                var len = 0;      
                for (var i = 0; i < val.length; i++) {        
                    var a = val.charAt(i);        
                    if (a.match(/[^\x00-\xff]/ig) != null) {          
                        len += 2;        
                    }else {          
                        len += 1;        
                    }      
                }      
                return len;    
            }
            if(getByteLen(this.wordBookData.dictCode) > 6){
                $.dialog("分类编号请输入不超过六位字符");
                return false;
            }

            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dictType/save.do?token="+token,{dictCode:this.wordBookData.dictCode,dictName:this.wordBookData.dictName,remark:this.wordBookData.remark,isUse:this.wordBookData.isUse})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    //alert(1)                   
                    return false;
                }                
                //alert(data.success);
                let _this = this;
                $.dialog({
                    content : "保存字典分类数据成功，是否继续添加？",
                    reverse: true,
                    ok : function() {
                        //document.location.reload();
                        _this.wordBookData={"isUse": "0"};
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

<style lang="sass">

</style>