<template>
	<div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用注册 / 新增
                </h1>
            </div>
        </div>
    	<div class="page-body">
            <div class="widget-body">
                <div class="row">           
                    <div class='col-lg-offset-3 col-lg-6'>
                        <h5>应用信息</h5>
                        <hr class="margin-top-10">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <form class='form-horizontal'>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">应用编码<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" v-model="applyData.appCode" placeholder="请输入应用编码">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">应用名称<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" v-model="applyData.appName" placeholder="请输入应用名称">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">应用地址<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" v-model='applyData.appUrl' placeholder="请输入应用地址">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">应用类型</label>
                                        <div class="col-lg-9">
                                            <select class="form-control" v-model='applyData.appType'>
                                                <template v-for="item in typeList">
                                                    <option :value="item.dictId">{{item.dictName}}</option>
                                                </template>
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
                                        <label class="col-lg-3 control-label">应用图标<span class="red margin-left-5">*</span></label>
                                        <div class="col-lg-9">
                                            <select class="form-control" v-model="applyData.appIcon">
                                                <option  value="">上传应用图标</option>
                                                <option v-for="item in applyIconData" v-bind:value="item.icon">
                                                {{item.icon.split("/").pop()}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="!applyData.appIcon">
                                        <label class="col-lg-3 control-label">应用图标上传</label>
                                        <div class="col-lg-9">
                                            <form id= "uploadForm">  
                                                <p>指定文件名： <input type="text" name="filename" value=""/></p>  
                                                <input type="file" name="datafile">  
                                            </form>  
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
                                            <button class="btn btn-danger" type="button" onclick="history.go(-1);">取消</button> 
                                        </div>
                                    </div>            
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                                 
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            applyData:{
                appCode: '',
                appName: '',
                appUrl: '',
                appType:'02',
                isOrder:0,
                isUse:'0',
                appIcon:''

            },
            //应用图标
            applyIconData: [],
            //应用分类
            typeList:'',
            imgCommonUrl:[],
            //应用鉴权类型
            detailRows:''  
        }
    },
    created:function(){
        let token = localStorage.getItem('token');
        //初始化加载内容
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token +"&dictCode=1002",{})
        .then(data=>{
            if(!data.success){
                return false
            }
            //alert(data.msg);
            this.typeList = data.obj;
            //console.log(JSON.stringify(data))            
        });

        //应用鉴权类型
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"5002"})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            console.log(JSON.stringify(data));
            this.detailRows = data.obj;
        }); 

      //获取应用图标下拉框的数据
      $.get(window.config.api + "/sysIcon/queryList.do?token=" + token)
      .then(data => {
        if (!data.success) {
          return false
        }
        //console.log(JSON.stringify(data))
        this.applyIconData = data.obj;
        this.applyData.appIcon = data.obj[0].icon;
        let imgCommonUrl = [];
        imgCommonUrl = this.applyData.appIcon.split('/');
        imgCommonUrl.pop();
        this.imgCommonUrl = imgCommonUrl;
      });                     
    },
    methods: {
        sort: function(num){
            if(this.applyData.isOrder+num<0) return false;
            this.applyData.isOrder += num
        },
        
        //保存应用信息
        confirm(){
            if(!this.applyData.appCode){
                $.dialog('请输入应用编码');
                return false;
            }
            if(!this.applyData.appName){
                $.dialog('请输入应用名称');
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
            // if(!this.applyData.appIcon ){
            //     $.dialog('请选择应用图标');
            //     return false;
            // }                        
            let token = localStorage.getItem('token');
           
                //验证应用编码
                $.post(window.config.api + "/app/validCode.do?token=" + token,{appCode:this.applyData.appCode})
                .then(data => {
                    if (!data.success) {
                        $.dialog('应用编码已存在');
                        return false
                    }                    
                    //$.dialog('应用编码正确');
                    //上传应用图标
                    let _this = this;
                    if(!this.applyData.appIcon){
                        if($("#uploadForm input[type='text']").val() == ''){
                            $.dialog('请输入应用图标名称');
                            return false;
                        }
                        if($("#uploadForm input[type='file']").val() == ''){
                            $.dialog('请导入应用图标图片');
                            return false;
                        }
                        var formData = new FormData($( "#uploadForm" )[0]);  
                        //alert($( "#uploadForm input[type='file']").val())
                        $.ajax({  
                            url: window.config.api + "/sysIcon/uploadIcon.do?token="+token,  
                            type: 'POST',  
                            data: formData,  
                            async: false,  
                            cache: false,  
                            contentType: false,  
                            processData: false,  
                            success: function (returndata) {  
                                if(returndata.msg != '上传成功！'){
                                    $.dialog(returndata.msg);
                                    return false;
                                }
                                //console.log(_this.imgCommonUrl)
                                alert(_this.imgCommonUrl.join("/") +'/'+ $("#uploadForm input[type='text']").val() + '.png');

                                $.post(window.config.api + "/app/saveAppOfAll.do?token=" + token,{appCode:_this.applyData.appCode, appName:_this.applyData.appName, appUrl:_this.applyData.appUrl, appType:_this.applyData.appType, appIcon:_this.imgCommonUrl.join("/") +'/'+ $("#uploadForm input[type='text']").val() + '.png', isOrder:_this.applyData.isOrder, remark:_this.applyData.remark, isUse:_this.applyData.isUse})
                                .then(data => {
                                    if (!data.success) {
                                      return false
                                    }
                                    $.dialog(data.msg);
                                    history.go(-1);
                                });
                            },  
                            error: function (returndata) { 
                                $.dialog('图标上传失败');
                            }  
                        }); 
                    }else{
                        $.post(window.config.api + "/app/saveAppOfAll.do?token=" + token,{appCode:this.applyData.appCode, appName:this.applyData.appName, appUrl:this.applyData.appUrl, appType:this.applyData.appType, appLinkType:this.applyData.appLinkType, appIcon:this.applyData.appIcon, isOrder:this.applyData.isOrder, remark:this.applyData.remark, isUse:this.applyData.isUse})
                        .then(data => {
                            if (!data.success) {
                              return false
                            }
                            $.dialog(data.msg);
                            history.go(-1);
                        });
                    }    
                });                
           
        }
    }
}
</script>
