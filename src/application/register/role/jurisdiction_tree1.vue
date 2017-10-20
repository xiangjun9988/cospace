  <template>
    <ul class="tree">
        <template v-for="(item, index) in treedata">
            <li :class="{'show-child': item.showChild, 'active': ischeckbox && activedata.indexOf(item.moduleId) !==-1}"  @click="handleCallback($event,item)">
                <a href="javascript:;" :class="{'active': !ischeckbox && activedata.indexOf(item.moduleId) !==-1}">
                    <i class="blue fa" :class="{'fa-folder': item.childrenList && !item.showChild, 'fa-folder-open': item.showChild }" @click="clickToggle($event,item)"></i>
                    <div class="radio">
                        <label class="no-padding-left">
                            <input name="department" type="radio" class="colored-blue" v-if="isradio">
                            <input name="department" type="checkbox" class="colored-blue" v-if="ischeckbox" :checked="activeid.indexOf(item.moduleId) != -1">
                            <span class="text" :title="item.moduleName" v-bind:class="{'blue':fuquanmoduleidlist.indexOf(item.moduleId) != -1}">{{item.moduleName}}</span>
                        </label>
                    </div>
                    <span class="handle" v-if="hasadd || hasdel">
                        <i class="blue glyphicon glyphicon-plus-sign tree-add" @click="treeAdd($event, item)" v-if="hasadd"></i>
                        <i class="blue glyphicon glyphicon-remove-sign tree-del" @click="treeDel($event, index, item)" v-if="hasdel"></i>
                    </span>                                        
                </a>
                <tree-view 
                    :treedata="item.childrenList" 
                    :activedata="activedata" 
                    :vm="vm" 
                    :hasadd="hasadd" 
                    :hasdel="hasdel"
                    :isradio="isradio"
                    :ischeckbox="ischeckbox"
                    :activeid="activeid"
                    :fuquanmoduleidlist="fuquanmoduleidlist">
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
        hasadd: Boolean,
        hasdel: Boolean,
        isradio: Boolean,
        ischeckbox: Boolean,
        activeid:Array,
        fuquanmoduleidlist:Array,
    },
    created(){
        let zid = this.$route.params.zid;
        //遍历当前分支下的所有数据进行匹配
        // this.treedata.forEach(function(item){

        // });        
    },    
    methods: {
        treeAdd(e, item){
            this.vm.$emit('treeAddCallback', item);
            e.stopPropagation();
        },
        treeDel(e, index, item){
            this.vm.$emit('treeDelCallback', {
                parent: this.treedata,
                index: index,
                node: item
            });
            e.stopPropagation();
        },
        clickToggle(e,item){
            //只处理有子菜单的项
            if(item.childrenList){
                this.$set(item, 'showChild', !item.showChild);
            }
            e.stopPropagation();
        },
        handleCallback(e,item){
            this.vm.$emit('handleCallback', item);
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
