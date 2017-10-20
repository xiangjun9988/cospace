<template>
	<li 
	:class="{'drag-empty': !treedata.name}"
	:key="treedata.name" 
	:draggable="!!treedata.name" 
	@dragover.prevent
	@dragstart.stop="dragStart" 
	@drop.stop="dragDrop" 
	@dragenter.stop="dragEnter" 
	@dragleave.stop="dragLeave" 
	@dragend.prevent="dragEnd">
		<template v-if="treedata.name">
			<div class="list-content">
				<span class="menu-name">{{treedata.name}}</span>
			</div>
			<ul v-if="treedata.children">
				<tree-node :vm="vm" :treedata="{}" :now="now" :idx="0"></tree-node>
				<template v-for="(item, i) in treedata.children">
					<tree-node :vm="vm" :treedata="item" :now="now" :idx="2*i+1"></tree-node>
					<tree-node :vm="vm" :treedata="{}" :now="now" :idx="2*i+2"></tree-node>
				</template>
			</ul>
		</template>
	</li>
</template>
<script>
import tree from './tree.vue';
export default {
	name: "tree-node",
	props: {
		treedata: Object,
		vm: Object,
		now: Object,
		idx: Number
	},//treedata渲染树的数据，now存储当前拖拽的对象, vm为顶级vue对象用于触发事件, idx为树节点索引
	components: {
		'tree': tree,
	},
	created() {
		//console.log(this.treedata)
	},
	computed:{
		// 判断是否为被拖动节点的父节点
		isParent () { 
	      return this === this.now.$parent;
	    },
	    // 判断是否为被拖动节点的相邻节点
	    isAdjacent () {
	      return this.$parent === this.now.$parent && Math.abs(this.idx - this.now.idx) === 1;
	    },
	    // 判断是否为被拖动节点的子孙节点
	    isChild () { 
	      var c = this;
	      while (c) {
	        if (this.now === c) return true;
	        c = c.$parent;
	      }
	    },
	    //上述条件皆为false时方可拖动
	    isAllowToDrop () { 
	      return !(this.isParent || this.isAdjacent || this.isChild);
	    }
	},
	methods: {
		clickThisMenu(item) {
			//只处理有子菜单的项
			// if(item.childrens){
			//     item.showChild = !item.showChild;
			// }
		},
		//开始拖拽
		dragStart(e) {
			e.stopPropagation();
			// 通知顶层vue更新 now
			this.vm.$emit('updateNow', this);
			//为拖拽元素加一个样式
			this.$el.classList.add('is-draging');
		},
		dragDrop() {
			if (!this.isAllowToDrop) return false;
			this.$el.classList.remove('is-allow-drag');

			// 删除被拖动节点
			//顶层节点需要识别
			let parentDel;
			let idxdel = (this.now.idx - 1)/2;
			if(this.now.$parent.trees){
				parentDel = this.now.$parent.trees;
			}
			else{
				parentDel = this.now.$parent.treedata.children;
			}
			parentDel.splice(idxdel, 1);

			// 情况 1：拖入空节点，成其兄弟
			if (!this.treedata.name){
				let parentAdd;
				//空节点需要+1
				let idxadd = (this.idx - 2)/2 + 1;
				//顶层节点插入trees
				if(this.$parent.trees){
					parentAdd = this.$parent.trees;
				}
				else{
					parentAdd = this.$parent.treedata.children;
				}
				parentAdd.splice(idxadd, 0, this.now.treedata);
				return false;
			}

			// 情况2：拖入普通节点，成为其子
			if (!this.treedata.children){
				// 须用 $set 引入双向绑定
				this.$set(this.treedata, 'children', []);
			}
			this.treedata.children.push(this.now.treedata);
		},
		// 允许拖放时触发
		dragEnter(e) {
			if(!this.isAllowToDrop) return false;
			this.$el.classList.add('is-allow-drag');
		},
		dragLeave(e) {
			this.$el.classList.remove('is-allow-drag');
		},
		dragEnd(e) {
			this.$el.classList.remove('is-draging');
		}
	}
}
</script>
