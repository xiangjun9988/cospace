<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用评价 / 新增
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                <h5>应用评价反馈</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">应用名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select class="form-control" v-model="appcode">
                                        <option value="">请选择应用名称</option>
                                        <option  v-for="item in appList" :value="item.appCode">{{item.appName}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">具体菜单<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" v-model="moduleName" class="form-control"  data-toggle="modal" data-target="#modal-danger" v-on:click="moduleChoose">
                                </div>
                                <button class="btn btn-lg btn-info btn-sm margin-left-10"  data-toggle="modal" data-target="#modal-danger" v-on:click="moduleChoose">选择</button>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">满意度<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <div class="starts">
                                        <ul id = "pingStar">
                                            <li rel = "1" title = "特别差，给1分"></li>
                                            <li rel = "2" title = "很差，给2分"></li>
                                            <li rel = "3" title = "一般，给3分"></li>
                                            <li rel = "4" title = "很好，给4分"></li>
                                            <li rel = "5" title = "非常好，给5分"></li>
                                            <span id="dir"></span>
                                        </ul>
                                        <input type="hidden" v-model="star" id="startP" />
                                    </div>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">内容</label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control" v-model="content"></textarea>
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
        

        <!--选择文件 Modal Templates-->
        <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">选择菜单</h4>
                    </div>
                    <div class="modal-body treeListBox" style="height:500px; overflow-y:auto;" >
                        <!-- <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div> -->
                        <template>
                            <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :ischeckbox="true" :activemoduleid="activeId"></tree-view>
                        </template>             
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="confirmMenu">确定</button>                    
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="modalCancel" v-on:click="cancelmMenu">取消</button>
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
            appcode:'',
            appList:'',     //查询所有应用应用
            moduleName:'',
            star:'',
            content:'',
            moduleid:'', //逗号分隔的多个id 组成的字符串（多个菜单id）

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

            //某个返回的item中的所有ID集合
            allIdListData:[],
            //某个返回的item中的所有Name集合
            allNameListData:[],
        }
    },
    created: function(){
        
        //查询所有应用应用
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/app/queryList.do?token="+token,{})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.appList = data.obj;
        });  

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        let _this = this;
        //处理选中项数据
        this.$on('handleCallback', item =>{
            //console.log(JSON.stringify(item));

            //某个返回的item中的所有ID集合/Name集合
            this.allIdListData = [];
            this.allNameListData = [];
            this.allIdList(item);

            // console.log(this.allIdListData);
            // console.log(this.allNameListData);
           
            //某项菜单选中后的索引值
            let idx = this.activeId.indexOf(item.moduleId);
            if(idx != -1){
                //此项之前已被选中 -> 将此项的所有数据从之前的数组删除
                $.each(this.allIdListData,function(index,value){
                    let idx0 = _this.activeId.indexOf(value);
                    if(idx0 !== -1){
                        _this.activeId.splice(idx0,1);
                        _this.activeName.splice(idx0,1);
                    }
                }); 
            }else{
                //此项之前未被选中 -> 将此项的所有数据添加到之前的数组中 -> 数组合并存在重复数据
                this.activeId = this.arrayNoRepeat(this.activeId.concat(this.allIdListData));
                this.activeName = this.arrayNoRepeat(this.activeName.concat(this.allNameListData));
            }
            
            // console.log(this.activeId);
            // console.log(this.activeName);
        })
    },
    mounted: function(){
        this.starts();
    },
    methods: {
        //具体菜单选择
        moduleChoose: function(){
            if(this.appcode == ""){
                setTimeout(()=>{
                     $('#modalCancel').click();
                })
                $.dialog('请先选取应用名称');
                return false;
            }
            
            this.moduleName = "";
            this.moduleid = "";
            this.treeData = [];
            $(".treeListBox").append("<div class='col-lg-12 col-xs-12 treeListLoad'>数据正在加载中...</div>");
            
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/module/queryModuleTreeVList.do?token="+token,{appCode: this.appcode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                //console.log(JSON.stringify(data))
                this.treeData = data.obj;
                $(".treeListLoad").remove();
            });  
        },
        //某个返回的item中的所有ID集合/Name集合
        allIdList(item){
            let _this = this;
            this.allIdListData.push(item.moduleId);
            this.allNameListData.push(item.moduleName);
            if(item.childrenList){
                $.each(item.childrenList,function(index,value){
                    _this.allIdList(value);
                });
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
        confirmMenu(){
            this.moduleName = this.activeName; 
        },
        cancelmMenu(){
            this.activeId=[];
            this.activeName=[];
            this.moduleName = []; 
        },
        confirm(){
            if(!this.appcode){
                $.dialog('请选择应用名称');
                return false;
            }
            if(!this.moduleName){
                $.dialog('请选择具体菜单');
                return false;
            }
            if(!this.star){
                $.dialog('您还未评分，请打分');
                return false;
            }

             //用户新增用户评价
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/appRetroaction/save.do?token="+token,{rtype:"1", appcode: this.appcode, moduleid:(this.activeId).join(), star:this.star, content:this.content})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                $.dialog(data.msg);
                history.go(-1);
            });   
        },
        starts(){
            let _this = this;
            var s = document.getElementById("pingStar"),
                m = document.getElementById("dir"),
                n = s.getElementsByTagName("li"),
                input = document.getElementById("startP");//保存所选值
            
            var clearAll = function(){
                for(var i = 0;i < n.length;i++){
                    n[i].className = "";
                }
            }
            for(var i = 0;i < n.length;i++){
                n[i].onclick = function(){
                    var q = this.getAttribute("rel");
                    clearAll();
                    input.value = q;
                    _this.star = q;
                    for(var i = 0;i < q;i++){
                        n[i].className = "on";
                    }
                    m.innerHTML = this.getAttribute("title");
                }
                n[i].onmouseover = function(){
                    var q = this.getAttribute("rel");
                    clearAll();
                    for(var i = 0;i < q;i++){
                        n[i].className = "on";
                    }
                    m.innerHTML = this.getAttribute("title");
                }
                n[i].onmouseout = function(){
                    clearAll();
                    for(var i = 0;i < input.value;i++){
                        n[i].className = "on";
                    }
                    if(input.value == ""){
                        m.innerHTML = "";
                    }else{
                        m.innerHTML = n[input.value-1].getAttribute("title");
                    }
                }
            }
        }
        
    }
}
</script>

<style scoped lang="sass">

.starts ul{
    float:left;
    padding-left: 0 !important;
}
.starts ul li{
    list-style: none;
    width:32px;
    height:21px;
    float:left;
    background:url(images/stark2.png) no-repeat;
    
}
.starts ul li.on{
    background:url(images/stars2.png) no-repeat;
}
.starts ul span{
    display:inline;
    float:left;
    padding-left:10px;
    height:21px;
    line-height:21px;
}
</style>