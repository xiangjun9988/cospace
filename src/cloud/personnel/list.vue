<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：人员管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12 clearfix">
                    <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
                    <a href="javascript:;" @click="m_export" class="btn btn-danger"><i class="fa fa-download"></i>导出当页</a>
                    <a href="javascript:;" @click="m_exportAll" class="btn btn-danger"><i class="fa fa-download"></i>导出全部</a>
                    <div class="search m-search">
                        <span class="input-icon icon-right inverted m-personnel-left" data-toggle="modal" data-target="#modal-danger">
                            <input type="text" class="form-control" placeholder="部门名称" v-model="deptNameData" readonly>
                            <i class="fa fa-home bg-darkorange"></i>
                        </span> 
                        <input type="text" class="form-control m-personnel-right" v-model="searchData.userName" placeholder="请输入用户姓名或登录名" style="width:180px;">
                        <a href="javascript:;" class="btn btn-info" @click="searchPersonName"><i class="fa fa-search"></i>搜索</a>
                        <a href="javascript:;" class="btn btn-danger" @click="reset()"><i class="fa fa-refresh"></i>重置</a>                        
                    </div>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                    <div class="table-scrollable">
                                        <table class="table table-striped table-bordered table-hover" id="tableExcel">
                                            <thead class="bordered-blue">
                                                <tr>
                                                    <th width="10%">
                                                        序号
                                                    </th>
                                                    <th width="10%">
                                                        工作编号
                                                    </th>
                                                    <th width="10%">
                                                        登录名
                                                    </th>
                                                    <th width="10%">
                                                        用户姓名
                                                    </th>
                                                    <th width="10%">
                                                        所属部门
                                                    </th>
                                                    <th width="10%">
                                                        性别
                                                    </th>
                                                    <th width="10%">
                                                        邮件地址
                                                    </th>
                                                    <th width="10%">
                                                        职称
                                                    </th>
                                                    <th width="10%" class="text-align-center">
                                                        操作
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in personData">
                                                    <td>{{item.ROW_ID}}</td>
                                                    <td>{{item.workNo}}</td>
                                                    <td>{{item.loginName}}</td>
                                                    <td>{{item.userName}}</td>
                                                    <td>{{item.deptName}}</td>
                                                    <td>{{item.sex}}</td>
                                                    <td>{{item.email}}</td>
                                                    <td>{{item.userRank}}</td>
                                                    <td>
                                                        <router-link :to="{path:'edit', query:{loginId:item.loginId,userId:item.userId}}" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i>编辑</router-link>
                                                        <a href="javascript:;" class="btn btn-danger btn-xs delete" @click="removeItem(item)"><i class="fa fa-trash-o"></i>删除</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table> 


                                        <table class="table table-striped table-bordered table-hover" style="display:none;" id="tableExcelAll">
                                            <thead class="bordered-blue">
                                                <tr>
                                                    <th width="10%">
                                                        序号
                                                    </th>
                                                    <th width="10%">
                                                        工作编号
                                                    </th>
                                                    <th width="10%">
                                                        登录名
                                                    </th>
                                                    <th width="10%">
                                                        用户姓名
                                                    </th>
                                                    <th width="10%">
                                                        所属部门
                                                    </th>
                                                    <th width="10%">
                                                        性别
                                                    </th>
                                                    <th width="10%">
                                                        邮件地址
                                                    </th>
                                                    <th width="10%">
                                                        职称
                                                    </th>
                                                    <th width="10%" class="text-align-center">
                                                        操作
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in personDataAll">
                                                    <td>{{item.ROW_ID}}</td>
                                                    <td>{{item.workNo}}</td>
                                                    <td>{{item.loginName}}</td>
                                                    <td>{{item.userName}}</td>
                                                    <td>{{item.deptName}}</td>
                                                    <td>{{item.sex}}</td>
                                                    <td>{{item.email}}</td>
                                                    <td>{{item.userRank}}</td>
                                                    <td>
                                                        <router-link :to="{path:'edit', query:{loginId:item.loginId,userId:item.userId}}" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i>编辑</router-link>
                                                        <a href="javascript:;" class="btn btn-danger btn-xs delete" @click="removeItem(item)"><i class="fa fa-trash-o"></i>删除</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>                                       
                                    </div>
                                    <!-- 分页信息 -->
                                    <div class="pageBox"></div>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
        <!--选择部门 Modal Templates-->
        <div id="modal-danger" class="modal modal-darkorange" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">选择部门</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="请输入部门名称" v-model="searchDeptName" style="display:inline-block; vertical-align:middle; width:50%;">
                            <button type="button" class="btn btn-info" @click="searchTreeData()"><i class="fa fa-search"></i>搜索</button>
                        </div>
                        <div class="row h400">
                            <div class="col-lg-12 col-xs-12 treeListBox">
                                <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                                <!-- tree template -->
                                <template>
                                    <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :isradio="true" :issearched="isSearched"></tree-view>
                                </template>
                                <!-- /tree template -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
        </div>
        <!--End 选择部门 Modal Templates-->
    </div>
