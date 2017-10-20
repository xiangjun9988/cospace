<template>
    <div class="widget flat radius-bordered">
        <div class="widget-header bg-blue">
            <span class="widget-caption">新增部门信息</span>
        </div>
        <div class="widget-body">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                	<form class="form-horizontal">
                		<div class="form-group">
                            <label class="col-lg-3 control-label">部门简称<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.simplyName" placeholder="请输入部门简称">
                            </div>
						</div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">部门名称<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" @blur="mChange"  class="form-control" v-model="departmentData.deptName" placeholder="请输入部门名称">
                            </div>
                        </div>	                      
                		<div class="form-group">
                            <label class="col-lg-3 control-label">部门名称拼音<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.deptNamePy">
                            </div>
                        </div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">部门编码<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.deptCode" placeholder="请输入部门编码">
                            </div>
                        </div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">上级部门<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="$route.query.parentName" readonly>
                            </div>
                        </div>	
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">部门类型<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.isBus" id="select" @click="selectinfo">
                                    <option value="0">非业务部门</option>
                                    <option value="1">业务部门</option>
                                    <option value="2">区划节点</option>
                                </select>
                            </div>
                        </div>
                    	
                        <div class="form-group">
                            <label class="col-lg-3 control-label">所属区域</label>
                            <div class="col-lg-6">
                                <span  class="input-icon icon-right inverted m-personnel-left" data-toggle="modal" data-target="#modal-danger" v-on:click="loadAreaList">
                                    <input type="text" class="form-control" v-model="areaName0" placeholder="请选择所属区域" disabled>
                                    <i class="fa fa-home bg-darkorange"></i>
                                </span>
                            </div>                                        
                        </div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">排序<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6 spinner">
                                <button type="button" class="increase blue" @click="sort(1)"><i class="fa fa-chevron-up"></i></button>
                                <button type="button" class="decrease danger" @click="sort(-1)"><i class="fa fa-chevron-down"></i></button>
                                <input type="text" class="form-control" v-model="departmentData.isOrder">
                            </div>                                       
                        </div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">备注</label>
                            <div class="col-lg-6">
                                <textarea class="form-control" v-model="departmentData.remark" rows="4"></textarea>
                            </div>
                        </div>
                    	<div class="form-group">
                            <label class="col-lg-3 control-label">部门图标</label>
                            <div class="col-lg-5 no-padding-right">
                                <input type="file" name="deptIcon">
                            </div>
                            <div class="col-lg-3 red no-padding-left padding-top-5">格式为png、jpg</div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">是否是租户</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.lessee">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-lg-3 control-label">受理范围</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.acceptingRange">
                                    <option value="1">请选择受理范围</option>
                                    <option value="2">区级服务大厅</option>
                                    <option value="3">街道级服务大厅</option>
                                    <option value="4">社区级服务站</option>
                                </select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-lg-3 control-label">坐标类型</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.coordinateType">
                                    <option value="0">请选择坐标类型</option>
                                    <option value="1">国测局</option>
                                    <option value="2">WGS84</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">纬度</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.latitude">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">经度</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.longitude">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">地址</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.address">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">联系电话</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.contactNumber">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-3 col-lg-9">
                               <button class="btn btn-info margin-right-10" type="button" v-on:click="confirm()">确定</button>
                                <router-link to="/cloud/zzjg/index" class="btn btn-danger">返回</router-link>                                
                            </div>
                        </div>                        
                    </form> 
                </div>
            </div>             
        </div>


        <!--选择所属区域 Modal Templates-->
       <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">×</button>
                       <h4 class="modal-title">选择所属区域</h4>
                   </div>
                   <div class="modal-body">
                       <div class="row h400">
                           <form class="form-horizontal">
                                 <div class="form-group">
                                   <label class="col-lg-3 control-label">省份</label>
                                   <div class="col-lg-6">
                                       <select class="form-control" v-model="area1" v-on:change="area1Fun(area1)">
                                           <option v-for="item in area1List" :value="item.areaCode" >{{item.areaName}}</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group" v-if="area2List != ''">
                                   <label class="col-lg-3 control-label">城市</label>
                                   <div class="col-lg-6">
                                       <select class="form-control" v-model="area2" v-on:change="area2Fun(area2)">
                                           <option v-for="item in area2List" :value="item.areaCode">{{item.areaName}}</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group"  v-if="area3List != ''">
                                   <label class="col-lg-3 control-label">县区镇</label>
                                   <div class="col-lg-6">
                                       <select class="form-control" v-model="area3" v-on:change="area3Fun(area3)">
                                           <option v-for="item in area3List" :value="item.areaCode">{{item.areaName}}</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group"  v-if="area4List != ''">
                                   <label class="col-lg-3 control-label">街道</label>
                                   <div class="col-lg-6">
                                       <select class="form-control" v-model="area4" v-on:change="area4Fun(area4)">
                                           <option v-for="item in area4List" :value="item.areaCode">{{item.areaName}}</option>
                                       </select>
                                   </div>
                               </div> 
                               <div class="form-group"  v-if="area5List != ''">
                                   <label class="col-lg-3 control-label">社区</label>
                                   <div class="col-lg-6">
                                       <select class="form-control" v-model="area5" v-on:change="area5Fun(area5)">
                                           <option v-for="item in area5List" :value="item.areaCode">{{item.areaName}}</option>
                                       </select>
                                   </div>
                               </div> 
                           </form>
                       </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-info" data-dismiss="modal" @click="ok">确定</button>
                       <button type="button" class="btn btn-danger" data-dismiss="modal" @click="cancel">取消</button>
                   </div>
               </div>
               <!-- /.modal-content -->
           </div>
       </div>
       <!--End 选择所属区域 Modal Templates-->        
    </div>   
