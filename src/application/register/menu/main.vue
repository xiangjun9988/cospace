<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：菜单管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <!-- 顶部固定部分 -->
                    <ul class="no-padding-left margin-bottom-10">
                        <router-link to="/application/register" class='btn btn-info'>
                            <i class='glyphicon glyphicon-circle-arrow-left'></i>返回列表
                        </router-link>
                        <router-link :to="{path:'/application/register/role/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                            <i class='glyphicon glyphicon-list'></i>角色管理
                        </router-link>
                       <router-link :to="{path:'/application/register/parameter/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>                                 
                            <i class='glyphicon glyphicon-tags margin-right-5'></i>系统参数
                        </router-link>    
                        <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'>
                            <i class='glyphicon glyphicon-pencil'></i>应用信息
                        </router-link>
                    </ul> 
                    <div class="row margin-top-10">
                        <div class="col-lg-4 col-sm-4 col-xs-12">
                            <div class="widget flat radius-bordered">
                                <div class="widget-header bg-lightred">
                                    <span class="widget-caption">系统菜单</span>
                                </div>
                                <div class="widget-body h338">
                                    <router-link :to="{path:'/application/register/menu/add_level/index',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class="btn btn-default shiny margin-bottom-10"><i class="glyphicon glyphicon-plus margin-right-5"></i>新增一级菜单</router-link>
                                    <!-- tree template -->
                                    <template>
                                        <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :hasadd="true" :hasdel="true"></tree-view>
                                    </template>
                                    <!-- /tree template -->
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-sm-8 col-xs-12">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tree from './tree.vue';
export default {
    components: {
        'tree-view' : tree
    },
    data: ()=>({
        //树结构数据
        treeData: [],
        //选中项数据
        activeData: [],
        vm: {}
    }),
    created: function(){
        //通过appCode获取相应模块树结构的数据
        let token = localStorage.getItem('token');
        $.post(window.config.api + "/module/queryModuleTreeVList.do?token="+token,{appCode:this.$route.query.appCode})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.treeData = data.obj;
        });

        //将树的顶级目录传进去用于分发事件
        this.vm = this;

        this.$on('handleCallback', res =>{
            let url = '/application/register/menu/'+ res.moduleId +'?appCode='+res.appCode+'&appId='+this.$route.query.appId;
            //更新选中项
            //this.activeData.length = 0;
            let idx = this.activeData.indexOf(res.moduleId);
            if(idx !== -1){
                this.activeData.splice(idx,1);
            }
            else{
                this.activeData.push(res.moduleId);
            }
            this.$router.push(url);
        });

        this.$on('treeAddCallback', res=>{
            let url = '/application/register/menu/add/'+ res.moduleId +'?appCode='+res.appCode+'&parentId='+res.parentId+'&appId='+this.$route.query.appId;
            this.$router.push(url);
        });

        //删除操作依赖菜单的moduleId和appCode来作为标示
        this.$on('treeDelCallback', res=>{
            let token = localStorage.getItem('token');            
            $.post(window.config.api + "/roleModule/queryModuleAndChildren.do?token="+token,{moduleId:res.node.moduleId,appCode:this.$route.query.appCode})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    $.dialog('删除失败！');                    
                    return false;
                }
                //判断当前操作菜单下是否有子菜单
                if(data.msg==1){
                    $.post(window.config.api + "/roleModule/deleteModuleAndChildren.do?token=" + token,{moduleId:res.node.moduleId,appCode:this.$route.query.appCode})
                        .then(data => {
                        if (!data.success) {
                            $.dialog('删除失败！');
                            return false;
                        }
                        $.dialog({
                            content: '删除成功！',
                            ok: function(){
                                res.parent.splice(res.index, 1);
                                location.reload();
                            }
                        });
                    })                  
                }
                else if(data.msg==2){
                    var _this = this;
                    $.dialog({
                        content:'该菜单下有子菜单,是否删除当前菜单及当前菜单下的子菜单？',
                        ok: function() {
                            $.post(window.config.api + "/roleModule/deleteModuleAndChildren.do?token=" + token,{moduleId:res.node.moduleId,appCode:_this.$route.query.appCode})
                                .then(data => {
                                if (!data.success) {
                                    $.dialog('删除失败！');
                                    return false;
                                }
                                $.dialog({
                                    content: '删除菜单及子菜单成功！',
                                    ok: function(){
                                        res.parent.splice(res.index, 1);
                                        location.reload();
                                    }
                                });
                            })
                        },
                        cancel: function() {}                        
                    });                     
                }
            });            
        });
    }
}
</script>

<style lang="sass">
.h338{
    min-height: 338px;
    max-height: 364px;
    overflow-y: auto;
}    
</style>

