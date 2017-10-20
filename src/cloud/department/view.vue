<template>
    <div class="widget flat radius-bordered">
        <div class="widget-header bg-blue">
            <span class="widget-caption">部门信息</span>
        </div>
        <div class="widget-body">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">部门简称<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.simplyName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">部门名称<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.deptName" @blur="mChange">
                            </div>
                        </div>                        
                        <div class="form-group">
                            <label class="col-lg-3 control-label">部门名称拼音</label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.deptNamePy">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">部门编码<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.deptCode">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">上级部门<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <input type="text" class="form-control" v-model="departmentData.parentDeptName">
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="col-lg-3 control-label">部门类型<span class="red margin-left-5">*</span></label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.isBus">
                                    <option value="0">非业务部门</option>
                                    <option value="1">业务部门</option>
                                </select>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">所属区域</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="departmentData.areaCode">
                                    <template v-for="option in options">
                                        <option :value="option.areaCode">{{option.areaName}}</option>
                                    </template> 
                                </select>                                 
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
                                <select class="form-control" v-model="departmentData.accpetRange">
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
                                <button class="btn btn-info margin-right-10" type="button" @click="confirm()">确定</button>
                                <router-link to="index" class="btn btn-danger">返回</router-link>
                            </div>
                        </div>                        
                    </form> 
                </div>
            </div>             
        </div>        
    </div>   
</template>

<script>
import name from '../../bootstrap/js/name.js';
var PinYin = name.PinYin();
export default{
    data(){
        return {
            departmentData: {
                deptNamePy:'',
                deptName: ''
            },
            options: []
        }
    },
    created(){
        //获取下拉框所有区域数据
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/dept/queryDeptAreacode.do?token="+token)
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.options = data.obj;
        });

        let zid = this.$route.params.zid; 
        this.initData(zid);       
        this.$watch('$route.params.zid',n=>{
            this.initData(n);            
        });
    },

    methods: { 
        //部门名称拼音自动带出
        mChange(){
            var name = this.departmentData.deptName;
            this.departmentData.deptNamePy = ConvertPinyin(name);
        },
        initData(id){
            //根据部门id查询相应的部门信息
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/findInfoByParams.do?token="+token,{deptId:id})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.departmentData = data.obj;
            });
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
            //修改部门信息并保存
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/save.do?token="+token,{deptId:this.departmentData.deptId,parentId:this.departmentData.parentId,isOrder:this.departmentData.isOrder,simplyName:this.departmentData.simplyName,deptCode:this.departmentData.deptCode,deptName:this.departmentData.deptName,isUse:"0",isBus:this.departmentData.isBus,deptIcon:this.departmentData.deptIcon,deptNamePy:this.departmentData.deptNamePy,remark:this.departmentData.remark,
            lessee:this.departmentData.lessee,acceptingRange:this.departmentData.accpetRange,coordinateType:this.departmentData.coordinateType,latitude:this.departmentData.latitude,longitude:this.departmentData.longitude,address:this.departmentData.address,contactNumber:this.departmentData.contactNumber,areaCode:this.departmentData.areaCode})            
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    $.dialog(data.msg);                    
                    return false;
                }
                $.dialog(data.msg);
            })                                   
        },         
        sort : function(num){
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
