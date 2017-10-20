 <template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：角色管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
                    <a href="javascript:;" class="btn btn-danger" @click="m_export"><i class="fa fa-download"></i>导出当页</a>
                    <a href="javascript:;" class="btn btn-danger" @click="m_exportAll"><i class="fa fa-download"></i>导出全部</a>
                    <div class="search m-search">
                        <input type="text" class="form-control m-search-left" placeholder="角色名称查询" v-model="roleName">
                        <a href="javascript:;" class="btn btn-info m-personnel-right" v-on:click="searchRole"><i class="fa fa-search"></i>搜索</a>
                        <a href="javascript:;" class="btn btn-danger" v-on:click="reset"><i class="fa fa-refresh"></i>重置</a>
                    </div>
                    <div class="row margin-top-10">
                        <div class="col-xs-12 col-md-12">
                            <div class="widget">
                                <div class="widget-body">
                                    <div class="table-scrollable">
                                        <table id="tableExcel" class="table table-striped table-bordered table-hover">
                                            <thead class="bordered-blue">
                                                <tr>
                                                    <th width="10%">
                                                        序号
                                                    </th>
                                                    <th width="16%">
                                                        角色名称
                                                    </th>
                                                    <th width="16%">
                                                        角色编码
                                                    </th>
                                                    <th width="16%">
                                                        角色描述
                                                    </th>
                                                    <th width="10%">
                                                        是否可用
                                                    </th>
                                                    <th width="32%" class="text-align-center">
                                                        操作
                                                    </th>                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in roleRows">
                                                    <td>{{item.ROW_ID}}</td>
                                                    <td>{{item.roleName}}</td>
                                                    <td>{{item.roleCode}}</td>
                                                    <td>{{item.remark}}</td>
                                                    <td v-bind:class="{'red':parseInt(item.isUse), 'blue':!parseInt(item.isUse)}">{{parseInt(item.isUse)?"否":"是"}}</td>
                                                    <td>
                                                        <router-link to="edit" class="btn btn-info btn-xs margin-right-10" v-on:click.native="roleEdit(item.roleId)"><i class="fa fa-edit"></i> 编辑 </router-link>
                                                        <a href="javascript:;" class="btn btn-danger btn-xs margin-right-10" v-on:click="roleDelete(item)"><i class="fa fa-trash-o"></i> 删除 </a>
                                                        <router-link :to="'apply/'+item.roleId" class="btn btn-blue btn-xs margin-right-10"><i class="fa fa-dribbble"></i> 应用授权 </router-link>
                                                        <router-link :to="'user/'+item.roleId" class="btn btn-darkorange btn-xs"><i class="fa fa-user"></i> 用户管理 </router-link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>


                                        <table id="tableExcelAll" style="display:none;" class="table table-striped table-bordered table-hover">
                                            <thead class="bordered-blue">
                                                <tr>
                                                    <th width="10%">
                                                        序号
                                                    </th>
                                                    <th width="16%">
                                                        角色名称
                                                    </th>
                                                    <th width="16%">
                                                        角色编码
                                                    </th>
                                                    <th width="16%">
                                                        角色描述
                                                    </th>
                                                    <th width="10%">
                                                        是否可用
                                                    </th>
                                                    <th width="32%" class="text-align-center">
                                                        操作
                                                    </th>                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in personDataAll">
                                                    <td>{{item.ROW_ID}}</td>
                                                    <td>{{item.roleName}}</td>
                                                    <td>{{item.roleCode}}</td>
                                                    <td>{{item.remark}}</td>
                                                    <td v-bind:class="{'red':parseInt(item.isUse), 'blue':!parseInt(item.isUse)}">{{parseInt(item.isUse)?"否":"是"}}</td>
                                                    <td>
                                                        <router-link to="edit" class="btn btn-info btn-xs margin-right-10" v-on:click.native="roleEdit(item.roleId)"><i class="fa fa-edit"></i> 编辑 </router-link>
                                                        <a href="javascript:;" class="btn btn-danger btn-xs margin-right-10" v-on:click="roleDelete(item)"><i class="fa fa-trash-o"></i> 删除 </a>
                                                        <router-link :to="'apply/'+item.roleId" class="btn btn-blue btn-xs margin-right-10"><i class="fa fa-dribbble"></i> 应用授权 </router-link>
                                                        <router-link :to="'user/'+item.roleId" class="btn btn-darkorange btn-xs"><i class="fa fa-user"></i> 用户管理 </router-link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table> 



                                    </div>
                                    <!-- 分页信息 -->
                                    <div class="pageBox">
                                        <div id="page" class="m-pagination"></div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>                              
                </div>
            </div>
        </div>
    </div>
</template>

