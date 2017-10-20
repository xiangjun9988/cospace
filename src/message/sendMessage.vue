<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：消息中心 / 发送消息
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                <h5>消息发送</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">收信人<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-5 col-xs-10">
                                    <input type="text" class="form-control"  data-toggle="modal" data-target="#modal-danger" placeholder="请选择收信人" v-model="sendMessageUser">
                                </div>
                                <div class="col-lg-1 col-xs-2 padding-top-5">
                                    <span data-toggle="modal" data-target="#modal-danger"><i class="glyphicon glyphicon-home blue"></i></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">消息标题<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="roleCode"  placeholder="请输入消息标题" v-model="sendMessage.messageTitle">
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">消息内容<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control" v-model="sendMessage.messageContent"></textarea>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">发送方式<span class="red margin-left-5">*</span></label> 
                                <div class="col-lg-9 clearfix">
                                    <div class="checkbox pull-left">
                                        <label class="no-padding-left">
                                            <input name="is_use" type="checkbox" class="colored-blue" value="systemMessage" v-model="sendMessage.messageSource"> 
                                            <span class="text">系统</span>
                                        </label>
                                    </div> 
                                    <div class="checkbox pull-left">
                                        <label>
                                            <input name="is_use" type="checkbox" class="colored-blue" value="sms" v-model="sendMessage.messageSource"> 
                                            <span class="text">短信</span>
                                        </label>
                                    </div>
                                    <div class="checkbox pull-left">
                                        <label>
                                            <input name="is_use" type="checkbox" class="colored-blue" value="email" v-model="sendMessage.messageSource"> 
                                            <span class="text">邮件</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                                                  
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                    <button class="btn btn-info margin-right-10" type="button" v-on:click="confirm()">发送</button>
                                    <button class="btn btn-danger" type="button" onclick="history.go(-1);">取消</button>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div> 
            </div>                                 
        </div> 
        

        <!--选择文件 Modal Templates-->
        <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">选择收信人</h4>
                    </div>
                    <div class="modal-body" style="height:500px; overflow-y:auto;">
                        <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                        <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :ischeckbox="true" :activeid="activeId"></tree-view>          
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="confirmNameList">确定</button>                    
                        <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="cancelNameList">取消</button>
                    </div>
                </div>
            </div> 
        </div>
        <!--End 选择文件 Modal Templates-->            
    </div>
</template>

<script>
import tree from './tree.vue';
export default{
    components: {
        'tree-view' : tree
    },
    data(){
        return {
            sendMessage:{
                messageSource:['systemMessage'],
            },
            //收信人
            sendMessageUser:[],
            //树结构数据
            treeData: [],
            //选中项数据
            activeData: [],
            //传递this，外层实例
            vm: {},
                        
            //所有选中项ID
            activeId:[],
            //所有选中项的名称
            activeName:[],
            //没有子项的选中项ID
            activeId0:[],
            //没有子项的选中项的名称
            activeName0:[],


            //某个返回的item中的所有ID集合
            allIdListData:[],
            //某个返回的item中的所有Name集合
            allNameListData:[],
            //某个返回的item中没有子项的ID集合
            allIdListData0:[],
            //某个返回的item中没有子项的Name集合
            allNameListData0:[],
        }
    },
    created: function(){
        this.personChoose();

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        let _this = this;
        //处理选中项数据
        this.$on('handleCallback', item =>{
            //console.log(JSON.stringify(item));

            //某个返回的item中的所有ID集合/Name集合
            this.allIdListData = [];
            this.allNameListData = [];
            this.allIdListData0 = [];
            this.allNameListData0 = [];
            this.allIdList(item);

            // console.log(this.allIdListData);
            // console.log(this.allNameListData);
            // console.log(this.allIdListData0);
            // console.log(this.allNameListData0);


            //某项菜单选中后的索引值
            let idx = this.activeId.indexOf(item.id);
            if(idx != -1){
                //此项之前已被选中 -> 将此项的所有数据从之前的数组删除
                $.each(this.allIdListData,function(index,value){
                    let idx0 = _this.activeId.indexOf(value);
                    if(idx0 !== -1){
                        _this.activeId.splice(idx0,1);
                        _this.activeName.splice(idx0,1);
                    }
                }); 

                $.each(this.allIdListData0,function(index,value){
                    let idx0 = _this.activeId0.indexOf(value);
                    if(idx0 !== -1){
                        _this.activeId0.splice(idx0,1);
                        _this.activeName0.splice(idx0,1);
                    }
                });   
            }else{
                //此项之前未被选中 -> 将此项的所有数据添加到之前的数组中 -> 数组合并存在重复数据
                this.activeId = this.arrayNoRepeat(this.activeId.concat(this.allIdListData));
                this.activeName = this.arrayNoRepeat(this.activeName.concat(this.allNameListData));

                this.activeId0 = this.arrayNoRepeat(this.activeId0.concat(this.allIdListData0));
                this.activeName0 = this.arrayNoRepeat(this.activeName0.concat(this.allNameListData0));
            }
            
            // console.log(this.activeId);
            // console.log(this.activeName);
            // console.log(this.activeId0);
            // console.log(this.activeName0);         
        })
    },
    methods: {
        personChoose(){
            //这里获取树结构的数据
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/dept/queryDeptTreeList.do?token="+token)
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //console.log(JSON.stringify(data));
                this.treeData = data.obj;
                $(".treeListLoad").remove();
            });
        },
        //某个返回的item中的所有ID集合/Name集合
        allIdList(item){
            let _this = this;
            this.allIdListData.push(item.id);
            this.allNameListData.push(item.name);
            if(item.childrenList){
                $.each(item.childrenList,function(index,value){
                    _this.allIdList(value);
                });
            }
            //console.log(this.allIdListData);
            if(!item.childrenList){
                this.allIdListData0.push(item.id);
                this.allNameListData0.push(item.name);
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
        //树形菜单弹窗点击确认
        confirmNameList(){
            this.sendMessageUser = this.activeName0; 
        },
        //树形菜单弹窗点击取消
        cancelNameList(){
            this.activeId=[];
            this.activeName=[];
            this.activeId0=[];
            this.activeName0=[];
            this.sendMessageUser = []; 
        },
        confirm(){
            if(!this.sendMessageUser){
                $.dialog('请选择收信人');
                return false;
            }
            if(!this.sendMessage.messageTitle){
                $.dialog('请输入消息标题');
                return false;
            }
            if(!this.sendMessage.messageContent){
                $.dialog('请输入消息内容');
                return false;
            }
            if(!this.sendMessage.messageSource){
                $.dialog('请选择发送方式');
                return false;
            }
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/sorMessage/save.do?token="+token,{messageRecId:(this.activeId0).join(),messageTitle:this.sendMessage.messageTitle,messageContent:this.sendMessage.messageContent,messageSource:(this.sendMessage.messageSource).join()})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                let _this = this;
                $.dialog("信息发送成功");
                this.$router.push({path: '/message/send'});
            })                                   
        },
        
    }
}
</script>

<style scoped lang="sass">

</style>