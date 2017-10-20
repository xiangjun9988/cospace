import Vue from 'vue';
import Router from 'vue-router';
import vueResource from 'vue-resource';
window.config = require('./config');

//引入bootstrap框架公用的css文件
import './sass/base.scss';

//引入bootstrap框架公用的js文件
import './bootstrap/js/bootstrap.min.js';
import './bootstrap/js/dialog.js';
import './bootstrap/js/echarts.min.js';

//全局模板
import vMain from './components/main.vue';

//路由配置文件
import routeMap from './router/index.js';

//vuex配置文件 
import store from './vuex/store.js';

//模块化编程需要use
Vue.use(Router);
Vue.use(vueResource);

//全局请求拦截
Vue.http.interceptors.push((request, next) => {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next((response) => {
	    // ...
	    // 请求发送后的处理逻辑
	    // ...
	    // 根据请求的状态，response参数会返回给successCallback或errorCallback
	    //如果是返回用户登录信息失效或过期，则需要跳转到登录页并且清掉userinfo值
	    return response
    })
})

// 创建 router 实例
const router = new Router({
	routes: routeMap()
});

const app = new Vue({
	router,
	store,
	render: h => h(vMain)
}).$mount('#app')