<script>
require('pagination');
export default{
    data() {
        return {
            roleRows: [
            /*{
            "ROW_ID": '1', //角色编号 
            "isUse": "0", //是否可用 0 可用   1 不可用
            "appCode": "WISDOMGOV", //应用编码
            "roleCode": "CKCZ",     //角色编码
            "roleName": "窗口出证", //角色名称
            "roleId": "1dc400ca2f9a404d89b77c5cbb458143"    //
            "remark": '' //角色描述
            }*/
            ],
            roleName:'',       //模糊搜索角色名称    
            currentPage: 1,    //当前显示页码（第几页，不传值，默认为1）    
            pageSize:10,       //每页显示多少条记录数（默认为10）
            personDataAll:[]

        }
    },
    created: function(){
        this.refresh(); 
        this.getAll();
    },        
    mounted: function(){
       
    },
    methods:  {
        m_export(){
            tableExport('tableExcel');
        },
        m_exportAll(){
            tableExport('tableExcelAll');
        },
        getAll(){
            //获取当前列表的数据和分页处理
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/queryList.do?token="+token, {roleName:this.roleName,appCode:'COSPACE'})
            .then(data=>{
                if(!data.success){
                    return false
                }

                this.personDataAll = data.obj;
            });
        },
        refresh(){
            let token = localStorage.getItem('token');
            //console.log(this.roleName)
            $.get(window.config.api + "/role/queryListByPage.do?token="+token,{roleName:this.roleName,currentPage:this.currentPage,pageSize:this.pageSize,appCode:'COSPACE'})
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.roleRows = data.obj.records;
                //console.log(JSON.stringify(data));
                if(this.roleRows == undefined && this.currentPage != 1){
                    this.currentPage = this.currentPage-1;
                    this.refresh(); 
                }
                if(this.roleRows == undefined && this.currentPage == 1){
                    $(".pageBox").html('<div class="noData">抱歉，没有搜索到相关数据！</div>');
                }else{
                    //console.log(JSON.stringify(data.obj.records));
                    $(".pageBox").html('<div id="page" class="m-pagination"></div>');
                    this.initPage(data.obj.total);
                }
                                 
            });  
        },
        initPage: function(total) {
          let that = this;
          $("#page").pagination({
            //总数据数，生成分页则必须配置该属性以生成分页
            total: parseInt(total) || 0,
            //指定当前页数，索引从0开始，默认第1页 
            pageIndex: this.currentPage-1 || 0,
            pageSize: this.pageSize || 0,
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
            that.currentPage = data.pageIndex + 1;
            //alert(data.pageIndex + 1)
            that.refresh();
          }).on("pageSizeChanged", function(event, data) {
            //页面大小切换事件
            that.currentPage = 1;
            that.pageSize = data.pageSize;
            that.refresh();
          }).on("jumpClicked", function(event, data){
            //跳转按钮点击事件
            that.currentPage = data.pageIndex + 1;
            //alert(data.pageIndex + 1)
            that.refresh();
          });
        },
        //角色关键词搜索
        searchRole(){
            this.currentPage = 1;
            this.refresh(); 

            //获取当前列表的数据和分页处理
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/queryList.do?token="+token, {roleName:this.roleName,appCode:'COSPACE'})
            .then(data=>{
                if(!data.success){
                    return false
                }

                this.personDataAll = data.obj;
            });
        },

        //点击编辑时保存当前点击项的唯一roleId标识
        roleEdit(roleId){
            localStorage.setItem('cospaseRoleEdit', roleId);
            //alert(roleId)
            //alert(localStorage.getItem('cospaseRoleEdit'))
        },

        //删除角色
        roleDelete(item){
            //console.log(item);

            let _this = this,
                token = localStorage.getItem('token');
            //删除角色信息请求
            $.dialog({
                content : "您是否确认删除此角色？",
                reverse: true,
                ok : function() {
                    $.post(window.config.api + "/role/deleteRoleModuleByRoleId.do",{token,roleId:item.roleId})            
                    .then(data=>{
                        if(!data.success){
                            //返回错误状态                    
                            return false;
                        }
                        
                        if(data.msg =="请先将角色编辑为不可用，再进行删除操作!"){
                            $.dialog({
                                content : data.msg,
                                reverse: true,
                                ok : function() {
                                    
                                },
                            });
                        }else{
                            $.dialog({
                                content : data.msg,
                                reverse: true,
                                ok : function() {
                                    _this.refresh()
                                },
                            });
                        }
                    })    
                     
                },
                cancel : function() {
                   
                }
            });
                    
        },
        reset(){
            this.roleName = "",
            this.pageSize = 10;
            this.currentPage = 1;
            this.refresh(); 
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

<style scoped lang="sass">
.search{
    float: right;
    text-align: right;
    .form-control{
        display:inline-block;
        vertical-align: middle;
        width: 50%;
    }
}
</style>

