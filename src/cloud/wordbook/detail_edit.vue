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
                <h5>编辑字典详情</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">字典分类</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" value="应用类型" name="bookType" v-model="detailEditData.dictName1" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">字典简称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="bookShortName" v-model="detailEditData.simplyName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">字典名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="bookName"  v-model="detailEditData.dictName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">排序</label>
                                <div class="col-lg-6">
                                    <input type="number" class="spinner-input form-control" name="sort"  v-model="detailEditData.isOrder">
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">是否可用</label> 
                                <div class="col-lg-9 clearfix">
                                    <div class="radio pull-left">
                                        <label class="no-padding-left">
                                            <input name="is_use" type="radio" checked="checked" class="colored-blue" value="0" v-model="detailEditData.isUse"> 
                                            <span class="text">是</span>
                                        </label>
                                    </div> 
                                    <div class="radio pull-left">
                                        <label>
                                            <input name="is_use" type="radio" class="colored-blue"  value="1" v-model="detailEditData.isUse"> 
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
            detailEditData: {
                dictName1:'',    //字典分类名称
                simplyName:'',  //字典简称
                dictName:'',    //字典名称
                isOrder:'1',     //排序
                isUse:0, 
                dictCode:'',        //字典分类编码
            },
           
        }
    },
    created : function(){
        let routerId = (this.$route.params.id).split("-");
        this.detailEditData.dictCode = routerId[0];
        this.detailEditData.dictName1 = routerId[1];
        this.detailEditData.dictId = routerId[2];

        //编辑字典详情查询
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/dictInfo/findInfoByParams.do?token="+token,{dictId:this.detailEditData.dictId, dictCode:this.detailEditData.dictCode})            
        .then(data=>{
            if(!data.success){
                //返回错误状态  
                alert(1)                  
                return false;
            }
            this.detailEditData = $.extend(this.detailEditData, data.obj);
            //console.log(JSON.stringify(data))
        })   
    },
    methods: {
        confirm(){
            if(!this.detailEditData.simplyName){
                $.dialog('请输入字典简称');
                return false;
            }
            if(!this.detailEditData.dictName){
                $.dialog('请输入字典名称');
                return false;
            }

            let token = localStorage.getItem('token');
            //console.log(this.detailEditData.isUse)
            $.get(window.config.api + "/dictInfo/saveDictInfo.do?token="+token,{dictId:this.detailEditData.dictId, dictCode:this.detailEditData.dictCode, simplyName:this.detailEditData.simplyName, dictName:this.detailEditData.dictName, isOrder:this.detailEditData.isOrder, isUse:this.detailEditData.isUse})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态  
                    //alert(1)                  
                    return false;
                }
                $.dialog({
                    content : data.msg,
                    reverse: true,
                    ok : function() {
                        history.go(-1);
                    },
                });
            })                                   
        },
        
    }
}
</script>

<style lang="sass">

</style>