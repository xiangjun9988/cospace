import Vue from 'vue';
//npm安装的vuex包有些bug，commit函数不可用,需要手动替换掉官方文档指向的文件
import Vuex from 'vuex';
//actions用于异步修改state
import actions from './actions';
//mutations用于同步修改state
import mutations from './mutations';
//数据
import state from "./state";
//模块化需要use
Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions
})