 <template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：角色管理 / 用户管理
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row margin-bottom-30">
                <button type="button" class="btn btn-danger margin-left-30" onclick="history.go(-1);"><i class="fa fa-arrow-left"></i>返回应用列表</button>
            </div>

            <div class="row">
                <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-right">
                    <div class="widget-body">
                        <div class="row">
                            <div class="col-lg-6 col-xs-6">
                                <div class="form-group">
                                    <span class="input-icon icon-right inverted">
                                        <input type="text" placeholder="请输入部门或人员名称" class="form-control input-sm" v-model="searchName">
                                        <i class="glyphicon glyphicon-search bg-blue" v-on:click="searchTreeList"></i>
                                    </span>
                                </div>                             
                            </div>
                        </div>
                        <div class="row h400">
                            <div class="col-lg-12 col-xs-12 treeListBox">
                                <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                                <!-- 用户管理树形菜单 -->
                                <!-- tree template -->
                                <template v-for="(treeData, index) in treeList">
                                    <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :issearched="isSearched" :searchname="searchName0"></tree-view>
                                </template>
                                <!-- /tree template -->                            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-sm-2 col-xs-12 arrow">
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-left" style="overflow-x: auto;">
                    <div class="widget-body">
                        <div class="row margin-bottom-20">
                            <div class="col-lg-12 col-xs-12" style="height:34px;line-height:34px;">
                                <strong>已选择人数：<span>{{roleInfos.length}}</span></strong>
                            </div>
                        </div>
                        <div class="row h400">
                            <div class="col-lg-12 col-xs-12">
                                <template v-for="(item, index) in roleInfos">    
                                    <div class="roleInfo">
                                        <i class="fa fa-user yellow"></i> <span class="margin-right-5">{{item.userName}}</span>[{{item.simply3Name}}<span v-if="item.simply3Name">/</span>{{item.simply2Name}}<span v-if="item.simply2Name">/</span>{{item.simplyName}}]<i class="fa fa-trash-o danger margin-left-20" v-on:click="deleteRoleMember(item)"></i>
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
import tree from './tree.vue';
export default{
    components: {
        'tree-view' : tree,
    },    
    data: ()=>({
        //treeList
        treeList: [],
        //树结构数据
        treeData: [],
        //选中项数据
        activeData: [],
        vm: {},
        //角色绑定用户列表
        roleInfos: [],
        //模糊查询
        searchName: '',
        //传入匹配词
        searchName0:'',
        isSearched:false,
    }),
    created: function(){
        //查询角色绑定用户 
        this.RoleMemberInfo();
        //初始化部门人员
        this.searchTreeList();

        //将树的顶级目录传进去用于分发事件
        this.vm = this;
        this.$on('handleCallback', res =>{
            if(res.type === '1'){}

            //更新选中项
            //this.activeData.length = 0;
            //人员之前没有点击过就加上标签
            let idx = this.activeData.indexOf(res.id);
            if(idx !== -1){
                //this.activeData.splice(idx,1);
            }else{
                this.activeData.push(res.id);
            }

            //查询角色绑定用户 
            this.RoleMemberInfo();
        }); 
    },
    mounted : function(){
        
    },
    methods: {
        //查询角色绑定用户 
        RoleMemberInfo(){
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/queryRoleMemberInfo.do?token="+token,{roleId:this.$route.params.id})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                this.roleInfos = data.obj || [];
                //console.log(JSON.stringify(data.obj));
            });  
        },
        //删除角色绑定用户
        deleteRoleMember(item){
            // //绑定人员
            let token = localStorage.getItem('token');
            //console.log(this.$route.params.id +'=='+item.id)
            $.get(window.config.api + "/role/updateRoleMember.do?token="+token,{roleId:this.$route.params.id, userId:item.userId, operateType:'delete' })
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                $.dialog(data.msg);  
                this.RoleMemberInfo();
            });  
        },
        //模糊查询部门或人员名称
        searchTreeList(){
            this.isSearched = this.searchName?true:false;
            this.searchName0 = this.searchName;
            this.treeList = [];
            $(".treeListBox").append("<div class='col-lg-12 col-xs-12 treeListLoad'>数据正在加载中...</div>");
            let token = localStorage.getItem('token');
            //alert(this.searchName)
            $.get(window.config.api + "/dept/queryDeptUserTreeListPlus.do?token="+token,{searchName:this.searchName})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                this.treeList = data.obj || [];
                //console.log(JSON.stringify(this.treeList));
                $(".treeListLoad").remove();
            });
        }
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
