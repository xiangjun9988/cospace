 <template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用注册 / 角色管理 / 分配
                </h1>
            </div>
        </div>
        <div class="page-body">           
            <!-- 顶部固定部分 -->
            <ul class="no-padding-left margin-bottom-20">
                <router-link :to="{path:'/application/register/role/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-info'>
                    <i class='glyphicon glyphicon-circle-arrow-left'></i>返回角色列表
                </router-link>
                    <router-link :to="{path:'/application/register/menu/index',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>
                      <i class='glyphicon glyphicon-list'></i>菜单管理
                    </router-link>
                    <router-link :to="{path:'/application/register/parameter/list',query:{appCode:$route.query.appCode,appId:$route.query.appId}}" class='btn btn-danger'>                                 
                        <i class='glyphicon glyphicon-tags margin-right-5'></i>系统参数
                    </router-link>
                    <router-link :to="'/application/register/edit/'+$route.query.appId" class='btn btn-danger'><i class='glyphicon glyphicon-pencil'></i>应用信息</router-link>
            </ul>
            <div class="row">
                <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-right">
                    <div class="widget-body">
                        <div class="row">
                            <div class="col-lg-6 col-xs-6">
                                <div class="form-group">
                                    <span class="input-icon icon-right inverted">
                                        <input type="text" placeholder="请输入部门或人员名称" class="form-control input-sm" v-model="searchName">
                                        <i class="glyphicon glyphicon-search bg-blue" v-on:click="searchTreeList" style="cursor:pointer;"></i>
                                    </span>
                                </div>                             
                            </div>
                        </div>
                        <div class="row h380">
                            <div class="col-lg-12 col-xs-12">
                                <div class="col-lg-12 col-xs-12 treeListLoad">数据正在加载中...</div>
                                <!-- 分配树形菜单 -->
                                <!-- tree template -->
                                <template v-for="(treeData, index) in treeList">
                                    <tree-view :treedata="treeData" :activedata="activeData" :vm="vm" :issearched="isSearched" 
                                    :searchname="searchName0" :roleid="$route.query.roleId"></tree-view>
                                </template>
                                <!-- /tree template -->                            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-sm-2 col-xs-12 arrow">
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="col-lg-5 col-sm-5 col-xs-12 no-padding-left">
                    <div class="widget-body">
                        <div class="row margin-bottom-10">
                            <div class="col-lg-12 col-xs-12" style="height:35px;line-height:35px;">
                                <strong>已选择人数：<span>{{roleInfos.length}}</span></strong>
                            </div>
                        </div>
                        <div class="row h380">
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
import tree from './assigne_tree.vue';
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
    methods: {
        //查询角色绑定用户 
        RoleMemberInfo(){
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/queryRoleMemberInfo.do?token="+token,{roleId:this.$route.query.roleId})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                //console.log(JSON.stringify(data))
                this.roleInfos = data.obj || [];
            });  
        },
        //删除角色绑定用户
        deleteRoleMember(item){
            // //绑定人员
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/updateRoleMember.do?token="+token,{roleId:this.$route.query.roleId, userId:item.userId, operateType:'delete'})
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
            $.get(window.config.api + "/dept/queryDeptUserTreeListPlus.do?token="+token,{searchName:this.searchName})
            .then(data=>{
                if(!data.success){
                    //返回错误状态 
                    return false;
                }
                this.treeList = data.obj || [];
                $(".treeListLoad").remove();
            }); 
        }
    }  
}
</script>

<style lang="sass">
.h380{
    min-height: 380px;
    height: 380px;
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
