 <template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用注册 》角色管理 》数据权限
                </h1>
            </div>
        </div>
        <div class="page-body">
            
                <!-- 顶部固定部分 -->
                <ul>
                    <router-link to="/application/register" class='btn btn-blue'>
                        <i class='glyphicon glyphicon-circle-arrow-left'></i>返回列表
                    </router-link>
                    <router-link to="/application/register/menu" class='btn btn-blue'>
                        <i class='glyphicon glyphicon-list'></i>菜单管理
                    </router-link>
                    <router-link to="/application/register/edit" class='btn btn-blue'>
                        <i class='glyphicon glyphicon-pencil'></i>应用信息
                    </router-link>
                </ul>

                <div class="row">
                    <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-right">
                        <div class="widget-body">
                            <div class="row">
                                <div class="col-lg-6 col-xs-6">
                                    <div class="form-group">
                                        <span class="input-icon icon-right inverted">
                                            <input type="text" placeholder="请输入部门或人员名称" class="form-control input-sm" >
                                            <i class="glyphicon glyphicon-search bg-blue"></i>
                                        </span>
                                    </div>                             
                                </div>
                            </div>
                            <div class="row h400">
                                <div class="col-lg-12 col-xs-12 treeListBox">
                                    <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-2 col-xs-12 arrow">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                    <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-left">
                        <div class="widget-body">
                            <div class="row margin-bottom-20">
                                <div class="col-lg-12 col-xs-12" style="height:34px;line-height:34px;">
                                    <strong>已选择人数：<span>10</span></strong>
                                </div>
                            </div>
                            <div class="row h400">
                                <div class="col-lg-12 col-xs-12">
                                    <template>    
                                        <div class="roleInfo">
                                            <i class="fa fa-user yellow"></i>张三 <i class="fa fa-trash-o danger margin-left-20"></i>
                                        </div>
                                    </template>       
                                </div>
                            </div>                                                
                        </div>
                    </div>                  
                </div>
            
        </div>
    </div>
</template>

<script>
export default{
    components: {
       
    },    
    data: ()=>({
       
    }),
    created: function(){
       

    },
    mounted : function(){
        
    },
    methods: {
        
    }  
}
</script>

<style lang="sass">
.h400{
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;
}
.arrow{
    text-align: center;
    font-size: 48px;
    color: #fff;
    margin-top: 205px;
}
.roleInfo{
    cursor: pointer;
    margin-bottom: 5px;
    .danger{
        display: none;
    }
    &:hover .danger{
        display: inline-block;
    }
}
</style>
