<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：部门人员管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-lg-4 col-sm-4 col-xs-12 margin-bottom-20">
                    <div class="widget flat radius-bordered">
                        <div class="widget-header bg-lightred">
                            <span class="widget-caption">硚口区政府</span>
                        </div>
                        <div class="widget-body h257">
                            <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                            <!-- tree template -->
                            <template>
                                <tree-view :treedata="treeData" :activedata="activeData" :vm="vm"></tree-view>
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
</template>

<script>
import tree from '../tree.vue';
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
        //这里获取部门及人员树结构的数据
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/dept/queryDeptUserTreeList.do?token="+token)
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

        this.$on('handleCallback', res =>{
            let url = '/cloud/department/'+ res.id;
            //如果是员工就跳转到人员信息这个路由
            if(res.type === '1'){
                url = '/cloud/department/personnel/'+ res.id;                
            }

            //更新选中项
            //this.activeData.length = 0;
            let idx = this.activeData.indexOf(res.id);
            if(idx !== -1){
                this.activeData.splice(idx,1);
            }
            else{
                this.activeData.push(res.id);
            }

            this.$router.push(url);
        });     

        //默认将首页路由重置
        //this.treeData[0].id = 'index';

        //activeData控制高亮属性，有需要的话
        //id可以从this.$route对象获取
        //此处默认给1
        //this.activeData.id = 1;
    }
}
</script>

<style lang="sass">
.h257{
    min-height: 257px;
    max-height: 943px;
    overflow-y: auto;
}    
</style>
