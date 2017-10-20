<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：组织机构
	            </h1>
	        </div>
	    </div>
	    <div class="page-body">
			<div class="row">
	            <div class="col-lg-4 col-sm-4 col-xs-12 margin-bottom-20">
	                <div class="widget flat radius-bordered">
	                    <div class="widget-header bg-lightred">
	                        <span class="widget-caption">组织机构</span>
	                    </div>
	                    <div class="widget-body h257">
                            <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
	                    	<!-- tree template -->
							<template>
							    <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :hasadd="true" :hasdel="true"></tree-view>
							</template>
							<!-- /tree template -->
	                    </div>
	                </div>
	            </div>
	            <div class="col-lg-8 col-sm-8 col-xs-12">
                    <router-view v-on:viewin="initTree"></router-view>
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
        this.initTree();

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        let _this = this;

        this.$on('handleCallback', res =>{
            let url = '/cloud/zzjg/'+ res.deptId;
            //更新选中项
            //this.activeData.length = 0;
            let idx = this.activeData.indexOf(res.deptId);
            if(idx !== -1){
                this.activeData.splice(idx,1);
            }
            else{
                this.activeData.push(res.deptId);               
            }
            this.$router.push(url);
        });

        this.$on('treeAddCallback', res=>{
            let url = '/cloud/zzjg/add/index';
            this.$router.push({path:url, query:{id: res.deptId,parentName:res.deptName}});
        });

        //删除操作依赖id作为唯一标示
        this.$on('treeDelCallback', res=>{
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/dept/deleteDept.do?token="+token,{deptId:res.node.id})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    $.dialog(data.msg);                    
                    return false;
                }
                $.dialog(data.msg);
                _this.initTree();
                //res.parent.splice(res.index, 1);
            });            
        });

        //默认将首页路由重置
        //this.treeData[0].id = 'index';

        //activeData控制高亮属性，有需要的话
        //id可以从this.$route对象获取
        //此处默认给1
        //this.activeData.id = 1;
    },
    methods:{
        initTree(){
            //这里获取树结构的数据
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/dept/queryDeptTreeList.do?token="+token)
            .then(data=>{
                if(!data.success){
                    //返回错误状态                    
                    return false;
                }
                this.treeData = data.obj;
                $(".treeListLoad").remove();
            });
        }
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

