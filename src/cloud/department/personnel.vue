<template>
    <div class="row">
        <div class="widget flat radius-bordered">
            <div class="widget-header bg-blue">
                <span class="widget-caption">人员信息</span>
            </div>        
        </div>
        <div class="widget-body">            
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form class="form-horizontal">                         
                        <div class="form-group">
                            <label class="col-lg-3 control-label">所属部门<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.deptName" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">工作编号<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.workNo" readonly>
                            </div>
                        </div>                                
                        <div class="form-group">
                            <label class="col-lg-3 control-label">姓名<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.userName" @blur="blurName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">姓名首字母</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.userNamePy">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">姓别</label>
                            <div class="col-lg-6 clearfix">
                                <div class="radio pull-left">
                                    <label class="no-padding-left">
                                        <input type="radio" class="colored-blue" value="01" v-model="personData.gender">
                                        <span class="text">男</span>
                                    </label>
                                </div>
                                <div class="radio pull-left">
                                    <label>
                                        <input type="radio" class="colored-blue" value="02" v-model="personData.gender">
                                        <span class="text">女</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">是否可用</label>
                            <div class="col-lg-6 clearfix">
                                <div class="radio pull-left">
                                    <label class="no-padding-left">
                                        <input type="radio" class="colored-blue" value="0" v-model="personData.isUse">
                                        <span class="text">是</span>
                                    </label>
                                </div>
                                <div class="radio pull-left">
                                    <label>
                                        <input type="radio" class="colored-blue" value="1" v-model="personData.isUse">
                                        <span class="text">否</span>
                                    </label>
                                </div>
                            </div>                                        
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">是否星级</label>
                            <div class="col-lg-6 clearfix">
                                <div class="radio pull-left">
                                    <label class="no-padding-left">
                                        <input type="radio" class="colored-blue" value="0" v-model="personData.isStart">
                                        <span class="text">是</span>
                                    </label>
                                </div>
                                <div class="radio pull-left">
                                    <label>
                                        <input type="radio" class="colored-blue" value="1" v-model="personData.isStart">
                                        <span class="text">否</span>
                                    </label>
                                </div>
                            </div>                                        
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">是否党员</label>
                            <div class="col-lg-6 clearfix">
                                <div class="radio pull-left">
                                    <label class="no-padding-left">
                                        <input type="radio" class="colored-blue" value="0" v-model="personData.isPartymember">
                                        <span class="text">是</span>
                                    </label>
                                </div>
                                <div class="radio pull-left">
                                    <label>
                                        <input type="radio" class="colored-blue" value="1" v-model="personData.isPartymember">
                                        <span class="text">否</span>
                                    </label>
                                </div>
                            </div>                                        
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">座机电话</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.tel" @blur="blurTel()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">手机号码</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.mobile" @blur="blurMobile()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">电子邮箱</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.email" @blur="blurEmail()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">职称选择</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="personData.userRank">
                                    <option v-for="option in userRank" v-bind:value="option.dictId">{{option.dictName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">行政级别</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="personData.userLevel">
                                    <option v-for="option in level" v-bind:value="option.dictId">{{option.dictName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">政府职务</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="personData.userDuty" id="editable-select">
                                    <option value="">请选择职务</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">人员分类<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="userClassify">
                                    <option value="0">操作类</option>
                                    <option value="1">管理类</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="userClassify==='1'">
                            <label class="col-lg-3 control-label">管理范围<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <textarea class="form-control" rows="4" v-model="userScope"></textarea>
                            </div>
                            <div class="col-lg-1 no-padding-left padding-top-30 padding-bottom-30" data-toggle="modal" data-target="#modal-danger-checkbox" style="cursor:pointer;">
                                <i class="glyphicon glyphicon-home blue"></i>
                            </div> 
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">登录名<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.loginName" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">密码<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="personData.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-3 col-lg-9">
                                <button class="btn btn-info margin-right-10" type="button" @click="confirm()">确定</button>
                                <router-link to="/cloud/department/index" class="btn btn-danger">返回</router-link>
                            </div>
                        </div>
                    </form> 
                </div>
            </div> 
        </div>

        <!--所属部门 Modal Templates-->
        <div id="modal-danger-radio" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">选择部门</h4>
                    </div>
                    <div class="modal-body" style="height:488px;overflow-y:auto;">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="请输入部门名称" v-model="searchDeptName" style="display:inline-block; vertical-align:middle; width:50%;">
                            <button type="button" class="btn btn-info" @click="searchTreeData()"><i class="fa fa-search"></i>搜索</button>
                            <button type="button" class="btn btn-danger" @click="reset()"><i class="fa fa-refresh"></i>重置</button>
                        </div>
                        <!-- tree template -->
                        <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>                        
                        <template>
                            <tree-view :treedata="deptTreeData" :activedata="activeData" :vm="vm" :isradio="true"></tree-view>
                        </template>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
        </div>
        <!--End 所属部门 Modal Templates--> 

        <!--管理范围 Modal Templates-->
        <div id="modal-danger-checkbox" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">选择部门</h4>
                    </div>
                    <div class="modal-body" style="height:488px;overflow-y:auto;">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="请输入部门名称" v-model="searchDeptName" style="display:inline-block; vertical-align:middle; width:50%;">
                            <button type="button" class="btn btn-info" @click="searchTreeData()"><i class="fa fa-search"></i>搜索</button>
                            <button type="button" class="btn btn-danger" @click="reset()"><i class="fa fa-refresh"></i>重置</button>
                        </div>
                        <!-- tree template -->
                        <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>                        
                        <template>
                            <tree-view-range :treedata="rangeTreeData" :activedata="activeData" :vm="vm" :ischeckbox="true" :activeid="activeId"></tree-view-range>
                        </template>                        
                        <!-- /tree template -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click="confirmNameList()" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-danger" @click="cancelNameList()" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
        </div>
        <!--End 管理范围 Modal Templates-->                      
    </div>    
</template>

<script>
import tree from '../tree.vue';
import treeRange from './tree.vue';
import name from '../../bootstrap/js/name.js';
require('editableselect');
export default {
    components: {
        'tree-view' : tree,
        'tree-view-range' : treeRange,
    },
    data: ()=>({
        //职称数据
        userRank: [],        
        //行政级别数据
        level: [],
        //政府职务数据        
        job: [],         
        //所属部门单选树结构数据
        deptTreeData: [],
        //管理范围多选树结构数据
        rangeTreeData: [],
        //管理范围（这里需要注意）
        userScope: [], 
        userClassify: '',
        //选中项数据
        activeData: [],
        //选中项id
        activeId: [],
        //选中项名称
        activeName: [],
        vm: {},

        //某个返回的item中的所有ID集合
        allIdListData:[],
        //某个返回的item中的所有Name集合
        allNameListData:[],

        //人员信息
        personData:{
            deptId: '',
            deptName: '',
            workNo: '',
            userName: '',
            userNamePy: '',
            gender: '',
            isUse: '0',
            isStart: '',
            isPartymember: '',
            tel: '',
            mobile: '',
            email: '',
            userRank: '',
            userLevel: '',
            userDuty: '',            
            loginName: '',
            password: ''
        },
        //根据部门名称进行模糊搜索
        searchDeptName: ''        
    }),
    created: function(){
        this.getTree(); 

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        let _this = this;
        this.$on('handleCallback', item=>{
            //点击当前部门根据id查询上级部门
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/getDeptInfoByLike.do?token="+token,{deptId:item.deptId})
            .then(data=>{
                if(!data.success){
                    return false
                }
                //部门只有两级时maxDeptName为空
                this.personData.deptName = (data.obj.maxDeptName || '') +'/'+ data.obj.middleDeptName +'/'+ data.obj.minDeptName;
                this.personData.deptId = data.obj.midDeptId; 
            });

            //管理范围复选框勾选多个值
            //某个返回的item中的所有ID集合/Name集合
            this.allIdListData = [];
            this.allNameListData = [];
            this.allIdList(item);

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
            }else{
                //此项之前未被选中 -> 将此项的所有数据添加到之前的数组中 -> 数组合并存在重复数据
                this.activeId = this.arrayNoRepeat(this.activeId.concat(this.allIdListData));
                this.activeName = this.arrayNoRepeat(this.activeName.concat(this.allNameListData));
            }
        });

        let token = localStorage.getItem('token');
        //获取职称的下拉数据        
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"1010"})
        .then(data=>{
            if(!data.success){
                return false
            }
            this.userRank = data.obj;
        });        
        //获取行政级别的下拉数据        
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"1111"})
        .then(data=>{
            if(!data.success){
                return false
            }
            this.level = data.obj;
        });
        //获取政府职务的下拉数据        
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"3112"})
        .then(data=>{
            if(!data.success){
                return false
            }
            this.job = data.obj;
        });

        let id = this.$route.params.id; 
        this.initData(id);       
        this.$watch('$route.params.id',n=>{
            this.initData(n);            
        });

    },
    methods:{
        getTree(){
            let token = localStorage.getItem('token');              
            //这里获取树结构的数据
            $.get(window.config.api + "/dept/queryDeptTreeList.do?token="+token)
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                //所属部门弹出框树数据
                this.deptTreeData = data.obj;
                //管理范围弹出框树数据
                this.rangeTreeData = data.obj;
                setTimeout(()=>{
                    $(".treeListLoad").remove();
                })            
            });          
        },         
        blurName(){
            if(!/^[\u0391-\uFFE5]+$/.test(this.personData.userName)){
                $.dialog('请输入中文');
                return false;                
            } 

            //两端去空格函数  
            String.prototype.trim = function() {    
                return this.replace(/(^\s*)|(\s*$)/g,""); 
            }  

            //测试程序         
            var m_str = this.personData.userName;  
            if(m_str == "") return ; 
            this.personData.userNamePy = makePy(m_str)[0]; 
        },
        initData(id){
            //根据部门人员id查询相应的人员信息
            let token = localStorage.getItem('token');             
            $.post(window.config.api + "/user/findUserOfAllByParams.do?token="+token,{userId:id})
            .then(data=>{
                if(!data.success){
                    return false
                }
                this.personData = data.obj;
                var m_str = this.personData.userName;  
                if(m_str == "") return ; 
                this.personData.userNamePy = makePy(m_str)[0]; 
            });
        },
        blurTel(){
            if(!/^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/.test(this.personData.tel) && !/^\d{8}$/.test(this.personData.tel)){
                    $.dialog('请输入正确格式的座机电话');
                return false;        
            }    
        },
        blurMobile(){
            if(!/^1[3-9]\d{9}$/.test(this.personData.mobile)){
                $.dialog('请输入正确格式的手机号码');
                return false;                
            }      
        }, 
        blurEmail(){
            if(!/^[\w\+-]+(\.[\w\+-]+)*@[a-z\d-]+(\.[a-z\d-]+)*\.([a-z]{2,4})$/i.test(this.personData.email)){
                $.dialog('请输入正确的email地址');
                return false;                
            }      
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
            this.userScope = this.activeName; 
        },
        //树形菜单弹窗点击取消
        cancelNameList(){
            this.activeId=[];
            this.activeName=[];
            this.userScope = []; 
        },
        
        confirm(){
            if(!this.personData.userName){
                $.dialog('请输入姓名');
                return false;
            }          
            if(!this.personData.password){
                $.dialog('请输入密码');
                return false;
            }                                                
            //修改并保存用户信息
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/user/saveUserOfAll.do?token="+token,{userId:this.$route.params.id, deptId:this.personData.deptId, workNo:this.personData.workNo, userName:this.personData.userName, userNamePy:this.personData.userNamePy, gender:this.personData.gender, isUse:this.personData.isUse, isStart:this.personData.isStart, isPartymember:this.personData.isPartymember, tel:this.personData.tel, mobile:this.personData.mobile, email:this.personData.email, userRank:this.personData.userRank, userLevel:this.personData.userLevel, userDuty:this.personData.userDuty, userClassify:this.userClassify, userScopeId:(this.activeId).join(), loginName:this.personData.loginName, password:this.personData.password, isOrder:0})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }                
                $.dialog({
                    content : '数据保存成功！',                    
                    ok : function() {
                        history.go(-1);
                    }
                });                                 
            });            
        },
        searchTreeData: function(){
            //选择部门弹框中根据部门名称模糊搜索树数据
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/queryDeptTreeList.do?token="+token,{deptName:this.searchDeptName})
            .then(data=>{
                if(!data.success){
                    return false
                }
                this.deptTreeData = data.obj;
                this.rangeTreeData = data.obj;
            });
        }         
    }
}


