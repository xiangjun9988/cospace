<template>
	<!-- <transition-group tag="ul" name="slide"> -->
	<ul v-if="trees">
		<tree-node :vm="vm" :treedata="{}" :now="now" :idx="0"></tree-node>
		<template v-for="(item, i) in trees">
			<tree-node :vm="vm" :treedata="item" :now="now" :idx="2*i+1"></tree-node>
			<tree-node :vm="vm" :treedata="{}" :now="now" :idx="2*i+2"></tree-node>
		</template>
	</ul>
	<!-- </transition-group> -->
</template>
<script>
import treeNode from './treenode.vue';
export default {
	props: {
		trees: Array,
	},//trees渲染树的数据，now存储当前拖拽的对象, vm为顶级vue对象用于触发事件
	components: {
		'tree-node': treeNode,
	},
	data: ()=>({
		vm: {},
		now: {},
	}),
	created() {
		//存储vm
		this.vm = this;
		this.$on('updateNow', function(res){
			this.now = res;
		});
	}
}
</script>