</template>

<script>
require('pagination');
import tree from './listTree.vue';
export default {
    components: {
        'tree-view': tree
    },
    data() {
        return {            
            //树结构数据           
            treeData: [],
            //选中项数据
            activeData: [],
            vm: {},
            //弹出框选择的部门名称的数据
            deptNameData: '',
            deptId: '',
            //根据部门名称进行模糊搜索
            searchDeptName: '',
            //列表数据
            personData: [],
            //全部数据
            personDataAll: [],
            //分页
            queryData: Object.assign({}, this.$route.query),
            searchData: {
                userName: this.$route.query.userName || ''
            },

            isSearched:false,
        }
    },
    created: function() {
        this.getAll();
        this.getList();
        this.$watch('$route.fullPath', this.getList, this.searchPersonName);
        //console.log(this.getList);

        //这里获取树结构的数据
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/dept/queryDeptTreeList.do?token="+token)
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.treeData = data.obj;
            setTimeout(()=>{
                $(".treeListLoad").remove();
            })   
        });        

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        this.$on('handleCallback', item=>{            
            this.deptId = item.deptId;
            //点击当前部门根据部门id查询上级部门
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/getDeptInfoByLike.do?token="+token,{deptId:item.deptId})
            .then(data=>{
                if(!data.success){
                    return false
                }
                this.searchDeptName = item.name;

                //部门只有两级时maxDeptName为空
                this.deptNameData = (data.obj.maxDeptName || '') +'/'+ data.obj.middleDeptName +'/'+ data.obj.minDeptName;          
            });                       
        });
    },
    methods: {
        m_export(){
            tableExport('tableExcel');
        },
        m_exportAll(){
            tableExport('tableExcelAll');
        },
        getAll(){
            //获取当前列表的全部数据
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/user/queryListPlus.do?token="+token, {deptId:this.deptId,userName:this.searchData.userName})
            .then(data=>{
                if(!data.success){
                    return false
                }

                this.personDataAll = data.obj;
            });
        },
        getList(){
            //获取当前列表的数据和分页处理
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/user/queryUserOfAllByPage.do?token="+token, this.queryData)
            .then(data=>{
                if(!data.success){
                    return false
                }

                this.personData = data.obj.records;
                if(this.personData == undefined && this.queryData.currentPage == 1){
                    $(".pageBox").html('<div class="noData">抱歉，没有搜索到相关数据！</div>');
                }
                else{
                  $(".pageBox").html('<div id="page" class="m-pagination m-page"></div>');
                  this.initPage(data.obj.total);
                } 
            });
        },
        initPage: function(total) {
          let that = this;
          $("#page").pagination({
            //总数据数，生成分页则必须配置该属性以生成分页
            total: parseInt(total),
            //指定当前页数，索引从0开始，默认第1页 
            pageIndex: isNaN(this.queryData.currentPage-1) ? 0 : this.queryData.currentPage-1,
            pageSize: isNaN(this.queryData.pageSize) ? 10 : this.queryData.pageSize,
            firstBtnText: '&laquo;',
            lastBtnText: '&raquo;',
            prevBtnText: '&lsaquo;',
            nextBtnText: '&rsaquo;',
            //显示分页按钮数，包括首页尾页和上一页下一页按钮，推荐设置为基数
            pageBtnCount: 10,
            //是否显示分页信息
            showInfo: true,
            //是否显示跳转页
            showJump: true,
            //跳转按钮显示文字
            jumpBtnText:'GO',
            //是否显示选择每页数量
            showPageSizes: true,
            //配置可选每页数量
            pageSizeItems: [5, 10, 15, 20, 30],
            infoFormat: '共<span class="num">{total}</span>条数据，共<span class="num">{pageSize}</span>页，当前第<span class="num">{index}</span>页'
          }).on("pageClicked", function(event, data) {
            //分页按钮点击事件
            that.updatePage(data);
          }).on("pageSizeChanged", function(event, data) {
            that.updatePage(data);
          }).on("jumpClicked", function(event, data){
            that.updatePage(data);
          });
        },
        updatePage: function(data, flag){
            //更新queryData
            Object.assign(this.queryData, {
              currentPage: data.pageIndex+1,
              pageSize: data.pageSize,
            });
            this.refreshRouter();
        },
        refreshRouter(){
          //切换分页
          this.$router.push(this.$route.path  + '?' + util.serialize(this.queryData));
        },        
        //删除操作
        removeItem: function(item) {
          let token = localStorage.getItem('token');
          let _this = this;
          $.dialog({
            content: "被删除事项将无法恢复，请确认是否删除？",
            ok: function() {
              $.post(window.config.api + "/user/deleteUserOfAll.do?token=" + token, {
                  userId: item.userId, loginId: item.loginId})
                .then(data => {
                  if (!data.success) {
                    $.dialog(data.msg);
                  }
                  _this.getList();
                })
            },
            cancel: function() {}
          })
        },
        //列表中的搜索字段处理
        searchPersonName: function(){
            Object.assign(this.queryData, {currentPage:1, deptId:this.deptId}, this.searchData);
            this.refreshRouter();

            let token = localStorage.getItem('token');
            $.get(window.config.api + "/user/queryListPlus.do?token="+token, {deptId:this.deptId,userName:this.searchData.userName})
            .then(data=>{
                if(!data.success){
                    return false
                }

                this.personDataAll = data.obj;
            });

        },
        searchTreeData: function(){
            this.isSearched = this.searchDeptName?true:false;
            this.treeData = [];
            $(".treeListBox").append("<div class='col-lg-12 col-xs-12 treeListLoad'>数据正在加载中...</div>");
            //选择部门弹框中根据部门名称模糊搜索树数据
            let token = localStorage.getItem('token');
            //console.log(this.searchDeptName)
            $.post(window.config.api + "/dept/queryDeptTreeList.do?token="+token,{deptId:'',deptName:this.searchDeptName})
            .then(data=>{
                if(!data.success){
                    return false
                }
                this.treeData = data.obj;
                //console.log(JSON.stringify(this.treeData));
                $(".treeListLoad").remove();
            });
        },
        //重置按钮
        reset(){
            this.queryData = {};
            this.deptNameData = '';
            this.searchData.userName = '';
            this.deptId = '';
            this.refreshRouter();
        }     
    }
}


