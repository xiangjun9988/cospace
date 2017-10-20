 <template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：角色管理 / 应用授权
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="row margin-bottom-30">
                        <div class="col-lg-6 col-xs-12">
                            <router-link :to="'/cloud/role/apply_add/'+ $route.params.id" class="btn btn-blue margin-right-10"><i class="fa fa-plus"></i> 添加 </router-link>
                            应用分类：  <select v-model='roleType' v-on:change="showRole">
                                            <option value="">请选择</option>
                                            <template v-for="item in typeList">
                                                <option :value="item.dictId">{{item.simplyName}}</option>
                                            </template>
                                        </select>
                        </div>
                        <div class="col-lg-6 col-xs-12 text-align-right">
                            <input type="text" class="form-control" placeholder="应用名称查询" style="display:inline-block; width:50%;" v-model="searchKey">
                            <button type="button" class="btn btn-blue" v-on:click="refresh"><i class="fa fa-search"></i> 搜索 </button>
                            <button type="button" class="btn btn-danger" onclick="history.go(-1);"><i class="fa fa-arrow-left"></i> 返回 </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-xs-12 module" v-for="item in modules">
                            <template>
                                <!-- <h4>{{item.SHOW_NAME.indexOf(searchKey)}}</h4> -->
                                <h4>{{item.SHOW_NAME}}</h4>
                                <button type="button" class="btn btn-danger" v-on:click="deleteRoleApp(item.ROLE_ID,item.APP_ID)"><i class="fa fa-trash-o"></i> 删除 </button>
                            </template>
                        </div>                        
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            modules: [
                                                                       
            ],
            searchKey: '',
            //应用分类
            typeList:'',
            roleType: '',
        }
    },
    created(){
        //初始化加载内容
        let token = localStorage.getItem('token');           
        $.get(window.config.api + "/dictInfo/queryList.do?token="+token,{dictCode:"1002"})
        .then(data=>{
            if(!data.success){
                return false
            }
            //alert(data.msg);
            this.typeList = data.obj;
            
        });  
    
        this.refresh();
        //alert(this.$route.params.id)
    },
    methods: {
        deleteRoleApp(roleid,appid){
            let _this = this;
            $.dialog({
                content : '请确认是否删除此应用',
                reverse: true,
                ok : function() {
                    let token = localStorage.getItem('token');           
                    $.post(window.config.api + "/role/deleteRoleApp.do?token="+token,{roleId:roleid,appId:appid})
                    .then(data=>{
                        if(!data.success){
                            return false
                        }
                        _this.refresh();
                    });   
                },
                cancel : function() {
                    
                }
            });

                     
        },
        //应用分类筛选
        showRole(){
            this.refresh();
        },
        refresh(){
            let token = localStorage.getItem('token');
            $.post(window.config.api + "/role/queryRoleApp.do?token="+token,{roleId:this.$route.params.id})
            .then(data=>{
                if(!data.success){
                    //请求失败
                    return false
                }
                //console.log(JSON.stringify(data.obj));
                let arr = [];
                $.each(data.obj, (index, value, array) => { 
                    //console.log(value)
                    if(value.SHOW_NAME.indexOf(this.searchKey) != -1 && (value.APP_TYPE == this.roleType || this.roleType == "") ){
                        
                        arr.push(value);
                    }
                });
                this.modules = arr;
                //this.modules = data.obj;
            });
        }
    }
}
</script>

<style lang="sass">
.module{
    text-align: center;
    .btn{
        margin: 10px 0 80px;
    }
}

</style>
