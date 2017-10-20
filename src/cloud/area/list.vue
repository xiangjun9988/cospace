<template>
  <div class="page-content">
    <div class="page-header position-relative">
      <div class="header-title">
        <h1>
            <i class="fa fa-home"></i>
            当前位置：区划管理
        </h1>
      </div>
    </div>
    <div class="page-body">
      <div class="row">
        <div class="col-xs-12 col-md-12 toolbar clearfix">
          <router-link to="add" class="btn btn-info"><i class="fa fa-plus"></i>新增</router-link>
          <a href="javascript:;" class="btn btn-danger" @click="m_export"><i class="fa fa-download"></i>导出当页</a>
          <a href="javascript:;" class="btn btn-danger" @click="m_exportAll"><i class="fa fa-download"></i>导出全部</a>
          <div class="search m-search">
            <input type="text" class="form-control m-search-left" v-model="searchData.areaName" placeholder="地区名称查询">
            <a href="javascript:;" class="btn btn-info m-personnel-right" @click="searchArea"><i class="fa fa-search"></i>搜索</a>
            <a href="javascript:;" class="btn btn-danger" @click="reset()"><i class="fa fa-refresh"></i>重置</a>

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
                          <th width="30%">
                            地区名称
                          </th>
                          <th width="20%">
                            区划编码
                          </th>
                          <th width="10%">
                            地区级别
                          </th>
                          <th width="20%">
                            父区划编码
                          </th>
                          <th width="10%" class="text-align-center">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in areaData">
                          <td>{{item.ROW_ID}}</td>
                          <td>{{item.areaName}}</td>
                          <td>{{item.areaCode}}</td>
                          <td>{{item.areaLevel}}</td>
                          <td>{{item.parentId}}</td>
                          <td>
                            <router-link :to="'edit/'+item.areaId" class="btn btn-info btn-xs margin-right-10"><i class="fa fa-edit"></i> 编辑 </router-link>
                            <a href="javascript:;" class="btn btn-danger btn-xs delete" @click="removeItem(index, item)"><i class="fa fa-trash-o"></i>删除</a>
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
                          <th width="30%">
                            地区名称
                          </th>
                          <th width="20%">
                            区划编码
                          </th>
                          <th width="10%">
                            地区级别
                          </th>
                          <th width="20%">
                            父区划编码
                          </th>
                          <th width="10%" class="text-align-center">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in personDataAll">
                          <td>{{item.ROW_ID}}</td>
                          <td>{{item.areaName}}</td>
                          <td>{{item.areaCode}}</td>
                          <td>{{item.areaLevel}}</td>
                          <td>{{item.parentId}}</td>
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
  </div>
</template>

<script>
require('pagination');
export default {
  data() {
    return {
      queryData: Object.assign({}, this.$route.query),
      areaData: [],
      personDataAll:[],
      searchData: {
        areaName: this.$route.query.areaName || '',
      }
    }
  },
  created: function() {
    this.getAll();
    this.getList();
    this.$watch('$route.fullPath', this.getList, this.searchArea);
  },
  methods: {
    m_export(){
      tableExport('tableExcel');
    },
    m_exportAll(){
      tableExport('tableExcelAll');
    },
    getAll(){
      let token = localStorage.getItem('token');
      //区划列表数据的渲染     
      $.post(window.config.api + "/areaCode/queryList.do?token=" + token, {areaName:this.searchData.areaName})
      .then(data => {
        if (!data.success) {
          return false
        }
        this.personDataAll = data.obj;
      });
    },
    getList(){
      let token = localStorage.getItem('token');
      //区划列表数据的渲染和分页的处理      
      $.post(window.config.api + "/areaCode/queryListByPage.do?token=" + token, this.queryData)
      .then(data => {
        if (!data.success) {
          return false
        }
        this.areaData = data.obj.records;

        if(this.areaData == undefined && this.queryData.currentPage == 1){
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
    //删除选中行地区的数据
    removeItem: function(index, item) {
      let token = localStorage.getItem('token');
      $.dialog({
        content: "被删除事项将无法恢复，请确认是否删除？",
        ok: function() {
          $.post(window.config.api + "/areaCode/delete.do?token=" + token, {
              areaId:item.areaId, areaCode:item.areaCode})
            .then(data => {
              if (!data.success) {
                $.dialog(data.msg);
              }
              window.location.reload();
              this.areaData.splice(index, 1);
            })
        },
        cancel: function() {}
      })
    },
    //搜索字段处理
    searchArea: function(){
      Object.assign(this.queryData, {currentPage:1}, this.searchData);
      this.refreshRouter();

      let token = localStorage.getItem('token');
      //区划列表数据的渲染     
      $.post(window.config.api + "/areaCode/queryList.do?token=" + token, {areaName:this.searchData.areaName})
      .then(data => {
        if (!data.success) {
          return false
        }
        this.personDataAll = data.obj;
      });
    },
    //重置按钮
    reset(){
      this.queryData = {};
      this.searchData.areaName = '';
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
  .form-control{
    display:inline-block;
    vertical-align: middle;
    width: 50%;
  }
}
</style>