var idTmr;  
function  getExplorer() {  
    var explorer = window.navigator.userAgent ;  
    //ie  
    if (explorer.indexOf("MSIE") >= 0) {  
        return 'ie';  
    }  
    //firefox  
    else if (explorer.indexOf("Firefox") >= 0) {  
        return 'Firefox';  
    }  
    //Chrome  
    else if(explorer.indexOf("Chrome") >= 0){  
        return 'Chrome';  
    }  
    //Opera  
    else if(explorer.indexOf("Opera") >= 0){  
        return 'Opera';  
    }  
    //Safari  
    else if(explorer.indexOf("Safari") >= 0){  
        return 'Safari';  
    }  
}  
function tableExport(tableid) {  
    if(getExplorer()=='ie')  
    {  
        var curTbl = document.getElementById(tableid);  
        var oXL = new ActiveXObject("Excel.Application");  
        var oWB = oXL.Workbooks.Add();  
        var xlsheet = oWB.Worksheets(1);  
        var sel = document.body.createTextRange();  
        sel.moveToElementText(curTbl);  
        sel.select();  
        sel.execCommand("Copy");  
        xlsheet.Paste();  
        oXL.Visible = true;  

        try {  
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");  
        } catch (e) {  
            print("Nested catch caught " + e);  
        } finally {  
            oWB.SaveAs(fname);  
            oWB.Close(savechanges = false);  
            oXL.Quit();  
            oXL = null;  
            idTmr = window.setInterval("Cleanup();", 1);  
        }  

    }  
    else  
    {  
        tableToExcel(tableid)  
    }  
}  
function Cleanup() {  
    window.clearInterval(idTmr);  
    CollectGarbage();  
}  
var tableToExcel = (function() {  
    var uri = 'data:application/vnd.ms-excel;base64,',  
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',  
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },  
            format = function(s, c) {  
                return s.replace(/{(\w+)}/g,  
                        function(m, p) { return c[p]; }) }  
    return function(table, name) {  
        if (!table.nodeType) table = document.getElementById(table)  
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}  
        window.location.href = uri + base64(format(template, ctx))  
    }  
})()


</script>

<style lang="sass">
.search{
    float: right;
    text-align: right;
    .inverted{
        width: 400px;
        input, i{
            cursor: pointer;
        }
    }
}
.form-control{
    display: inline-block;
    vertical-align: middle;
} 
.modal-body{
    height:488px; 
    overflow-y:auto;
} 
</style>