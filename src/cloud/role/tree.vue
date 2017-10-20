  <template>
    <ul class="tree">
        <template v-for="(item, index) in treedata">
            <li :class="{'show-child': item.showChild, 'active': ischeckbox && activedata.indexOf(item.id) !==-1}" 
                v-if="JSON.stringify(item).indexOf(searchname) != -1">
                <a href="javascript:;" :class="{'active': !ischeckbox && activedata.indexOf(item.id) !==-1}">
                    <i class="blue fa" :class="{'fa-folder': item.childrenList && !item.showChild, 'fa-folder-open': item.showChild }" @click="clickToggle($event,item)"></i>
                    <div class="radio">
                        <label class="no-padding-left">
                            <span class="text" :title="item.parentName +'/'+item.name"><span v-if="item.parentName && issearched">{{item.parentName || ""}}/</span>{{item.name}}</span>
                        </label>
                    </div> 
                    <i class="blue glyphicon glyphicon-plus-sign tree-add margin-left-5" v-if="!item.childrenList" v-on:click="bindRole($event,item)"></i>
                </a>
                <tree-view 
                    :treedata="item.childrenList" 
                    :activedata="activedata" 
                    :vm="vm" 
                    :ischeckbox="ischeckbox"
                    :issearched="issearched"
                    :searchname="searchname">
                </tree-view>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
    name: 'tree-view',
    props: {
        treedata: Array,
        activedata: Array,
        vm: Object,
        ischeckbox: Boolean,
        issearched:Boolean,
        searchname:String,
    },
    created(){
        //遍历当前分支下的所有数据进行匹配
        // this.treedata.forEach(function(item){

        // });        
    },    
    methods: {
        //展开或收缩树
        clickToggle(e,item){
            //只处理有子菜单的项
            if(item.childrenList){
                this.$set(item, 'showChild', !item.showChild);
            }
            e.stopPropagation();
        },
        //只对人员允许绑定,对部门不允许绑定
        bindRole(e,item){
            //console.log(JSON.stringify(item.childrenList));
            //console.log(this.$route.params.id);
            if(item.childrenList){
                return false;
            }
            
            // //绑定人员
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/role/updateRoleMember.do?token="+token,{roleId:this.$route.params.id, userId:item.id, operateType:'add' })
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                $.dialog(data.msg);  
                //添加点击后标志，并刷新视图
                this.vm.$emit('handleCallback', item);
                //alert(data.msg)
                //this.treeData = data.obj;
            });
            e.stopPropagation();
        }
    }
}
</script>

<style scoped lang="sass">
.tree{
    margin-bottom: 0;
    ul{
        display: none;
    }
    &:before{
        bottom: 13px;
    }
    .show-child>ul{
        display: block;
    }
    .active{
        background: #eee;
    }
    li{
        position: relative;
        list-style: none;
        &:before{
            display: inline-block;
            content: "";
            position: absolute;
            top: 16px;
            left: -13px;
            width: 17px;
            height: 0;
            border-top: 1px dotted #666;
            z-index: 1;
        }
        &>a{
            display: block;
            height: 29px;
            line-height: 19px;
            padding: 5px;
            overflow: hidden;
            color: #333;
            text-decoration: none;
            &.tree-add{
                display: inline-block;
                padding: 0;
            }
            &.router-link-active{
                color: #2dc3e8;
            }
            &:hover{
                background: #eee;
                .handle{
                    display: inline-block;
                }               
            }
            .radio{
                display: inline-block;
                margin: 0;
            }
            .handle{
                display: none;
                margin-left: 20px;
            }
        }
        &>ul{
            margin-left:10px;
        }
    } 
} 
</style>