</template>

<script>
import name from '../../bootstrap/js/name.js';
var PinYin = name.PinYin();

export default{
    components: {

    },
    data(){
        return {
            areaName0:"",
            departmentData: {
                isBus: 0,
                isOrder: 1,
                lessee: 0,
                deptName: '',
                deptNamePy:'',
                simplyName:'',
                areaCode:"",
                areaName:"",
            },
            area1:"",
            area2:"",
            area3:"",
            area4:"",
            area5:"",
            area1List:[],
            area2List:[],
            area3List:[],
            area4List:[],
            area5List:[],
            areaCode:"",
            areaName:"",       
        }
    },
    created: function(){

            
    },
    methods: {
        //部门名称拼音自动带出
        mChange(){
            var name = this.departmentData.deptName;
            this.departmentData.deptNamePy = ConvertPinyin(name);
        },
        loadAreaList(){
            this.area1="";
            this.area2="";
            this.area3="";
            this.area4="";
            this.area5="";
            this.area1List=[];
            this.area2List=[];
            this.area3List=[];
            this.area4List=[];
            this.area5List=[];
            let token = localStorage.getItem('token');  
            //获取省份下拉框所有区域数据
            $.get(window.config.api + "/areaCode/queryList.do?token="+token,{areaLevel:'1'})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.area1List = data.obj;
                //console.log(JSON.stringify(data))
            });
        },
        area1Fun(areaCode){
            this.area2="";
            this.area3="";
            this.area4="";
            this.area5="";
            this.area2List=[];
            this.area3List=[];
            this.area4List=[];
            this.area5List=[];
            this.areaList(areaCode);
            this.childrenAreaList('area2List',areaCode);
        },
        area2Fun(areaCode){
            this.area3="";
            this.area4="";
            this.area5="";
            this.area3List=[];
            this.area4List=[];
            this.area5List=[];
            this.areaList(areaCode);
            this.childrenAreaList('area3List',areaCode);
        },
        area3Fun(areaCode){
            this.area4="";
            this.area5="";
            this.area4List=[];
            this.area5List=[];
            this.areaList(areaCode);
            this.childrenAreaList('area4List',areaCode);
        },
        area4Fun(areaCode){
            this.area5="";
            this.area5List=[];
            this.areaList(areaCode);
            this.childrenAreaList('area5List',areaCode);
        },
        area5Fun(areaCode){
            this.areaList(areaCode);
        },
        //查询当前areacode信息
        areaList(code){
            if(code=="" || code == undefined){
                return false;
            }
            let token = localStorage.getItem('token');  
            $.get(window.config.api + "/areaCode/queryList.do?token="+token,{areaCode:code})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.areaName = data.obj[0].areaName;
                this.areaCode = data.obj[0].areaCode;
                console.log(JSON.stringify(data.obj))
            });
        },
        childrenAreaList(area,code){
            if(code=="" || code == undefined){
                return false;
            }
            let token = localStorage.getItem('token');  
            $.get(window.config.api + "/areaCode/queryList.do?token="+token,{parentId:code})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                switch(area){
                    case 'area2List':
                      this.area2List = data.obj || [];
                      //console.log(JSON.stringify(data.obj))
                      break;
                    case 'area3List':
                      this.area3List = data.obj || [];
                      //console.log(JSON.stringify(data.obj))
                      break;
                    case 'area4List':
                      this.area4List = data.obj || [];
                      //console.log(JSON.stringify(data.obj))
                      break;
                    case 'area5List':
                      this.area5List = data.obj || [];
                      //console.log(JSON.stringify(data.obj))
                      break;
                    default : console.log(JSON.stringify(data.obj))
                }
                
            });
        },
        ok(){
            this.departmentData.areaCode = this.areaCode;
            this.areaName0 = this.areaName; 
        },
        cancel(){
             
        },
        selectinfo(){
            //$("#select").attr("size", 2);
            // $("#input").focus();
            // $("#input").css("display", "block")
        },
        
        confirm(){
            if(!this.departmentData.simplyName){
                $.dialog('请输入部门简称');
                return false;
            }
            if(!this.departmentData.deptName){
                $.dialog('请输入部门名称');
                return false;
            }
            if(!this.departmentData.deptCode){
                $.dialog('请输入部门编码');
                return false;
            } 
            //新增部门信息请求
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/save.do?token="+token,{parentId:this.$route.query.id,isOrder:this.departmentData.isOrder,simplyName:this.departmentData.simplyName,deptCode:this.departmentData.deptCode,deptName:this.departmentData.deptName,isUse:"0",isBus:this.departmentData.isBus,deptIcon:this.departmentData.deptIcon,deptNamePy:this.departmentData.deptNamePy,remark:this.departmentData.remark,
            lessee:this.departmentData.lessee,acceptingRange:this.departmentData.accpetRange,coordinateType:this.departmentData.coordinateType,latitude:this.departmentData.latitude,longitude:this.departmentData.longitude,address:this.departmentData.address,contactNumber:this.departmentData.contactNumber,areaCode:this.departmentData.areaCode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    $.dialog(data.msg);                    
                    return false;
                }
                $.dialog(data.msg); 

                this.$emit('viewin');  
                this.departmentData = {
                    isBus: 0,
                    isOrder: 1,
                    lessee: 0,
                    deptName: '',
                    deptNamePy:'',
                    simplyName:'',
                };
                $('body,html').animate({scrollTop:0},500);    
            })                                   
        },
        sort: function(num){
            if(this.departmentData.isOrder+num<0) return false;
            this.departmentData.isOrder += num
        }
    }
}

// 汉字转拼音
function ConvertPinyin(l1) {
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp('[a-zA-Z0-9\- ]');
    for (var i = 0; i < l2; i++) {
        var val = l1.substr(i, 1);
        var name = arraySearch(val, PinYin);
        if (reg.test(val)) {
            I1 += val;
        } else if (name !== false) {
            I1 += name;
        }

    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) {
        I1 = I1.replace('--', '-');
    }
    return I1;
}

// 在对象中搜索
function arraySearch(l1, l2) {
    for (var name in PinYin) {
        if (PinYin[name].indexOf(l1) != -1) {
            return ucfirst(name);
            break;
        }
    }
    return false;
}

// 首字母大写
function ucfirst(l1) {
    if (l1.length > 0) {
        var first = l1.substr(0, 1).toUpperCase();
        var spare = l1.substr(1, l1.length);
        return first + spare;
    }
}
</script>


<style scoped>
    .h400{
        height:400px;
    }
</style>