function makePy(str){  
    if(typeof(str) != "string")  
    throw new Error(-1,"函数makePy需要字符串类型参数!");  
    var arrResult = new Array(); //保存中间结果的数组  
    for(var i=0,len=str.length;i<len;i++){  
   
    //获得unicode码  
    var ch = str.charAt(i);  
   
    //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理  
    arrResult.push(checkCh(ch));  
    }  
   
    //处理arrResult,返回所有可能的拼音首字母串数组  
    return mkRslt(arrResult);  
}

function checkCh(ch){  
    var uni = ch.charCodeAt(0);  
    var oMultiDiff = name.oMultiDiff(); 
    var strChineseFirstPY = name.strChineseFirstPY(); 
   
    //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数  
    if(uni > 40869 || uni < 19968)  
    return ch; //dealWithOthers(ch);  
    
    //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母  
    return (oMultiDiff[uni]?oMultiDiff[uni]:(strChineseFirstPY.charAt(uni-19968)));  
}

function mkRslt(arr){  
    var arrRslt = [""];  
    for(var i=0,len=arr.length;i<len;i++){  
        var str = arr[i];  
        var strlen = str.length;  
        if(strlen == 1){  
            for(var k=0;k<arrRslt.length;k++){  
                arrRslt[k] += str;  
            }  
        }else{  
            var tmpArr = arrRslt.slice(0);  
            arrRslt = [];  
            for(k=0;k<strlen;k++){  
            //复制一个相同的arrRslt  
            var tmp = tmpArr.slice(0);  
            //把当前字符str[k]添加到每个元素末尾  
            for(var j=0;j<tmp.length;j++){  
                tmp[j] += str.charAt(k);  
            }  
                //把复制并修改后的数组连接到arrRslt上  
                arrRslt = arrRslt.concat(tmp);  
            }  
        }  
    }  
    return arrRslt;  
}
</script>
